(this["webpackJsonpface-mask-detection"]=this["webpackJsonpface-mask-detection"]||[]).push([[0],{279:function(e,t,n){},285:function(e,t){},286:function(e,t){},294:function(e,t){},297:function(e,t){},298:function(e,t){},299:function(e,t,n){},302:function(e,t,n){"use strict";n.r(t);var r=n(88),c=n.n(r),a=n(232),i=n.n(a),o=(n(279),n(4)),s=n.n(o),u=n(11),l=n(74),d=n(252),f=n.n(d),h=(n(299),n(69)),p=n(301),g=["Correctly placed","Poorly placed","No face mask"];var m=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(null),n=function(){var e=Object(u.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.e("https://tensorflowrealtimefacemask.s3.us-south.cloud-object-storage.appdomain.cloud/model.json");case 2:return t=e.sent,e.next=5,p.load();case 5:n=e.sent,setInterval((function(){c(n,t)}),16.7);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),c=function(){var n=Object(u.a)(s.a.mark((function n(r,c){var a,i,o,u,d,f,h,p,m,b,j,x,v,O,w,y,k,A,R,S,M,N;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("undefined"===typeof e.current||null===e.current||4!==e.current.video.readyState){n.next=16;break}return a=e.current.video,i=e.current.video.videoWidth,o=e.current.video.videoHeight,e.current.video.width=i,e.current.video.height=o,t.current.width=i,t.current.height=o,u=t.current.getContext("2d"),d=l.a.fromPixels(a),!1,n.next=13,r.estimateFaces(d,false);case 13:(f=n.sent).length>0&&f.length<2&&(h=f[0].topLeft,p=f[0].bottomRight,m=[p[0]-h[0],p[1]-h[1]],console.log("One face found"),j=m[1],(b=m[0])>d.shape[1]-h[0]&&(b=d.shape[1]-h[0]),j>d.shape[0]-h[1]&&(j=d.shape[0]-h[1]),console.log(d.shape),console.log(m),console.log(h),x=d.slice([h[1]-30,h[0]],[Math.round(j)+30,Math.round(b)]),v=l.d.resizeBilinear(x,[224,224]).div(l.f(255)),O=l.b(v,"float32"),w=O.expandDims(0),y=c.predict(w).dataSync(),k=y[0],A=y[1],R=y[2],S="red",M="",N=1,k>A&&k>R?(N=k,S="blue",M=g[0]):A>k&&A>R?(N=A,S="yellow",M=g[1]):(N=R,S="red",M=g[2]),requestAnimationFrame((function(){u.strokeStyle=S,u.lineWidth=10,u.fillStyle="white",u.font="40px Arial",u.beginPath(),u.fillText(M+" - "+Math.round(100*N)/100,h[0]-50,h[1]-50),u.rect(h[0],h[1]-30,m[0],m[1]+30),u.stroke()})),l.c(d),l.c(v),l.c(O),l.c(w)),l.c(d);case 16:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}();return Object(r.useEffect)((function(){n()}),[]),Object(h.jsx)("div",{className:"App",children:Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)(f.a,{ref:e,muted:!0,style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:224,height:224}}),Object(h.jsx)("canvas",{ref:t,style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:8,width:224,height:224}})]})})};i.a.render(Object(h.jsxs)(c.a.StrictMode,{children:[Object(h.jsx)("div",{className:"header",children:Object(h.jsx)("h1",{children:"Face mask detection"})}),Object(h.jsx)(m,{})]}),document.getElementById("root"))}},[[302,1,2]]]);
//# sourceMappingURL=main.6383a6d8.chunk.js.map