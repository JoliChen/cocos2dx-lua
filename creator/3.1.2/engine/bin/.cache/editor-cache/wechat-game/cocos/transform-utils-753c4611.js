System.register(["./fog-01fb8507.js"],(function(t){"use strict";var e,n,i,r,a,s,o,u,l,h,c,f,p,d,_,v,m,g,y,b,S,w,M,P,T,I,A,k,E,R,C,O,L,F,x,W,B,D,N,z,V,q,j,G,H,U,Y;return{setters:[function(t){e=t.eu,n=t.en,i=t.w,r=t.ex,a=t.eE,s=t.eF,o=t.l,u=t.f,l=t.dh,h=t.d0,c=t.dA,f=t.gu,p=t.dg,d=t.d3,_=t.ev,v=t.t,m=t.dY,g=t.ew,y=t.e1,b=t.gv,S=t.eN,w=t.dJ,M=t.cW,P=t.cY,T=t.c_,I=t.da,A=t.d6,k=t.e,E=t.ee,R=t.dz,C=t.gw,O=t.gx,L=t.gy,F=t.gz,x=t.gA,W=t.gB,B=t.eA,D=t.gn,N=t.fQ,z=t.gC,V=t.d,q=t.e0,j=t.go,G=t.gD,H=t.gp,U=t.gl,Y=t.eq}],execute:function(){function J(t){return t*t}function Q(t){return t*(2-t)}function K(t){return t*t*t}function X(t){return--t*t*t+1}function Z(t){return t*t*t*t}function $(t){return 1- --t*t*t*t}function tt(t){return t*t*t*t*t}function et(t){return--t*t*t*t*t+1}function nt(t){return 1===t?1:1-Math.cos(t*Math.PI/2)}function it(t){return Math.sin(t*Math.PI/2)}function rt(t){return 0===t?0:Math.pow(1024,t-1)}function at(t){return 1===t?1:1-Math.pow(2,-10*t)}function st(t){return 1-Math.sqrt(1-t*t)}function ot(t){return Math.sqrt(1- --t*t)}function ut(t){var e,n=.1;return 0===t?0:1===t?1:(!n||n<1?(n=1,e=.1):e=.4*Math.asin(1/n)/(2*Math.PI),-n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/.4))}function lt(t){var e,n=.1;return 0===t?0:1===t?1:(!n||n<1?(n=1,e=.1):e=.4*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*t)*Math.sin(2*(t-e)*Math.PI/.4)+1)}function ht(t){if(1===t)return 1;var e=1.70158;return t*t*((e+1)*t-e)}function ct(t){if(0===t)return 0;var e=1.70158;return--t*t*((e+1)*t+e)+1}function ft(t){return 1-pt(1-t)}function pt(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}t({a:xt,d:zt,e:Dt,f:Yt,h:Xt,i:Ft,k:function(t,e){for(var n=t,i="";null!==n&&n!==e;)i=n.name+"/"+i,n=n.parent;return i.slice(0,-1)},l:function(t,e,n){for(d.identity(n);t!==e;)d.fromRTS(Je,t.rotation,t.position,t.scale),d.multiply(n,Je,n),t=t.parent;return n},m:X,n:function(t,e){for(var n=0,i=d.IDENTITY;t;){if(t.stamp===e||t.stamp+1===e&&!t.node.hasChangedFlags){i=t.world,t.stamp=e;break}t.stamp=e,Ue[n++]=t,t=t.parent}for(;n>0;){var r=(t=Ue[--n]).node;d.fromRTS(t.local,r.rotation,r.position,r.scale),i=d.multiply(t.world,i,t.local)}return i},o:function(t){for(var e=Ye.get(t.uuid)||null;e;)Ye.delete(e.node.uuid),e=e.parent},p:function(t,e){for(var n,i=null,r=0;t!==e;){var a=t.uuid;if(Ye.has(a)){i=Ye.get(a);break}i={node:t,local:new d,world:new d,stamp:-1,parent:null},Ye.set(a,i),Ue[r++]=i,t=t.parent,i=null}for(;r>0;)(n=Ue[--r]).parent=i,i=n;return i},s:Kt});var dt=Pt(J,Q),_t=Pt(K,X),vt=Pt(Z,$),mt=Pt(tt,et),gt=Pt(nt,it),yt=Pt(rt,at),bt=Pt(st,ot),St=Pt(ut,lt),wt=Pt(ht,ct),Mt=Pt(ft,pt);function Pt(t,e){return function(n){return n<.5?e(2*n)/2:t(2*n-1)/2+.5}}var Tt,It,At,kt,Et,Rt,Ct,Ot,Lt=Object.freeze({__proto__:null,constant:function(){return 0},linear:function(t){return t},quadIn:J,quadOut:Q,quadInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},cubicIn:K,cubicOut:X,cubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},quartIn:Z,quartOut:$,quartInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},quintIn:tt,quintOut:et,quintInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},sineIn:nt,sineOut:it,sineInOut:function(t){return.5*(1-Math.cos(Math.PI*t))},expoIn:rt,expoOut:at,expoInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},circIn:st,circOut:ot,circInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},elasticIn:ut,elasticOut:lt,elasticInOut:function(t){var e,n=.1;return 0===t?0:1===t?1:(!n||n<1?(n=1,e=.1):e=.4*Math.asin(1/n)/(2*Math.PI),(t*=2)<1?n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/.4)*-.5:n*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-e)*Math.PI/.4)*.5+1)},backIn:ht,backOut:ct,backInOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)},bounceIn:ft,bounceOut:pt,bounceInOut:function(t){return t<.5?.5*ft(2*t):.5*pt(2*t-1)+.5},smooth:function(t){return t<=0?0:t>=1?1:t*t*(3-2*t)},fade:function(t){return t<=0?0:t>=1?1:t*t*t*(t*(6*t-15)+10)},quadOutIn:dt,cubicOutIn:_t,quartOutIn:vt,quintOutIn:mt,sineOutIn:gt,expoOutIn:yt,circOutIn:bt,elasticOutIn:St,backOutIn:wt,bounceOutIn:Mt});function Ft(t){return"string"==typeof t||"number"==typeof t}function xt(t,e){return t instanceof e}t("b",Lt);var Wt=t("H",e("cc.animation.HierarchyPath")((kt=function(){function t(t){a(this,"path",At,this),this.path=t||""}return t.prototype.get=function(t){return t instanceof n?t.getChildByPath(this.path)||(i('Node "'+t.name+'" has no path "'+this.path+'"'),null):(i("Target of hierarchy path should be of type Node."),null)},t}(),At=r((It=kt).prototype,"path",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),Tt=It))||Tt),Bt=t("C",e("cc.animation.ComponentPath")((Ot=function(){function t(t){a(this,"component",Ct,this),this.component=t||""}return t.prototype.get=function(t){return t instanceof n?t.getComponent(this.component)||(i('Node "'+t.name+'" has no component "'+this.component+'"'),null):(i("Target of component path should be of type Node."),null)},t}(),Ct=r((Rt=Ot).prototype,"component",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),Et=Rt))||Et);function Dt(t){for(var e=t,n=0;n<(arguments.length<=1?0:arguments.length-1);++n){var r=n+1<1||arguments.length<=n+1?void 0:arguments[n+1];if(Ft(r)){if(!(r in e))return i('Target object has no property "'+r+'"'),null;e=e[r]}else e=r.get(e);if(null===e)break}return e}function Nt(t,e,n){void 0===n&&(n=1e-6);for(var i=0,r=t.length-1,a=r>>>1;i<=r;a=i+r>>>1){var s=t[a];if(s>e+n)r=a-1;else{if(!(s<e-n))return a;i=a+1}}return~i}function zt(t,e,n,i,r){var a=1-r;return a*(a*(t+(3*e-t)*r)+3*n*r*r)+i*r*r*r}o.bezier=zt;var Vt=Math.cos,qt=Math.acos,jt=Math.max,Gt=2*Math.PI,Ht=Math.sqrt;function Ut(t){return t<0?-Math.pow(-t,1/3):Math.pow(t,1/3)}function Yt(t,e){var n=function(t,e){var n,i,r,a,s=e-0,o=e-t[0],u=3*s,l=3*o,h=3*(e-t[2]),c=1/(-s+l-h+(e-1)),f=1/3,p=(u-6*o+h)*c,d=p*f,_=(-u+l)*c,v=(3*_-p*p)*f,m=v*f,g=(2*p*p*p-9*p*_+s*c*27)/27,y=g/2,b=y*y+m*m*m;if(b<0){var S=-v*f,w=Ht(S*S*S),M=-g/(2*w),P=qt(M<-1?-1:M>1?1:M),T=2*Ut(w);return i=T*Vt(P*f)-d,r=T*Vt((P+Gt)*f)-d,a=T*Vt((P+2*Gt)*f)-d,i>=0&&i<=1?r>=0&&r<=1?a>=0&&a<=1?jt(i,r,a):jt(i,r):a>=0&&a<=1?jt(i,a):i:r>=0&&r<=1?a>=0&&a<=1?jt(r,a):r:a}if(0===b)return r=-(n=y<0?Ut(-y):-Ut(y))-d,(i=2*n-d)>=0&&i<=1?r>=0&&r<=1?jt(i,r):i:r;var I=Ht(b);return(n=Ut(-y+I))-Ut(y+I)-d}(t,e),i=t[1];return((1-n)*(i+(t[3]-i)*n)*3+n*n)*n}o.bezierByTime=Yt;var Jt=t("R",function(){function t(t){var e,n;this.ratios=void 0,this._findRatio=void 0,this.ratios=t;for(var i=!0,r=1,a=t.length;r<a;r++)if(e=t[r]-t[r-1],1===r)n=e;else if(Math.abs(e-n)>1e-6){i=!1;break}this._findRatio=i?Zt:Nt}return t.prototype.sample=function(t){return this._findRatio(this.ratios,t)},t}());o.RatioSampler=Jt;var Qt=t("g",function(){function t(e,n){this.types=void 0,this.type=null,this._values=[],this._lerp=void 0,this._duration=void 0,this._array=void 0,this._duration=n,this._values=e.values;var i=function(e){return"string"==typeof e?e:Array.isArray(e)?e[0]===e[1]&&e[2]===e[3]?t.Linear:t.Bezier(e):t.Linear};if(void 0!==e.easingMethod)this.type=i(e.easingMethod);else if(Array.isArray(e.easingMethods))this.types=e.easingMethods.map(i);else if(void 0!==e.easingMethods){this.types=new Array(this._values.length).fill(null);for(var r=0,a=Object.keys(e.easingMethods);r<a.length;r++){var s=a[r];this.types[s]=i(e.easingMethods[s])}}else this.type=null;var o=e.values[0];(void 0===e.interpolate||e.interpolate)&&(this._lerp=de(o)),void 0!==e._arrayLength&&(this._array=new Array(e._arrayLength))}t.Bezier=function(t){return t};var e=t.prototype;return e.hasLerp=function(){return!!this._lerp},e.valueAt=function(t){if(void 0===this._array){var e=this._values[t];return e&&e.getNoLerp?e.getNoLerp():e}for(var n=0;n<this._array.length;++n)this._array[n]=this._values[this._array.length*t+n];return this._array},e.valueBetween=function(t,e,n,i,r){if(this._lerp){var a=this.types?this.types[e]:this.type,s=r-n,o=(t-n)/s;if(a&&(o=Xt(o,a)),void 0===this._array){var u=this._values[e],l=this._values[i];return this._lerp(u,l,o,s*this._duration)}for(var h=0;h<this._array.length;++h){var c=this._values[this._array.length*e+h],f=this._values[this._array.length*i+h];this._array[h]=this._lerp(c,f,o,s*this._duration)}return this._array}if(void 0===this._array)return this.valueAt(e);for(var p=0;p<this._array.length;++p)this._array[p]=this._values[this._array.length*e+p];return this._array},e.empty=function(){return 0===this._values.length},e.constant=function(){return 1===this._values.length},t}());function Kt(t,e,n){var i=e.sample(n);if(i<0)if((i=~i)<=0)i=0;else{if(!(i>=e.ratios.length))return t.valueBetween(n,i-1,e.ratios[i-1],i,e.ratios[i]);i=e.ratios.length-1}return t.valueAt(i)}function Xt(t,e){if("string"==typeof e){var n=Lt[e];n?t=n(t):u(3906,e)}else Array.isArray(e)&&(t=Yt(e,t));return t}function Zt(t,e){var n=t.length-1;if(0===n)return 0;var i=t[0];if(e<i)return 0;var r=t[n];if(e>r)return n;var a=(e=(e-i)/(r-i))/(1/n),s=0|a,o=1e-6;return a-s<o?s:s+1-a<o?s+1:~(s+1)}Qt.Linear=null,o.AnimCurve=Qt,t("E",function(){function t(){this.events=[]}return t.prototype.add=function(t,e){this.events.push({func:t||"",params:e||[]})},t}()),o.sampleAnimationCurve=Kt;var $t,te,ee,ne,ie,re,ae,se,oe,ue,le,he,ce,fe,pe,de=function(){function t(t,e,n,i){return t.lerp(e,n,i)}return function(e){if(null!==e){if("number"==typeof e)return l;if("object"==typeof e&&e.constructor){if(e instanceof h)return n=new h,function(t,e,i){return h.slerp(n,t,e,i)};if(e instanceof c)return function(t){var e=new t;return function(n,i,r){return t.lerp(e,n,i,r),e}}(e.constructor);if(e.constructor===Number)return l;if(f(e))return t}var n}}}(),_e=t("S",function(){function t(){}return t.getOrExtract=function(e){var n=t.pool.get(e);return n&&n.info.sample===e.sample||(n&&o.director.root.dataPoolManager.releaseAnimationClip(e),n=function(t){var e={};t.curves.forEach((function(t){if(!t.valueAdapter&&xt(t.modifiers[0],Wt)&&Ft(t.modifiers[1])){var n=t.modifiers[0].path,i=e[n];i||(i=e[n]={}),i[t.modifiers[1]]={values:t.data.values,keys:t.data.keys}}}));for(var n=Math.ceil(t.sample*t.duration)+1,i=function(){var i=a[r],s=e[i];if(!s)return"continue";Object.defineProperty(s,"worldMatrix",{get:function(){if(!s._worldMatrix){var r=s.position,a=s.rotation,o=s.scale;ve(t,r,n),ve(t,a,n),ve(t,o,n),function(t,e,n){var i=n.position.values,r=n.rotation.values,a=n.scale.values,s=i.map((function(){return new d})),o=e.lastIndexOf("/"),u=null;if(o>0){var l=t[e.substring(0,o)];if(!l)return void console.warn("no data for parent bone?");u=l.worldMatrix.values}for(var h=0;h<i.length;h++){var c=i[h],f=r[h],p=a[h],_=s[h];d.fromRTS(_,f,c,p),u&&d.multiply(_,u[h],_)}Object.keys(n).forEach((function(t){return delete n[t]})),n._worldMatrix={keys:0,interpolate:!1,values:s}}(e,i,s)}return s._worldMatrix}})},r=0,a=Object.keys(e);r<a.length;r++)i();return{info:{frames:n,sample:t.sample},data:e}}(e),t.pool.set(e,n)),n},t.destroy=function(e){t.pool.delete(e)},t}());function ve(t,e,n){var i=t.keys[e.keys],r=[];if(i&&1!==i.length)for(var a=e.values[0]instanceof h,s=0,o=0;s<n;s++){for(var u=s/t.sample;i[o]<=u;)o++;o>i.length-1?u=i[o=i.length-1]:0===o&&(o=1);var l=e.values[o-1].clone(),c=i[o]-i[o-1],f=c?p((u-i[o-1])/c):1;a?l.slerp(e.values[o],f):l.lerp(e.values[o],f),r[s]=l}else for(var d=0;d<n;d++)r[d]=e.values[0].clone();e.values=r}_e.pool=new Map;var me=t("j",e("cc.AnimationClip")((pe=fe=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return e=t.call.apply(t,[this].concat(i))||this,a(e,"sample",ee,S(e)),a(e,"speed",ne,S(e)),a(e,"wrapMode",ie,S(e)),a(e,"events",re,S(e)),a(e,"enableTrsBlending",ae,S(e)),a(e,"_duration",se,S(e)),a(e,"_keys",oe,S(e)),a(e,"_stepness",ue,S(e)),a(e,"_curves",le,S(e)),a(e,"_commonTargets",he,S(e)),a(e,"_hash",ce,S(e)),e.frameRate=0,e._ratioSamplers=[],e._runtimeCurves=void 0,e._runtimeEvents=void 0,e._data=null,e}_(e,t),e.createWithSpriteFrames=function(t,n){if(!Array.isArray(t))return u(3905),null;var i=new e;i.sample=n||i.sample,i.duration=t.length/i.sample;for(var r=1/i.sample,a=new Array(t.length),s=new Array(a.length),o=0;o<t.length;o++)a[o]=o*r,s[o]=t[o];return i.keys=[a],i.curves=[{modifiers:[new Bt("cc.Sprite"),"spriteFrame"],data:{keys:0,values:s}}],i};var n=e.prototype;return n.onLoaded=function(){this.frameRate=this.sample,this._decodeCVTAs()},n.getPropertyCurves=function(){return this._runtimeCurves||this._createPropertyCurves(),this._runtimeCurves},n.updateEventDatas=function(){delete this._runtimeEvents},n.getEventGroupIndexAtRatio=function(t){return this._runtimeEvents||this._createRuntimeEvents(),Nt(this._runtimeEvents.ratios,t)},n.hasEvents=function(){return 0!==this.events.length},n.destroy=function(){return o.director.root.dataPoolManager&&o.director.root.dataPoolManager.releaseAnimationClip(this),_e.destroy(this),t.prototype.destroy.call(this)},n._createPropertyCurves=function(){var t=this;this._ratioSamplers=this._keys.map((function(e){return new Jt(e.map((function(e){return e/t._duration})))})),this._runtimeCurves=this._curves.map((function(e){return{curve:new Qt(e.data,t._duration),modifiers:e.modifiers,valueAdapter:e.valueAdapter,sampler:t._ratioSamplers[e.data.keys],commonTarget:e.commonTarget}})),this._applyStepness()},n._createRuntimeEvents=function(){for(var t,e=this,n=[],i=[],r=this.events.sort((function(t,e){return t.frame-e.frame})),a=function(){var r=t.value,a=r.frame/e._duration,s=n.findIndex((function(t){return t===a}));s<0&&(s=n.length,n.push(a),i.push({events:[]})),i[s].events.push({functionName:r.func,parameters:r.params})},s=v(r);!(t=s()).done;)a();this._runtimeEvents={ratios:n,eventGroups:i}},n._applyStepness=function(){},n._decodeCVTAs=function(){var t=ArrayBuffer.isView(this._nativeAsset)?this._nativeAsset.buffer:this._nativeAsset;if(t){for(var e=this._keys,n=0;n<e.length;++n){var i=e[n];i instanceof m&&(e[n]=i.decompress(t))}for(var r=0;r<this._curves.length;++r){var a=this._curves[r];a.data.values instanceof m&&(a.data.values=a.data.values.decompress(t))}}},n.validate=function(){return this.keys.length>0&&this.curves.length>0},g(e,[{key:"duration",get:function(){return this._duration},set:function(t){this._duration=t}},{key:"keys",get:function(){return this._keys},set:function(t){this._keys=t}},{key:"eventGroups",get:function(){return this._runtimeEvents||this._createRuntimeEvents(),this._runtimeEvents.eventGroups}},{key:"stepness",get:function(){return this._stepness},set:function(t){this._stepness=t,this._applyStepness()}},{key:"hash",get:function(){if(this._hash)return this._hash;var t=this._nativeAsset,e=new Uint8Array(ArrayBuffer.isView(t)?t.buffer:t);return this._hash=w(e,666)}},{key:"curves",get:function(){return this._curves},set:function(t){this._curves=t,delete this._runtimeCurves}},{key:"data",get:function(){return this._data}},{key:"commonTargets",get:function(){return this._commonTargets},set:function(t){this._commonTargets=t}}]),e}(y),fe.WrapMode=b,ee=r((te=pe).prototype,"sample",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 60}}),ne=r(te.prototype,"speed",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),ie=r(te.prototype,"wrapMode",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return b.Normal}}),re=r(te.prototype,"events",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),ae=r(te.prototype,"enableTrsBlending",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),se=r(te.prototype,"_duration",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),oe=r(te.prototype,"_keys",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),ue=r(te.prototype,"_stepness",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),le=r(te.prototype,"_curves",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),he=r(te.prototype,"_commonTargets",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),ce=r(te.prototype,"_hash",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),$t=te))||$t);o.AnimationClip=me;var ge,ye,be=((ge=new Map).set(M,{createBuffer:function(){return new M},copy:M.copy}),ge.set(P,{createBuffer:function(){return new P},copy:P.copy}),ge.set(T,{createBuffer:function(){return new T},copy:T.copy}),ge.set(I,{createBuffer:function(){return new I},copy:I.copy}),ge.set(A,{createBuffer:function(){return new A},copy:function(t,e){return t.set(e)}}),function(t){return ge.get(null==t?void 0:t.constructor)}),Se=function(){function t(t,e){this._object=void 0,this._propertyName=void 0,this._object=t,this._propertyName=e}var e=t.prototype;return e.setValue=function(t){this._object[this._propertyName]=t},e.getValue=function(){return this._object[this._propertyName]},t}(),we=function(){function t(t){this._proxy=void 0,this._proxy=t}var e=t.prototype;return e.setValue=function(t){this._proxy.set(t)},e.getValue=function(){var t=this._proxy;return t.get?t.get():(k("Target doesn't provide a get method."),null)},t}(),Me=function(){function t(){this._isPlaying=!1,this._isPaused=!1,this._stepOnce=!1}var e=t.prototype;return e.play=function(){this._isPlaying?this._isPaused?(this._isPaused=!1,this.onResume()):this.onError(E(3912)):(this._isPlaying=!0,this.onPlay())},e.stop=function(){this._isPlaying&&(this._isPlaying=!1,this.onStop(),this._isPaused=!1)},e.pause=function(){this._isPlaying&&!this._isPaused&&(this._isPaused=!0,this.onPause())},e.resume=function(){this._isPlaying&&this._isPaused&&(this._isPaused=!1,this.onResume())},e.step=function(){this.pause(),this._stepOnce=!0,this._isPlaying||this.play()},e.update=function(){},e.onPlay=function(){},e.onPause=function(){},e.onResume=function(){},e.onStop=function(){},e.onError=function(){},g(t,[{key:"isPlaying",get:function(){return this._isPlaying}},{key:"isPaused",get:function(){return this._isPaused}},{key:"isMotionless",get:function(){return!this.isPlaying||this.isPaused}}]),t}();!function(t){t.PLAY="play",t.STOP="stop",t.PAUSE="pause",t.RESUME="resume",t.LASTFRAME="lastframe",t.FINISHED="finished"}(ye||(ye={})),R(ye);var Pe=function(){function t(t,e,n){this.commonTargetIndex=-1,this._curve=void 0,this._boundTarget=void 0,this._curveDetail=void 0,this._curve=t.curve,this._curveDetail=t,this._boundTarget=n,this._shouldLerp=t.curve.hasLerp()}var e=t.prototype;return e.applySample=function(t,e,n,i,r){var a;a=this._shouldLerp&&n?this._curve.valueBetween(t,i.from,i.fromRatio,i.to,i.toRatio):this._curve.valueAt(e),this._setValue(a,r)},e._setValue=function(t){this._boundTarget.setValue(t)},g(t,[{key:"propertyName",get:function(){return""}},{key:"curveDetail",get:function(){return this._curveDetail}}]),t}(),Te=t("A",function(t){function e(e,n){var i;return void 0===n&&(n=""),(i=t.call(this)||this).duration=1,i.speed=1,i.time=0,i.frameRate=0,i._targetNode=null,i._curveLoaded=!1,i._clip=void 0,i._useSimpleProcess=!1,i._samplerSharedGroups=[],i._target=null,i._ignoreIndex=-1,i._commonTargetStatuses=[],i._wrapMode=b.Normal,i._repeatCount=1,i._delay=0,i._delayTime=0,i._currentFramePlayed=!1,i._lastIterations=NaN,i._lastWrapInfo=null,i._lastWrapInfoEvent=null,i._wrappedInfo=new O,i._blendStateBuffer=null,i._blendStateWriters=[],i._allowLastFrame=!1,i._blendStateWriterHost={weight:0},i._playbackDuration=0,i._invDuration=1,i._weight=0,i._clipHasEvent=!1,i._clip=e,i._name=n||e&&e.name,i._playbackRange={min:0,max:e.duration},i._playbackDuration=e.duration,e.duration||F("Clip "+e.name+" has zero duration."),i}_(e,t);var i=e.prototype;return i.initialize=function(t,e){var i,r,a=this;if(!this._curveLoaded){this._curveLoaded=!0,this._destroyBlendStateWriters(),this._samplerSharedGroups.length=0,this._blendStateBuffer=null!==(i=null===(r=o.director.getAnimationManager())||void 0===r?void 0:r.blendState)&&void 0!==i?i:null,this._targetNode=t;var s=this._clip;this.duration=s.duration,this._invDuration=1/this.duration,this.speed=s.speed,this.wrapMode=s.wrapMode,this.frameRate=s.sample,this._playbackRange.min=0,this._playbackRange.max=s.duration,this._playbackDuration=s.duration,this._clipHasEvent=s.hasEvents(),(this.wrapMode&C.Loop)===C.Loop?this.repeatCount=1/0:this.repeatCount=1;var u=function(t,e,i,r){if(!(s.enableTrsBlending&&function(t){var e;if(1===t.length&&"string"==typeof t[0])e=t[0];else if(t.length>1){for(var n=0;n<t.length-1;++n)if(!(t[n]instanceof Wt))return!1;e=t[t.length-1]}switch(e){case"position":case"scale":case"rotation":case"eulerAngles":return!0;default:return!1}}(e)&&a._blendStateBuffer))return function(t,e,n){var i=e[e.length-1];if(0!==e.length&&Ft(i)&&!n){var r=Dt.apply(void 0,[t].concat(e.slice(0,e.length-1)));return null===r?null:new Se(r,i)}if(n){var a=Dt.apply(void 0,[t].concat(e));if(null===a)return null;var s=n.forTarget(a);return new we(s)}return k("Empty animation curve."),null}(t,e,i);var o=Dt.apply(void 0,[t].concat(e.slice(0,e.length-1)));if(null!==o&&o instanceof n){var u=e[e.length-1],l=a._blendStateBuffer.createWriter(o,u,a._blendStateWriterHost,r);return a._blendStateWriters.push(l),l}return null};this._commonTargetStatuses=s.commonTargets.map((function(e){var n=u(t,e.modifiers,e.valueAdapter,!1);if(!n)return null;var i=function(t){if(null===t)return null;var e=t.getValue(),n=be(e);if(!n)return k("Value is not copyable!"),null;var i=n.createBuffer(),r=n.copy;return Object.assign(t,{peek:function(){return i},pull:function(){var e=t.getValue();r(i,e)},push:function(){t.setValue(i)}})}(n);return null===i?null:{target:i,changed:!1}})),e||(e=s.getPropertyCurves());for(var l=function(n){var i=e[n];if(i.curve.empty())return"continue";var r=a._samplerSharedGroups.find((function(t){return t.sampler===i.sampler}));r||(r={sampler:i.sampler,curves:[],samplerResultCache:{from:0,fromRatio:0,to:0,toRatio:0}},a._samplerSharedGroups.push(r));var s=void 0;if(void 0===i.commonTarget)s=t;else{var o=a._commonTargetStatuses[i.commonTarget];if(!o)return"continue";s=o.target.peek()}var l=u(s,i.modifiers,i.valueAdapter,i.curve.constant());if(null===l);else{var h,c=new Pe(i,s,l);c.commonTargetIndex=null!==(h=i.commonTarget)&&void 0!==h?h:-1,r.curves.push(c)}},h=0;h<e.length;++h)l(h)}},i.destroy=function(){this._destroyBlendStateWriters()},i.emit=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];o.director.getAnimationManager().pushDelayEvent(this._emit,this,e)},i.on=function(t,e,n){return this._target&&this._target.isValid?this._target.on(t,e,n):null},i.once=function(t,e,n){return this._target&&this._target.isValid?this._target.once(t,e,n):null},i.off=function(t,e,n){this._target&&this._target.isValid&&this._target.off(t,e,n)},i.allowLastFrameEvent=function(t){this._allowLastFrame=t},i._setEventTarget=function(t){this._target=t},i.setTime=function(t){this._currentFramePlayed=!1,this.time=t||0,this._lastWrapInfoEvent=null,this._ignoreIndex=-1;var e=this.getWrappedInfo(t,this._wrappedInfo),n=e.direction,i=this._clip.getEventGroupIndexAtRatio(e.ratio);i<0&&(i=~i-1,n<0&&(i+=1),this._ignoreIndex=i)},i.update=function(t){this._delayTime>0&&(this._delayTime-=t,this._delayTime>0)||(this._currentFramePlayed?this.time+=t*this.speed:this._currentFramePlayed=!0,this._process())},i.sample=function(){var t=this.getWrappedInfo(this.time,this._wrappedInfo);return this._sampleCurves(t.ratio),this._sampleEvents(t),t},i.onPlay=function(){this.setTime(0),this._delayTime=this._delay,this._onReplayOrResume(),this.emit(ye.PLAY,this)},i.onStop=function(){this.isPaused||this._onPauseOrStop(),this.emit(ye.STOP,this)},i.onResume=function(){this._onReplayOrResume(),this.emit(ye.RESUME,this)},i.onPause=function(){this._onPauseOrStop(),this.emit(ye.PAUSE,this)},i._sampleCurves=function(t){for(var e=this.weight,n=this._commonTargetStatuses,i=0,r=n.length;i<r;++i){var a=n[i];a&&(a.target.pull(),a.changed=!1)}this._samplerSharedGroups.forEach((function(i){var r=i.sampler,a=i.samplerResultCache,s=0,o=!1;r?(s=r.sample(t))<0&&((s=~s)<=0?s=0:s>=r.ratios.length?s=r.ratios.length-1:(o=!0,a.from=s-1,a.fromRatio=r.ratios[a.from],a.to=s,a.toRatio=r.ratios[a.to],s=a.from)):s=0;for(var u=i.curves,l=0,h=u.length;l<h;++l){var c=u[l];if(c.applySample(t,s,o,a,e),c.commonTargetIndex>=0){var f=n[c.commonTargetIndex];f&&(f.changed=!0)}}}));for(var s=0,o=n.length;s<o;++s){var u=n[s];u&&u.changed&&u.target.push()}},i._process=function(){this._useSimpleProcess?this.simpleProcess():this.process()},i.process=function(){var t,e=this.sample();this._allowLastFrame&&(t=this._lastWrapInfo?this._lastWrapInfo:this._lastWrapInfo=new O(e),this.repeatCount>1&&(0|e.iterations)>(0|t.iterations)&&this.emit(ye.LASTFRAME,this),t.set(e)),e.stopped&&(this.stop(),this.emit(ye.FINISHED,this))},i.simpleProcess=function(){var t=this._playbackRange.min,e=this._playbackDuration,n=this.time%e;n<0&&(n+=e);var i=(t+n)*this._invDuration;this._sampleCurves(i),this._clipHasEvent&&this._sampleEvents(this.getWrappedInfo(this.time,this._wrappedInfo)),this._allowLastFrame&&(Number.isNaN(this._lastIterations)&&(this._lastIterations=i),(this.time>0&&this._lastIterations>i||this.time<0&&this._lastIterations<i)&&this.emit(ye.LASTFRAME,this),this._lastIterations=i)},i.cache=function(){},i._needReverse=function(t){var e=this.wrapMode,n=!1;return(e&C.PingPong)===C.PingPong&&(t-(0|t)==0&&t>0&&(t-=1),1&t&&(n=!n)),(e&C.Reverse)===C.Reverse&&(n=!n),n},i.getWrappedInfo=function(t,e){e=e||new O;var n=this._getPlaybackStart(),i=this._getPlaybackEnd()-n,r=!1,a=this.repeatCount,s=t>0?t/i:-t/i;if(s>=a){s=a,r=!0;var o=a-(0|a);0===o&&(o=1),t=o*i*(t>0?1:-1)}if(t>i){var u=t%i;t=0===u?i:u}else t<0&&0!=(t%=i)&&(t+=i);var l=!1,h=this._wrapMode&C.ShouldWrap;h&&(l=this._needReverse(s));var c=l?-1:1;return this.speed<0&&(c*=-1),h&&l&&(t=i-t),e.time=n+t,e.ratio=e.time/this.duration,e.direction=c,e.stopped=r,e.iterations=s,e},i._getPlaybackStart=function(){return this._playbackRange.min},i._getPlaybackEnd=function(){return this._playbackRange.max},i._sampleEvents=function(t){var e=this._clip.eventGroups.length,n=t.direction,i=this._clip.getEventGroupIndexAtRatio(t.ratio);if(i<0&&(i=~i-1,n<0&&(i+=1)),this._ignoreIndex!==i&&(this._ignoreIndex=-1),t.frameIndex=i,!this._lastWrapInfoEvent)return this._fireEvent(i),void(this._lastWrapInfoEvent=new O(t));var r=this.wrapMode,a=Ie(t.iterations),s=this._lastWrapInfoEvent,u=Ie(s.iterations),l=s.frameIndex,h=s.direction,c=-1!==u&&a!==u;if(l===i&&c&&1===e)this._fireEvent(0);else if(l!==i||c){n=h;do{if(l!==i){if(-1===n&&0===l&&i>0?((r&C.PingPong)===C.PingPong?n*=-1:l=e,u++):1===n&&l===e-1&&i<e-1&&((r&C.PingPong)===C.PingPong?n*=-1:l=-1,u++),l===i)break;if(u>a)break}l+=n,o.director.getAnimationManager().pushDelayEvent(this._fireEvent,this,[l])}while(l!==i&&l>-1&&l<e)}this._lastWrapInfoEvent.set(t)},i._emit=function(t,e){this._target&&this._target.isValid&&this._target.emit(t,t,e)},i._fireEvent=function(t){if(this._targetNode&&this._targetNode.isValid){var e=this._clip.eventGroups;if(!(t<0||t>=e.length||this._ignoreIndex===t))for(var n,i=e[t],r=this._targetNode.components,a=v(i.events);!(n=a()).done;)for(var s,o=n.value,u=o.functionName,l=v(r);!(s=l()).done;){var h=s.value,c=h[u];"function"==typeof c&&c.apply(h,o.parameters)}}},i._onReplayOrResume=function(){o.director.getAnimationManager().addAnimation(this)},i._onPauseOrStop=function(){o.director.getAnimationManager().removeAnimation(this)},i._destroyBlendStateWriters=function(){this._blendStateWriters.length&&L(this._blendStateBuffer);for(var t=0;t<this._blendStateWriters.length;++t)this._blendStateBuffer.destroyWriter(this._blendStateWriters[t]);this._blendStateWriters.length=0,this._blendStateBuffer&&(this._blendStateBuffer=null)},g(e,[{key:"clip",get:function(){return this._clip}},{key:"name",get:function(){return this._name}},{key:"length",get:function(){return this.duration}},{key:"wrapMode",get:function(){return this._wrapMode},set:function(t){this._wrapMode=t,this.time=0,t&C.Loop?this.repeatCount=1/0:this.repeatCount=1}},{key:"repeatCount",get:function(){return this._repeatCount},set:function(t){this._repeatCount=t;var e=this._wrapMode&C.ShouldWrap,n=(this.wrapMode&C.Reverse)===C.Reverse;this._useSimpleProcess=t===1/0&&!e&&!n}},{key:"delay",get:function(){return this._delay},set:function(t){this._delayTime=this._delay=t}},{key:"playbackRange",get:function(){return this._playbackRange},set:function(t){x(t.max>t.min),this._playbackRange.min=Math.max(t.min,0),this._playbackRange.max=Math.min(t.max,this.duration),this._playbackDuration=this._playbackRange.max-this._playbackRange.min,this.setTime(0)}},{key:"current",get:function(){return this.getWrappedInfo(this.time).time}},{key:"ratio",get:function(){return this.current/this.duration}},{key:"weight",get:function(){return this._weight},set:function(t){this._weight=t,this._blendStateWriterHost.weight=t}},{key:"curveLoaded",get:function(){return this._curveLoaded}}]),e}(Me));function Ie(t){return t-(0|t)==0&&(t-=1),0|t}o.AnimationState=Te;var Ae,ke,Ee,Re,Ce,Oe,Le,Fe,xe,We,Be,De,Ne,ze,Ve,qe,je,Ge=function(t){function e(e){var n;return(n=t.call(this)||this)._managedStates=[],n._fadings=[],n._scheduled=!1,n._scheduler=null!=e?e:o.director.getAnimationManager(),n}_(e,t);var n=e.prototype;return n.update=function(t){if(!this.isMotionless){var e=this._managedStates,n=this._fadings;if(1===e.length&&1===n.length){var i=e[0].state;i&&(i.weight=1)}else this._calculateWeights(t);1===e.length&&1===n.length&&this._unscheduleThis()}},n.crossFade=function(t,e){var n;0===this._managedStates.length&&(e=0),0===e&&this.clear();var i=this._managedStates.find((function(e){return e.state===t}));i?(null===(n=i.state)||void 0===n?void 0:n.isMotionless)&&i.state.play():(i={state:t,reference:0},t&&t.play(),this._managedStates.push(i)),++i.reference,this._fadings.unshift({easeDuration:e,easeTime:0,target:i}),this.isMotionless||this._scheduleThis()},n.clear=function(){for(var t=0;t<this._managedStates.length;++t){var e=this._managedStates[t].state;e&&e.stop()}this._managedStates.length=0,this._fadings.length=0},n.onPlay=function(){t.prototype.onPlay.call(this),this._scheduleThis()},n.onPause=function(){t.prototype.onPause.call(this);for(var e=0;e<this._managedStates.length;++e){var n=this._managedStates[e].state;n&&n.pause()}this._unscheduleThis()},n.onResume=function(){t.prototype.onResume.call(this);for(var e=0;e<this._managedStates.length;++e){var n=this._managedStates[e].state;n&&n.resume()}this._scheduleThis()},n.onStop=function(){t.prototype.onStop.call(this),this.clear()},n._calculateWeights=function(t){for(var e=this._managedStates,n=this._fadings,i=0;i<e.length;++i){var r=e[i].state;r&&(r.weight=0)}for(var a=1,s=n.length,o=0;o<n.length;++o){var u=n[o];u.easeTime+=t;var l=0===u.easeDuration?1:p(u.easeTime/u.easeDuration),h=l*a;if(a*=1-l,u.target.state&&(u.target.state.weight+=h),u.easeTime>=u.easeDuration){s=o+1,u.easeTime=u.easeDuration;break}}if(s!==n.length){for(var c=s;c<n.length;++c){var f=n[c];--f.target.reference,f.target.reference<=0&&(f.target.state&&f.target.state.stop(),W(this._managedStates,f.target))}n.splice(s)}},n._scheduleThis=function(){this._scheduled||(this._scheduler.addCrossFade(this),this._scheduled=!0)},n._unscheduleThis=function(){this._scheduled&&(this._scheduler.removeCrossFade(this),this._scheduled=!1)},e}(Me);function He(t,e){return t===e||!!t&&!!e&&t._uuid===e._uuid&&t._uuid}t("c",(Ae=e("cc.Animation"),ke=j(),Ee=G(99),Re=H(),Ce=B([me]),Oe=U(),Le=B(me),Fe=U(),xe=U(),We=B([me]),Ae(Be=ke(Be=Ee(Be=D(Be=Re((je=qe=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return e=t.call.apply(t,[this].concat(i))||this,a(e,"playOnLoad",Ne,S(e)),e._crossFade=new Ge,e._nameToState=N(!0),a(e,"_clips",ze,S(e)),a(e,"_defaultClip",Ve,S(e)),e._hasBeenPlayed=!1,e}_(e,t);var n=e.prototype;return n.onLoad=function(){for(var t in this.clips=this._clips,this._nameToState)this._nameToState[t].initialize(this.node)},n.start=function(){this.playOnLoad&&!this._hasBeenPlayed&&this._defaultClip&&this.crossFade(this._defaultClip.name,0)},n.onEnable=function(){this._crossFade.resume()},n.onDisable=function(){this._crossFade.pause()},n.onDestroy=function(){for(var t in this._crossFade.stop(),this._nameToState)this._nameToState[t].destroy();this._nameToState=N(!0)},n.play=function(t){if(this._hasBeenPlayed=!0,!t){if(!this._defaultClip)return;t=this._defaultClip.name}this.crossFade(t,0)},n.crossFade=function(t,e){void 0===e&&(e=.3),this._hasBeenPlayed=!0;var n=this._nameToState[t];n&&(this._crossFade.play(),this._crossFade.crossFade(n,e))},n.pause=function(){this._crossFade.pause()},n.resume=function(){this._crossFade.resume()},n.stop=function(){this._crossFade.stop()},n.getAnimationState=function(t){return this.getState(t)},n.getState=function(t){var e=this._nameToState[t];return e&&!e.curveLoaded&&e.initialize(this.node),e||null},n.createState=function(t,e){return e=e||t.name,this.removeState(e),this._doCreateState(t,e)},n.removeState=function(t){var e=this._nameToState[t];e&&(e.allowLastFrameEvent(!1),e.stop(),delete this._nameToState[t])},n.addClip=function(t,e){return z(this._clips,t)||this._clips.push(t),this.createState(t,e)},n.removeClip=function(t,e){var n;for(var i in this._nameToState){var r=this._nameToState[i];if(r.clip===t){n=r;break}}if(t===this._defaultClip){if(!e)return void V(3902);this._defaultClip=null}if(n&&n.isPlaying){if(!e)return void V(3903);n.stop()}this._clips=this._clips.filter((function(e){return e!==t})),n&&delete this._nameToState[n.name]},n.on=function(e,n,i,r){var a=t.prototype.on.call(this,e,n,i,r);return e===ye.LASTFRAME&&this._syncAllowLastFrameEvent(),a},n.once=function(e,n,i){var r=t.prototype.once.call(this,e,n,i);return e===ye.LASTFRAME&&this._syncAllowLastFrameEvent(),r},n.off=function(e,n,i){t.prototype.off.call(this,e,n,i),e===ye.LASTFRAME&&this._syncDisallowLastFrameEvent()},n._createState=function(t,e){return new Te(t,e)},n._doCreateState=function(t,e){var n=this._createState(t,e);return n._setEventTarget(this),n.allowLastFrameEvent(this.hasEventListener(ye.LASTFRAME)),this.node&&n.initialize(this.node),this._nameToState[n.name]=n,n},n._getStateByNameOrDefaultClip=function(t){if(!t){if(!this._defaultClip)return null;t=this._defaultClip.name}return this._nameToState[t]||null},n._removeStateOfAutomaticClip=function(t){for(var e in this._nameToState){var n=this._nameToState[e];He(t,n.clip)&&(n.stop(),delete this._nameToState[e])}},n._syncAllowLastFrameEvent=function(){if(this.hasEventListener(ye.LASTFRAME))for(var t in this._nameToState)this._nameToState[t].allowLastFrameEvent(!0)},n._syncDisallowLastFrameEvent=function(){if(!this.hasEventListener(ye.LASTFRAME))for(var t in this._nameToState)this._nameToState[t].allowLastFrameEvent(!1)},g(e,[{key:"clips",get:function(){return this._clips},set:function(t){var e=this;this._crossFade&&this._crossFade.clear();for(var n,i=v(this._clips);!(n=i()).done;){var r=n.value;r&&this._removeStateOfAutomaticClip(r)}for(var a,s=v(t);!(a=s()).done;){var o=a.value;o&&this.createState(o)}var u=t.find((function(t){return He(t,e._defaultClip)}));this._defaultClip=u||null,this._clips=t}},{key:"defaultClip",get:function(){return this._defaultClip},set:function(t){this._defaultClip=t,t&&(this._clips.findIndex((function(e){return He(e,t)}))>=0||(this._clips.push(t),this.createState(t)))}}]),e}(q(Y)),qe.EventType=ye,r((De=je).prototype,"clips",[Ce,Oe],Object.getOwnPropertyDescriptor(De.prototype,"clips"),De.prototype),r(De.prototype,"defaultClip",[Le,Fe],Object.getOwnPropertyDescriptor(De.prototype,"defaultClip"),De.prototype),Ne=r(De.prototype,"playOnLoad",[s,xe],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),ze=r(De.prototype,"_clips",[We],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Ve=r(De.prototype,"_defaultClip",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),Be=De))||Be)||Be)||Be)||Be)||Be));var Ue=[],Ye=new Map,Je=new d}}}));
