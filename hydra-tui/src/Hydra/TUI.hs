{-# LANGUAGE LambdaCase #-}

module Hydra.TUI where

import Hydra.Prelude hiding (State)

import Brick (App (..), AttrMap, BrickEvent (VtyEvent), EventM, Next, Widget, continue, defaultMain, hBox, hLimit, halt, joinBorders, showFirstCursor, str, vBox, withBorderStyle, (<+>), (<=>))
import Brick.AttrMap (attrMap)
import Brick.Widgets.Border (border, hBorder, vBorder)
import Brick.Widgets.Border.Style (ascii, unicodeBold, unicodeRounded)
import Brick.Widgets.Center (hCenter)
import Data.Version (showVersion)
import Graphics.Vty (Event (EvKey), Key (KChar), Modifier (MCtrl))
import Graphics.Vty.Attributes (defAttr)
import Paths_hydra_tui (version)

run :: IO State
run = defaultMain app initialState
 where
  initialState = State

  app =
    App
      { appDraw = draw
      , appChooseCursor = showFirstCursor
      , appHandleEvent = handleEvent
      , appStartEvent = pure
      , appAttrMap = style
      }

data State = State

type ResourceName = ()

draw :: State -> [Widget ResourceName]
draw _ =
  pure $
    withBorderStyle ascii $
      joinBorders $
        hBox
          [ versions
          , vBorder
          , commands
          ]
 where
  versions = hLimit 30 (tuiVersion <=> nodeVersion <=> hBorder)

  tuiVersion = str $ "Hydra TUI " <> showVersion version

  nodeVersion = str "Hydra Node ..."

  commands = str "Commands:" <=> str "[q]uit"

handleEvent :: State -> BrickEvent n e -> EventM n (Next State)
handleEvent s = \case
  -- Quit
  VtyEvent (EvKey (KChar 'c') [MCtrl]) -> halt s
  VtyEvent (EvKey (KChar 'd') [MCtrl]) -> halt s
  VtyEvent (EvKey (KChar 'q') _) -> halt s
  _ -> continue s

style :: State -> AttrMap
style _ = attrMap defAttr []