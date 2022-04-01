(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{392:function(e,t,r){"use strict";r.r(t);var a=r(42),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"create-a-resource-with-an-already-known-id"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#create-a-resource-with-an-already-known-id"}},[e._v("#")]),e._v(" Create a resource with an already known id")]),e._v(" "),r("h2",{attrs:{id:"use-case"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#use-case"}},[e._v("#")]),e._v(" Use-case")]),e._v(" "),r("p",[e._v("In most cases, we use POST for creating a new resource. The request is made on the collection, and the server is responsible for generating the id of the new resource:")]),e._v(" "),r("div",{staticClass:"language-bash extra-class"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[e._v("POST https://api.example.com/v1/orders HTTP/1.1\n\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[e._v("201")]),e._v(" Created\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v(" Location: https://api.example.com/v1/orders/42\n")])])]),r("p",[e._v("But sometimes, the id of the resource to create is already known by the client.")]),e._v(" "),r("p",[e._v("This can happen when:")]),e._v(" "),r("ul",[r("li",[e._v("The business object has been created first in another application, and we want to use the same id when synchronizing it with our API.\n"),r("ul",[r("li",[e._v("e.g.: when a product is purchased, the Payment Provider generates a Transaction id when the payment is complete.\nThen we want to create a new "),r("code",[e._v("/transactions")]),e._v(" resource on our Order API, using the id given by the PSP.")])])]),e._v(" "),r("li",[e._v("The resource id is not randomly generated but has a business meaning, and can be chosen client-side\n"),r("ul",[r("li",[e._v("e.g.: I want my products to be identified by their business identifier: "),r("a",{attrs:{href:"https://fr.wikipedia.org/wiki/Code-barres_EAN",target:"_blank",rel:"noopener noreferrer"}},[e._v("EAN (European Article Numbering)"),r("OutboundLink")],1),e._v(", "),r("a",{attrs:{href:"https://fr.wikipedia.org/wiki/Code_universel_des_produits",target:"_blank",rel:"noopener noreferrer"}},[e._v("UPC (Universal Product Code)"),r("OutboundLink")],1),e._v("...")])])])]),e._v(" "),r("h2",{attrs:{id:"recipe"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#recipe"}},[e._v("#")]),e._v(" Recipe")]),e._v(" "),r("p",[e._v("You should use "),r("code",[e._v("PUT")]),e._v(" instead of "),r("code",[e._v("POST")]),e._v(" for creating the resource, and give the id in the url.")]),e._v(" "),r("p",[e._v("For example, to create a new "),r("code",[e._v("product")]),e._v(" with id "),r("code",[e._v("761234567890")]),e._v(":")]),e._v(" "),r("div",{staticClass:"language-bash extra-class"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[e._v("PUT https://api.example.com/v1/products/761234567890 HTTP/1.1\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),r("span",{pre:!0,attrs:{class:"token string"}},[e._v('"label"')]),r("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[e._v('"My new product"')]),e._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[e._v("201")]),e._v(" Created\n")])])]),r("p",[e._v("The syntax is the same as for a complete update: "),r("code",[e._v("PUT")]),e._v(" kind of perform an upsert on the resource.")]),e._v(" "),r("p",[e._v("In the case of a creation, the "),r("a",{attrs:{href:"https://developer.mozilla.org/fr/docs/Web/HTTP/Status/201",target:"_blank",rel:"noopener noreferrer"}},[e._v("201 Status Code"),r("OutboundLink")],1),e._v(" is expected.")]),e._v(" "),r("h2",{attrs:{id:"resources"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#resources"}},[e._v("#")]),e._v(" Resources")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://datatracker.ietf.org/doc/html/rfc2616#section-9.6",target:"_blank",rel:"noopener noreferrer"}},[e._v("PUT definition in the HTTP RFC"),r("OutboundLink")],1)])]),e._v(" "),r("blockquote",[r("p",[e._v("If the Request-URI does not point to an existing resource, and that URI is capable of being defined as a new resource by the requesting user agent, the origin server can create the resource with that URI.")])])])}),[],!1,null,null,null);t.default=s.exports}}]);