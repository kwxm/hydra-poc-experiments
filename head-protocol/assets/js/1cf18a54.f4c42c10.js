"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[2293],{3905:function(t,e,n){n.d(e,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var l=r.createContext({}),u=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},s=function(t){var e=u(t.components);return r.createElement(l.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,l=t.parentName,s=c(t,["components","mdxType","originalType","parentName"]),d=u(n),m=a,h=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(h,i(i({ref:e},s),{},{components:n})):r.createElement(h,i({ref:e},s))}));function m(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in e)hasOwnProperty.call(e,l)&&(c[l]=e[l]);c.originalType=t,c.mdxType="string"==typeof t?t:a,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},661:function(t,e,n){n.r(e),n.d(e,{assets:function(){return s},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return p}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],c={slug:13,title:"13. Plutus Contracts Testing Strategy\n",authors:[],tags:["Accepted"]},l=void 0,u={permalink:"/head-protocol/adr/13",source:"@site/adr/2022-01-19_013-contract-testing-strategy.md",title:"13. Plutus Contracts Testing Strategy\n",description:"Status",date:"2022-01-19T00:00:00.000Z",formattedDate:"January 19, 2022",tags:[{label:"Accepted",permalink:"/head-protocol/adr/tags/accepted"}],readingTime:1.26,truncated:!1,authors:[],frontMatter:{slug:"13",title:"13. Plutus Contracts Testing Strategy\n",authors:[],tags:["Accepted"]},prevItem:{title:"12. Top-down Test-driven Design\n",permalink:"/head-protocol/adr/12"},nextItem:{title:"14. Token usage in Hydra Scripts\n",permalink:"/head-protocol/adr/14"}},s={authorsImageUrls:[]},p=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2}],d={toc:p};function m(t){var e=t.components,n=(0,a.Z)(t,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"status"},"Status"),(0,o.kt)("p",null,"Accepted"),(0,o.kt)("h2",{id:"context"},"Context"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"We are implementing our custom (",(0,o.kt)("a",{parentName:"li",href:"/adr/10"},"Direct"),") interaction w/ Cardano blockchain and not using the PAB nor the ",(0,o.kt)("inlineCode",{parentName:"li"},"Contract")," monad to define off-chain contract code"),(0,o.kt)("li",{parentName:"ul"},"This implies we cannot use the ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/input-output-hk/plutus-apps/blob/main/plutus-contract/src/Plutus/Contract/Test.hs"},"official")," testing framework for Contracts which relies on ",(0,o.kt)("inlineCode",{parentName:"li"},"Contract")," monad and emulator traces nor the ",(0,o.kt)("a",{parentName:"li",href:"https://plutus-apps.readthedocs.io/en/latest/plutus/tutorials/contract-testing.html"},"QuickCheck based framework")),(0,o.kt)("li",{parentName:"ul"},"We want to follow our ",(0,o.kt)("a",{parentName:"li",href:"/adr/12"},"Test-Driven Development")," approach for contracts as this is a critical part of Hydra"),(0,o.kt)("li",{parentName:"ul"},"On-Chain Validators need not only to be correct and functional, but also secure and hardened against malicious parties")),(0,o.kt)("h2",{id:"decision"},"Decision"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Therefore")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"We test-drive single contracts code using ",(0,o.kt)("em",{parentName:"li"},"Mutation-Based Property Testing")),(0,o.kt)("li",{parentName:"ul"},"Contracts are tested through the construction of actual ",(0,o.kt)("em",{parentName:"li"},"transactions")," and running phase-2 ledger validation process"),(0,o.kt)("li",{parentName:"ul"},'We start from a "healthy" transaction, that\'s expected to be correct and stay so'),(0,o.kt)("li",{parentName:"ul"},"Contract code is initially ",(0,o.kt)("inlineCode",{parentName:"li"},"const True")," function that validates any transaction"),(0,o.kt)("li",{parentName:"ul"},"We flesh the contract's code piecemeal through the introduction of ",(0,o.kt)("em",{parentName:"li"},"Mutations")," that turn a healthy transaction into an expectedly invalid one"),(0,o.kt)("li",{parentName:"ul"},"We gradually build a set of combinators and generators that make it easier to mutate arbitrarily transactions, and combine those mutations")),(0,o.kt)("h2",{id:"consequences"},"Consequences"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"We make the contracts' ",(0,o.kt)("em",{parentName:"li"},"Threat model"),"  explicit through the tests we write, which should help future auditors' work"),(0,o.kt)("li",{parentName:"ul"},"We'll need an additional layer of tests to exercise the Hydra OCV State Machine through ",(0,o.kt)("em",{parentName:"li"},"sequence of transactions"),". This could be implemented using ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/input-output-hk/plutus-apps/tree/main/quickcheck-dynamic"},"quickcheck-dynamic")," library, or other tools that are currently being developed by the Cardano community")))}m.isMDXComponent=!0}}]);