(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{171:function(e,t,r){},172:function(e,t,r){},173:function(e,t,r){},174:function(e,t,r){},187:function(e,t,r){"use strict";var n=r(7),a=r(4),i=r(63),s=r(14),o=r(6),c=r(20),u=r(106),l=r(31),p=r(3),f=r(24),v=r(44).f,d=r(19).f,m=r(8).f,h=r(153).trim,_=a.Number,g=_.prototype,b="Number"==c(f(g)),N=function(e){var t,r,n,a,i,s,o,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(43===(t=(u=h(u)).charCodeAt(0))||45===t){if(88===(r=u.charCodeAt(2))||120===r)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+u}for(s=(i=u.slice(2)).length,o=0;o<s;o++)if((c=i.charCodeAt(o))<48||c>a)return NaN;return parseInt(i,n)}return+u};if(i("Number",!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var y,x=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof x&&(b?p((function(){g.valueOf.call(r)})):"Number"!=c(r))?u(new _(N(t)),r,x):N(t)},I=n?v(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;I.length>C;C++)o(_,y=I[C])&&!o(x,y)&&m(x,y,d(_,y));x.prototype=g,g.constructor=x,s(a,"Number",x)}},259:function(e,t,r){"use strict";var n=r(171);r.n(n).a},260:function(e,t,r){"use strict";var n=r(172);r.n(n).a},261:function(e,t,r){"use strict";var n=r(173);r.n(n).a},262:function(e,t,r){"use strict";var n=r(174);r.n(n).a},264:function(e,t,r){"use strict";r.r(t),r.d(t,"toRecipe",(function(){return l}));r(72),r(73),r(18),r(42);var n=r(188),a=r(189),i=(r(187),{name:"Complexity",props:{value:{type:Number,validator:function(e){return 0<=e&&e<=5}}},computed:{progress:function(){return 20*Math.floor(this.value)},color:function(){return{0:"grey",1:"green",2:"yellow",3:"orange",4:"dark-orange",5:"red"}[Math.floor(this.value)]}},filters:{complexity:function(e){return{0:"Unrated",1:"Beginner",2:"Easy",3:"Medium",4:"Advanced",5:"Expert"}[Math.floor(e)]}}}),s=(r(259),r(29)),o={name:"RecipeCard",components:{Complexity:Object(s.a)(i,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",[r("v-progress-circular",{staticClass:"progress",attrs:{rotate:-90,value:e.progress,color:e.color}},[e._v(e._s(Math.floor(e.value)))]),e._v(e._s(e._f("complexity")(e.value))+"\n")],1)}),[],!1,null,"58047e40",null).exports},props:{title:String,description:String,url:String,complexity:Number}},c=(r(260),{name:"Recipes",components:{RecipeCard:Object(s.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticClass:"mx-auto",attrs:{"max-width":"344",outlined:"",to:e.url}},[r("v-card-title",[e._v(e._s(e.title))]),e._v(" "),r("v-card-subtitle",[e._v("\n    "+e._s(e.description)+"\n  ")]),e._v(" "),r("v-card-text",[r("complexity",{attrs:{value:e.complexity}})],1)],1)}),[],!1,null,"3e751e00",null).exports},props:{recipes:Array}}),u=(r(261),Object(s.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"recipes"},[r("v-subheader",[e._v("All recipes")]),e._v(" "),r("div",{staticClass:"recipes-row"},e._l(e.recipes,(function(t){return r("recipe-card",e._b({},"recipe-card",t,!1))})),1)],1)}),[],!1,null,"0d23b93a",null).exports);function l(e){var t=e.frontmatter;return{title:e.title||t.title,description:t.description,url:e.path,complexity:t.complexity}}var p={name:"Home",components:{Page:a.a,Navbar:n.a,Recipes:u},computed:{shouldShowNavbar:function(){var e=this.$site.themeConfig;return!1!==this.$page.frontmatter.navbar&&!1!==e.navbar&&(this.$title||e.logo||e.repo||e.nav||this.$themeLocaleConfig.nav)},pageClasses:function(){var e=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar},e]},recipes:function(){return this.$site?this.$site.pages.filter((function(e){return"/"!==e.path})).map(l):[]}}},f=(r(262),Object(s.a)(p,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"theme-container",class:e.pageClasses},[e.shouldShowNavbar?r("navbar"):e._e(),e._v(" "),r("div",{staticClass:"recipes-container"},[r("recipes",{attrs:{recipes:e.recipes}})],1),e._v(" "),r("page",{attrs:{sidebarItems:!1},scopedSlots:e._u([{key:"top",fn:function(){return[e._t("page-top")]},proxy:!0},{key:"bottom",fn:function(){return[e._t("page-bottom")]},proxy:!0}],null,!0)})],1)}),[],!1,null,"0dd6e21c",null));t.default=f.exports}}]);