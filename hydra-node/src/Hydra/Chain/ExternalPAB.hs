{-# LANGUAGE EmptyDataDeriving #-}
module Hydra.Chain.ExternalPAB where

import Hydra.Prelude

import Hydra.Chain (Chain (Chain, postTx))
import Hydra.HeadLogic (OnChainTx (InitTx))
import Hydra.Ledger (Tx)
import Hydra.Logging (Tracer)
import Network.HTTP.Req (POST (..), ReqBodyJson (..), defaultHttpConfig, http, jsonResponse, port, req, responseBody, responseStatusCode, runReq, (/:), HttpException (VanillaHttpException))
import Wallet.Emulator.Types (Wallet (..))
import Ledger.Value     as Value
import Data.Aeson (ToJSON, eitherDecodeStrict, Result (Error, Success))
import Network.WebSockets (receiveData)
import qualified Data.Map as Map
import Ledger (txOutTxOut, TxOut (txOutValue), PubKeyHash)
import Control.Monad.Class.MonadSay (say)
import Wallet.Types (unContractInstanceId)
import Network.WebSockets.Client (runClient)
import Ledger.AddressMap (UtxoMap)
import Plutus.PAB.Webserver.Types (InstanceStatusToClient(NewObservableState))
import Data.Aeson.Types (fromJSON)

data ExternalPABLog
  deriving (Eq, Show)

withExternalPAB ::
  Tx tx =>
  Tracer IO ExternalPABLog ->
  (OnChainTx tx -> IO ()) ->
  (Chain tx IO -> IO a) ->
  IO a
withExternalPAB _tracer callback action = do
  withAsync (utxoSubscriber wallet) $ \_ ->
    withAsync (initTxSubscriber wallet callback) $ \_ ->
      action $ Chain{postTx}
 where
  postTx = \case
    InitTx _ -> loadCid >>= postInitTx
    tx -> error $ "should post " <> show tx

  -- TODO(SN): Parameterize with nodeId
  wallet = Wallet 1

  -- TODO(SN): don't use /tmp
  loadCid = readFileText "/tmp/W1.cid"

-- TODO(SN): use MonadHttp, but clashes with MonadThrow
postInitTx :: Text -> IO ()
postInitTx cid = do
  doRequest `catch` onAnyHttpException doRequest
 where
  onAnyHttpException cont = \case
    (VanillaHttpException _) -> threadDelay 1 >> cont
    e -> throwIO e

  doRequest =
    runReq defaultHttpConfig $ do
      res <-
        req
          POST
          (http "127.0.0.1" /: "api" /: "new" /: "contract" /: "instance" /: cid /: "endpoint" /: "init")
          (ReqBodyJson ()) -- TODO(SN): this should contain the hydra verification keys and pack them into metadata
          jsonResponse
          (port 8080)
      when (responseStatusCode res /= 200) $
        error "failed to postInitTx"
      pure $ responseBody res

data ActivateContractRequest = ActivateContractRequest { caID :: Text , caWallet :: Wallet }
  deriving (Generic, ToJSON)

-- TODO(SN): DRY subscribers
initTxSubscriber :: Wallet -> (OnChainTx tx -> IO ()) -> IO ()
initTxSubscriber wallet callback = do
  res <- runReq defaultHttpConfig $ req
      POST
      (http "127.0.0.1" /: "api" /: "new" /: "contract" /: "activate")
      (ReqBodyJson reqBody)
      jsonResponse
      (port 8080)
  when (responseStatusCode res /= 200) $
    error "failed to activateContract"
  let cid = unContractInstanceId $ responseBody res
  say $ "activated: " <> show cid
  runClient "127.0.0.1" 8080 ("/ws/" <> show cid) $ \con -> forever $ do
    msg <- receiveData con
    say $ "received: " <> show msg
    case eitherDecodeStrict msg of
      Right (NewObservableState val) -> do
        say $ "decoding: " <> show val
        case fromJSON val of
          Error err -> say $ "decoding error json: " <> show err
          Success (pubKeyHashes :: [PubKeyHash]) -> do -- XXX(SN): this is actually 'Last [PubKeyHash]'
            say $ "Observed Init tx with datums (pubkeyhashes): " ++ show pubKeyHashes
            -- TODO(SN): pack hydra verification keys into metadata and callback with these
            callback $ InitTx mempty
      Right _ -> say "received some other state change"
      Left err -> say $ "error decoding msg: " <> show err
 where
  reqBody = ActivateContractRequest "WatchInit" wallet

utxoSubscriber :: Wallet -> IO ()
utxoSubscriber wallet = do
  res <- runReq defaultHttpConfig $ req
      POST
      (http "127.0.0.1" /: "api" /: "new" /: "contract" /: "activate")
      (ReqBodyJson reqBody)
      jsonResponse
      (port 8080)
  when (responseStatusCode res /= 200) $
    error "failed to activateContract"
  let cid = unContractInstanceId $ responseBody res
  say $ "activated: " <> show cid
  runClient "127.0.0.1" 8080 ("/ws/" <> show cid) $ \con -> forever $ do
    msg <- receiveData con
    case eitherDecodeStrict msg of
      Right (NewObservableState val) ->
        case fromJSON val of
          Error err -> error $ "decoding error json: " <> show err
          Success (utxos :: UtxoMap) -> do
            let v = mconcat $ Map.elems $ txOutValue . txOutTxOut <$> utxos
            say $ "own funds: " ++ show (flattenValue v)
      Right _ -> pure ()
      Left err -> error $ "error decoding msg: " <> show err
 where
  reqBody = ActivateContractRequest "GetUtxos" wallet
