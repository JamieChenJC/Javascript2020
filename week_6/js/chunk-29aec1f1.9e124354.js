(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29aec1f1"],{"159b":function(t,r,e){var n=e("da84"),i=e("fdbc"),o=e("17c2"),c=e("9112");for(var a in i){var u=n[a],f=u&&u.prototype;if(f&&f.forEach!==o)try{c(f,"forEach",o)}catch(s){f.forEach=o}}},"17c2":function(t,r,e){"use strict";var n=e("b727").forEach,i=e("a640"),o=e("ae40"),c=i("forEach"),a=o("forEach");t.exports=c&&a?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,r,e){var n=e("d039"),i=e("b622"),o=e("2d00"),c=i("species");t.exports=function(t){return o>=51||!n((function(){var r=[],e=r.constructor={};return e[c]=function(){return{foo:1}},1!==r[t](Boolean).foo}))}},2355:function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[e("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(r){t.isLoading=r}}}),e("h2",[t._v("這裡是購物車")]),t.isLoading?t._e():e("div",[t.cart.list.length?e("div",[e("table",[t._m(0),t._l(t.cart.list,(function(r){return e("tr",{key:r.id},[e("td",[t._v(t._s(r.product.title))]),e("td",[t._v(t._s(r.product.price))]),e("td",[t._v(t._s(r.quantity))])])}))],2),e("h3",[t._v("總金額 "+t._s(t.cart.totalPrice)+" ")])]):e("div",[e("h2",[t._v("目前購物車是空的....")])])])],1)},i=[function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("thead",[e("tr",[e("th",[t._v("商品名稱")]),e("th",[t._v("商品價格")]),e("th",[t._v("數量")])])])}],o=(e("99af"),e("4160"),e("d3b7"),e("159b"),{data:function(){return{isLoading:!0,cart:{list:[],totalPrice:0}}},mounted:function(){var t=this,r="".concat("https://course-ec-api.hexschool.io/api","/").concat("aa785650-1105-4181-8ecf-37f60de3c516","/ec/shopping");this.isLoading=!0,this.$http.get(r).then((function(r){t.cart.list=r.data.data,t.cart.totalPrice=0,t.cart.list.forEach((function(r){t.cart.totalPrice+=r.product.price*r.quantity}))})).catch((function(){})).finally((function(){t.isLoading=!1}))}}),c=o,a=e("2877"),u=Object(a["a"])(c,n,i,!1,null,null,null);r["default"]=u.exports},4160:function(t,r,e){"use strict";var n=e("23e7"),i=e("17c2");n({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"65f0":function(t,r,e){var n=e("861d"),i=e("e8b5"),o=e("b622"),c=o("species");t.exports=function(t,r){var e;return i(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!i(e.prototype)?n(e)&&(e=e[c],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===r?0:r)}},8418:function(t,r,e){"use strict";var n=e("c04e"),i=e("9bf2"),o=e("5c6c");t.exports=function(t,r,e){var c=n(r);c in t?i.f(t,c,o(0,e)):t[c]=e}},"99af":function(t,r,e){"use strict";var n=e("23e7"),i=e("d039"),o=e("e8b5"),c=e("861d"),a=e("7b0b"),u=e("50c4"),f=e("8418"),s=e("65f0"),l=e("1dde"),d=e("b622"),h=e("2d00"),v=d("isConcatSpreadable"),p=9007199254740991,L="Maximum allowed index exceeded",b=h>=51||!i((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),S=l("concat"),g=function(t){if(!c(t))return!1;var r=t[v];return void 0!==r?!!r:o(t)},y=!b||!S;n({target:"Array",proto:!0,forced:y},{concat:function(t){var r,e,n,i,o,c=a(this),l=s(c,0),d=0;for(r=-1,n=arguments.length;r<n;r++)if(o=-1===r?c:arguments[r],g(o)){if(i=u(o.length),d+i>p)throw TypeError(L);for(e=0;e<i;e++,d++)e in o&&f(l,d,o[e])}else{if(d>=p)throw TypeError(L);f(l,d++,o)}return l.length=d,l}})},a640:function(t,r,e){"use strict";var n=e("d039");t.exports=function(t,r){var e=[][t];return!!e&&n((function(){e.call(null,r||function(){throw 1},1)}))}},ae40:function(t,r,e){var n=e("83ab"),i=e("d039"),o=e("5135"),c=Object.defineProperty,a={},u=function(t){throw t};t.exports=function(t,r){if(o(a,t))return a[t];r||(r={});var e=[][t],f=!!o(r,"ACCESSORS")&&r.ACCESSORS,s=o(r,0)?r[0]:u,l=o(r,1)?r[1]:void 0;return a[t]=!!e&&!i((function(){if(f&&!n)return!0;var t={length:-1};f?c(t,1,{enumerable:!0,get:u}):t[1]=1,e.call(t,s,l)}))}},b727:function(t,r,e){var n=e("0366"),i=e("44ad"),o=e("7b0b"),c=e("50c4"),a=e("65f0"),u=[].push,f=function(t){var r=1==t,e=2==t,f=3==t,s=4==t,l=6==t,d=5==t||l;return function(h,v,p,L){for(var b,S,g=o(h),y=i(g),_=n(v,p,3),E=c(y.length),m=0,x=L||a,T=r?x(h,E):e?x(h,0):void 0;E>m;m++)if((d||m in y)&&(b=y[m],S=_(b,m,g),t))if(r)T[m]=S;else if(S)switch(t){case 3:return!0;case 5:return b;case 6:return m;case 2:u.call(T,b)}else if(s)return!1;return l?-1:f||s?s:T}};t.exports={forEach:f(0),map:f(1),filter:f(2),some:f(3),every:f(4),find:f(5),findIndex:f(6)}},e8b5:function(t,r,e){var n=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},fdbc:function(t,r){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-29aec1f1.9e124354.js.map