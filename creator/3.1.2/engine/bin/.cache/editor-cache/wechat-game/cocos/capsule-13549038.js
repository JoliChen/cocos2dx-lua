System.register(["./fog-01fb8507.js"],(function(n){"use strict";var s;return{setters:[function(n){s=n.cY}],execute:function(){function e(n){return void 0===(n=n||{}).includeNormal&&(n.includeNormal=!0),void 0===n.includeUV&&(n.includeUV=!0),n}n({a:e,b:function(n){var e=(n=n||{}).widthSegments||1,c=n.heightSegments||1,g=n.lengthSegments||1,l=(n.width||1)/2,m=(n.height||1)/2,M=(n.length||1)/2,P=[s.set(i,-l,-m,M),s.set(o,l,-m,M),s.set(u,l,m,M),s.set(v,-l,m,M),s.set(p,l,-m,-M),s.set(d,-l,-m,-M),s.set(f,-l,m,-M),s.set(w,l,m,-M)],S=[[2,3,1],[4,5,7],[7,6,2],[1,0,4],[1,4,2],[5,0,6]],x=[[0,0,1],[0,0,-1],[0,1,0],[0,-1,0],[1,0,0],[-1,0,0]],y=[[-1,0,0,1],[-1,0,0,1],[-1,0,0,1],[-1,0,0,1],[0,0,-1,1],[0,0,1,1]],I=[],b=[],z=[],A=[],R=[],U=new s(-l,-m,-M),V=new s(l,m,M),q=Math.sqrt(l*l+m*m+M*M);function N(n,e,i){var o,u,v,p,d=I.length/3,f=S[n],w=x[n],c=y[n];for(p=0;p<=i;p++)for(v=0;v<=e;v++)if(o=v/e,u=p/i,s.lerp(t,P[f[0]],P[f[1]],o),s.lerp(r,P[f[0]],P[f[2]],u),s.subtract(a,r,P[f[0]]),s.add(h,t,a),I.push(h.x,h.y,h.z),b.push(w[0],w[1],w[2]),z.push(o,u),A.push(c[0],c[1],c[2],c[3]),v<e&&p<i){var g=e+1,l=v+p*g,m=v+(p+1)*g,M=v+1+(p+1)*g,U=v+1+p*g;R.push(d+l,d+U,d+m),R.push(d+m,d+U,d+M)}}return N(0,e,c),N(4,g,c),N(1,e,c),N(5,g,c),N(3,e,g),N(2,e,g),{positions:I,normals:b,uvs:z,tangents:A,indices:R,minPos:U,maxPos:V,boundingRadius:q}},c:function(n,e,t,r){void 0===n&&(n=.5),void 0===e&&(e=.5),void 0===t&&(t=2),void 0===r&&(r={});var a=.5*t,h=r.radialSegments||32,i=r.heightSegments||1,o=void 0===r.capped||r.capped,u=r.arc||2*Math.PI,v=0;o||(n>0&&v++,e>0&&v++);var p=(h+1)*(i+1);o&&(p+=(h+1)*v+h*v);var d=h*i*6;o&&(d+=h*v*3);var f=new Array(d),w=new Array(3*p),l=new Array(3*p),m=new Array(2*p),M=Math.max(n,e),P=new s(-M,-a,-M),S=new s(M,a,M),x=Math.sqrt(M*M+a*a),y=0,I=0;return function(){for(var r=[],o=n-e,v=o*o/t*Math.sign(o),p=0;p<=i;p++){for(var d=[],M=p/i,P=M*o+e,S=0;S<=h;++S){var x=S/h,b=x*u,z=Math.sin(b),A=Math.cos(b);w[3*y]=P*z,w[3*y+1]=M*t-a,w[3*y+2]=P*A,s.normalize(c,s.set(g,z,-v,A)),l[3*y]=c.x,l[3*y+1]=c.y,l[3*y+2]=c.z,m[2*y]=2*(1-x)%1,m[2*y+1]=M,d.push(y),++y}r.push(d)}for(var R=0;R<i;++R)for(var U=0;U<h;++U){var V=r[R][U],q=r[R+1][U],N=r[R+1][U+1],j=r[R][U+1];f[I]=V,++I,f[I]=j,++I,f[I]=q,++I,f[I]=j,++I,f[I]=N,++I,f[I]=q,++I}}(),o&&(e>0&&b(!1),n>0&&b(!0)),{positions:w,normals:l,uvs:m,indices:f,minPos:P,maxPos:S,boundingRadius:x};function b(s){for(var t=s?n:e,r=s?1:-1,i=y,o=1;o<=h;++o)w[3*y]=0,w[3*y+1]=a*r,w[3*y+2]=0,l[3*y]=0,l[3*y+1]=r,l[3*y+2]=0,m[2*y]=.5,m[2*y+1]=.5,++y;for(var v=y,p=0;p<=h;++p){var d=p/h*u,c=Math.cos(d),g=Math.sin(d);w[3*y]=t*g,w[3*y+1]=a*r,w[3*y+2]=t*c,l[3*y]=0,l[3*y+1]=r,l[3*y+2]=0,m[2*y]=.5-.5*g*r,m[2*y+1]=.5+.5*c,++y}for(var M=0;M<h;++M){var P=i+M,S=v+M;s?(f[I]=S+1,++I,f[I]=P,++I,f[I]=S,++I):(f[I]=P,++I,f[I]=S+1,++I,f[I]=S,++I)}}},d:function(n,e,t,r){void 0===n&&(n=.5),void 0===e&&(e=.5),void 0===t&&(t=2),void 0===r&&(r={});var a=t-n-e,h=r.sides||32,i=r.heightSegments||32,o=e/t,u=a/t,v=n/t,p=Math.floor(i*o),d=Math.floor(i*v),f=Math.floor(i*u),w=a+e-t/2,c=e-t/2,g=e-t/2,l=r.arc||2*Math.PI,m=[],M=[],P=[],S=[],x=Math.max(n,e),y=new s(-x,-t/2,-x),z=new s(x,t/2,x),A=t/2,R=0,U=[];return function(){for(var n=0;n<=p;++n)for(var s=n*Math.PI/p/2,t=Math.sin(s),r=-Math.cos(s),a=0;a<=h;++a){var o=2*a*Math.PI/h-Math.PI/2,u=Math.sin(o)*t,v=r,d=Math.cos(o)*t,f=a/h,w=n/i;if(m.push(u*e,v*e+g,d*e),M.push(u,v,d),P.push(f,w),n<p&&a<h){var c=h+1,l=c*n+a,x=c*(n+1)+a,y=c*(n+1)+a+1,I=c*n+a+1;S.push(l,I,x),S.push(I,y,x)}++R}}(),function(){for(var t=(n-e)/a,r=0;r<=f;r++){for(var i=[],v=r/f,p=v*(n-e)+e,d=0;d<=h;++d){var w=d/h,g=v*u+o,x=w*l-l/4,y=Math.sin(x),z=Math.cos(x);m.push(p*y),m.push(v*a+c),m.push(p*z),s.normalize(I,s.set(b,y,-t,z)),M.push(I.x),M.push(I.y),M.push(I.z),P.push(w,g),i.push(R),++R}U.push(i)}for(var A=0;A<f;++A)for(var V=0;V<h;++V){var q=U[A][V],N=U[A+1][V],j=U[A+1][V+1],Y=U[A][V+1];S.push(q),S.push(Y),S.push(N),S.push(Y),S.push(j),S.push(N)}}(),function(){for(var s=0;s<=d;++s)for(var e=s*Math.PI/d/2+Math.PI/2,t=Math.sin(e),r=-Math.cos(e),a=0;a<=h;++a){var o=2*a*Math.PI/h-Math.PI/2,u=Math.sin(o)*t,p=r,c=Math.cos(o)*t,g=a/h,l=s/i+(1-v);if(m.push(u*n,p*n+w,c*n),M.push(u,p,c),P.push(g,l),s<d&&a<h){var x=h+1,y=x*s+a+U[f][h]+1,I=x*(s+1)+a+U[f][h]+1,b=x*(s+1)+a+1+U[f][h]+1,z=x*s+a+1+U[f][h]+1;S.push(y,z,I),S.push(z,b,I)}}}(),{positions:m,normals:M,uvs:P,indices:S,minPos:y,maxPos:z,boundingRadius:A}},p:function(n){var t=function(n){return(n=e(n)).width=n.width||10,n.length=n.length||10,n.widthSegments=n.widthSegments||10,n.lengthSegments=n.lengthSegments||10,n}(n),r=t.width,a=t.length,h=t.widthSegments,i=t.lengthSegments,o=.5*r,u=.5*a,v=[],p=[],d=[],f=new s(-o,0,-u),w=new s(o,0,u),c=Math.sqrt(r*r+a*a);s.set(S,-o,0,u),s.set(x,o,0,u),s.set(y,-o,0,-u);for(var g=0;g<=i;g++)for(var I=0;I<=h;I++){var b=I/h,z=g/i;if(s.lerp(l,S,x,b),s.lerp(m,S,y,z),s.subtract(M,m,S),s.add(P,l,M),v.push(P.x,P.y,P.z),t.includeUV&&p.push(b,z),I<h&&g<i){var A=h+1,R=I+g*A,U=I+(g+1)*A,V=I+1+(g+1)*A,q=I+1+g*A;d.push(R,q,U),d.push(q,V,U)}}var N={positions:v,indices:d,minPos:f,maxPos:w,boundingRadius:c};if(t.includeNormal){var j=(i+1)*(h+1),Y=new Array(3*j);N.normals=Y;for(var k=0;k<j;++k)Y[3*k+0]=0,Y[3*k+1]=1,Y[3*k+2]=0}return t.includeUV&&(N.uvs=p),N}});var t=new s,r=new s,a=new s,h=new s,i=new s,o=new s,u=new s,v=new s,p=new s,d=new s,f=new s,w=new s,c=new s(0,0,0),g=new s(0,0,0),l=new s(0,0,0),m=new s(0,0,0),M=new s(0,0,0),P=new s(0,0,0),S=new s(0,0,0),x=new s(0,0,0),y=new s(0,0,0),I=new s(0,0,0),b=new s(0,0,0)}}}));
