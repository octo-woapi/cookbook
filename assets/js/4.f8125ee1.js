(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{341:function(t,e,r){"use strict";var n=r(6),i=r(3),c=r(94),a=r(10),s=r(7),o=r(24),l=r(327),u=r(44),p=r(1),f=r(28),m=r(68).f,d=r(23).f,v=r(8).f,_=r(321).trim,g=i.Number,h=g.prototype,x="Number"==o(f(h)),N=function(t){var e,r,n,i,c,a,s,o,l=u(t,!1);if("string"==typeof l&&l.length>2)if(43===(e=(l=_(l)).charCodeAt(0))||45===e){if(88===(r=l.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+l}for(a=(c=l.slice(2)).length,s=0;s<a;s++)if((o=c.charCodeAt(s))<48||o>i)return NaN;return parseInt(c,n)}return+l};if(c("Number",!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var b,y=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof y&&(x?p((function(){h.valueOf.call(r)})):"Number"!=o(r))?l(new g(N(e)),r,y):N(e)},I=n?m(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;I.length>C;C++)s(g,b=I[C])&&!s(y,b)&&v(y,b,d(g,b));y.prototype=h,h.constructor=y,a(i,"Number",y)}},342:function(t,e,r){},343:function(t,e,r){},344:function(t,e,r){},345:function(t,e,r){},375:function(t,e,r){"use strict";r(342)},376:function(t,e,r){"use strict";r(343)},377:function(t,e,r){"use strict";r(344)},378:function(t,e,r){"use strict";r(345)},383:function(t,e,r){"use strict";r.r(e),r.d(e,"toRecipe",(function(){return p}));r(45),r(46),r(27),r(66);var n=r(349),i=(r(341),[{color:"grey",text:"Unrated",icon:"mdi-signal-off"},{color:"green",text:"Beginner",icon:"mdi-signal-cellular-outline"},{color:"yellow",text:"Medium",icon:"mdi-signal-cellular-1"},{color:"orange",text:"Advanced",icon:"mdi-signal-cellular-2"},{color:"red",text:"Expert",icon:"mdi-signal-cellular-3"}]),c={name:"Complexity",props:{value:{type:Number,validator:function(t){return 0<=t&&t<=4}}},computed:{complexity:function(){return i[Math.floor(this.value)]}}},a=(r(375),r(42)),s={name:"RecipeCard",components:{Complexity:Object(a.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"complexity"},[r("v-icon",{staticClass:"icon",attrs:{color:t.complexity.color}},[t._v("\n    "+t._s(t.complexity.icon)+"\n  ")]),t._v(" "),r("span",[t._v(t._s(t.complexity.text))])],1)}),[],!1,null,"f0392dac",null).exports},props:{title:String,description:String,url:String,complexity:Number}},o=(r(376),{name:"Recipes",components:{RecipeCard:Object(a.a)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"mx-auto card",attrs:{width:"100%","min-height":"170px",outlined:"",to:t.url}},[r("v-card-title",[t._v(t._s(t.title))]),t._v(" "),r("v-card-subtitle",[t._v("\n    "+t._s(t.description)+"\n  ")]),t._v(" "),r("v-card-text",{staticClass:"card-text-position"},[r("complexity",{attrs:{value:t.complexity}})],1)],1)}),[],!1,null,"1c863726",null).exports},props:{recipes:Array}}),l=(r(377),Object(a.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"recipes"},[r("v-subheader",[t._v("All recipes")]),t._v(" "),r("v-row",t._l(t.recipes,(function(e){return r("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[r("recipe-card",t._b({staticClass:"recipe"},"recipe-card",e,!1))],1)})),1)],1)}),[],!1,null,"aaa00684",null).exports),u=r(351);function p(t){var e=t.frontmatter;return{title:t.title||e.title,description:e.description,url:t.path,complexity:e.complexity}}var f={name:"Home",components:{Page:n.a,Recipes:l,SearchBox:u.a},computed:{pageClasses:function(){var t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar},t]},recipes:function(){return this.$site?this.$site.pages.filter((function(t){return"/"!==t.path})).map(p):[]}}},m=(r(378),Object(a.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"theme-container",class:t.pageClasses},[r("div",{staticClass:"recipes-container"},[r("recipes",{attrs:{recipes:t.recipes}})],1),t._v(" "),r("page",{attrs:{sidebarItems:!1},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("page-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("page-bottom")]},proxy:!0}],null,!0)})],1)}),[],!1,null,"75ccea87",null));e.default=m.exports}}]);