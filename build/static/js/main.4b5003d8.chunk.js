(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{49:function(e,n,t){"use strict";t.r(n);var a=t(2),c=t(19),r=t.n(c),o=(t(9),t(3)),i=t(0),s=function(e){var n=e.persons,t=e.filterName,a=e.handleDelete;return n.map((function(e){return""!==t?e.name.toLocaleLowerCase().includes(t.toLocaleLowerCase())?Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{children:[e.name," ",e.number]},e.name),Object(i.jsx)("button",{children:"delete"})]},"".concat(e.name,"-").concat(e.number)):null:Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{style:{display:"inline"},children:[e.name," ",e.number," "]},e.name),Object(i.jsx)("button",{style:{display:"inline"},onClick:function(n){return a(n,e)},children:"delete"})]},"".concat(e.name,"-").concat(e.number))}))},u=function(e){var n=e.filterName,t=e.handleFilter;return Object(i.jsxs)("div",{children:["filter shown with",Object(i.jsx)("input",{value:n,onChange:t})]})},l=function(e){var n=e.handleNamesSubmit,t=e.newName,a=e.handleNameChange,c=e.newPhone,r=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsx)("h3",{children:"Add a new one"}),Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:a})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:c,onChange:r})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},d=t(5),h=t.n(d),b={getAll:h.a.get("/api/persons").then((function(e){return e.data})),addPerson:function(e){return h.a.post("/api/persons",e).then((function(e){return e.data})).catch((function(e){throw new Error(e.response.data.error)}))},deletePerson:function(e){return h.a.delete("/api/persons/".concat(e)).then((function(e){return e.data}))},changePerson:function(e,n){return h.a.put("/api/persons/".concat(e),n).then((function(e){return e.data})).catch((function(e){throw Error(e.response.data.error)}))}},j=function(e){var n=e.message,t=e.isError;return console.log("message",n),null===n?null:Object(i.jsx)("div",{className:"message".concat(t?" error":""),children:n})},m=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),d=Object(o.a)(r,2),h=d[0],m=d[1],f=Object(a.useState)(""),O=Object(o.a)(f,2),p=O[0],v=O[1],x=Object(a.useState)(""),g=Object(o.a)(x,2),w=g[0],N=g[1],y=Object(a.useState)(""),C=Object(o.a)(y,2),P=C[0],S=C[1],k=Object(a.useState)(!1),E=Object(o.a)(k,2),A=E[0],L=E[1];Object(a.useEffect)((function(){b.getAll.then((function(e){c(e)}))}),[]);var R=function(e,n){S(e),n&&L(n),setTimeout((function(){S(null),L(!1)}),5e3)};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),P&&Object(i.jsx)(j,{message:P,isError:A}),Object(i.jsx)(u,{filterName:w,handleFilter:function(e){N(e.target.value)}}),Object(i.jsx)(l,{handleNamesSubmit:function(e){e.preventDefault();var n={name:h,number:p},a=t.find((function(e){return e.name===h}));a?window.confirm("".concat(h," is already added to phonebook. Replace the old number with new one?"))&&b.changePerson(a.id,n).then((function(e){c(t.map((function(e){return e.name===h&&(e.number=p),e}))),R("".concat(e.name," updated"))})).catch((function(e){console.log("ERROR",e),R("Information of ".concat(n.name," has allready been removed from the server."),!0)})):(b.addPerson(n).then((function(e){c(t.concat(e)),R("".concat(e.name," added"))})).catch((function(e){return R(e.message,!0)})),m(""),v(""))},newName:h,handleNameChange:function(e){m(e.target.value)},newPhone:p,handleNumberChange:function(e){v(e.target.value)}}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(s,{persons:t,filterName:w,handleDelete:function(e,n){window.confirm("Are you sure you want to delete ".concat(n.name))&&b.deletePerson(n.id).then((function(e){c(t.filter((function(e){return e.id!==n.id})))}))}})]})};r.a.render(Object(i.jsx)(m,{}),document.getElementById("root"))},9:function(e,n,t){}},[[49,1,2]]]);
//# sourceMappingURL=main.4b5003d8.chunk.js.map