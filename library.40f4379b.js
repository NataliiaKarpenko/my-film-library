!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},i=n.parcelRequireb785;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in a){var t=a[e];delete a[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},n.parcelRequireb785=i),i.register("iE7OH",(function(t,n){var r,a;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return a}),(function(e){return a=e}));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},a=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i.register("aNJCr",(function(t,n){var r;e(t.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var a={};function i(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var t=a[e];return t||(t=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(e)return i(e[2])}return"/"}(),a[e]=t),t}})),i("iE7OH").register(JSON.parse('{"2Y0K8":"library.40f4379b.js","f0jWI":"shelf-desktop.7bb6d0fb.png","bGP1H":"shelf-desktop@2x.6909a1b1.png","f0MOT":"shelf-tab.210480e4.png","clORE":"shelf-tab@2x.85309329.png","1Dd5H":"shelf-mob.0a3e7c68.png","ckvn1":"shelf-mob@2x.ebc25fea.png","i31bA":"not-authorized-desktop.6c27e0a6.png","lRM12":"not-authorized-desktop@2x.9ddae744.png","dECbq":"not-authorized-tab.714f45a8.png","lCyPD":"not-authorized-tab@2x.44e6f4e9.png","kwyPl":"not-authorized-mob.aa0b504f.png","7uipt":"not-authorized-mob@2x.26f7c7af.png","2hvCh":"index.6fba162a.js"}')),i("7OmGe"),i("hqTnp"),i("AjbG6"),i("5a7cQ"),i("kliol"),i("bNmPK");var o,s=i("6JpON"),u=i("5a7cQ"),c=i("4Nugj"),l=i("gQOBw"),f=i("kvC6y"),d=i("h7XRD"),v=i("bpxeT"),g=i("2TvXO"),p=i("6m2hf"),h=(i("6JpON"),i("4Nugj"),i("kvC6y"),i("5a7cQ"),i("8WvCV")),m=i("jcFG7"),b=i("bKWtT");i("h7XRD");o=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("f0jWI");var B;B=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("bGP1H");var y;y=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("f0MOT");var L;L=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("clORE");var E;E=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("1Dd5H");var H;H=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("ckvn1");var k=i("bNaJi"),w=(v=i("bpxeT"),g=i("2TvXO"),p=i("6m2hf"),s=i("6JpON"),c=i("4Nugj"),f=i("kvC6y"),u=i("5a7cQ"),h=i("8WvCV"),m=i("jcFG7"),b=i("bKWtT"),d=i("h7XRD"),k=i("bNaJi"),i("3ALyB")),S=function(){(0,k.hideElement)(c.refs.paginationBlock),(0,k.enableButton)(c.refs.queueBtn);c.refs.moviesList.innerHTML="",c.refs.moviesList.insertAdjacentHTML("afterbegin",(0,d.createImageNotification)(t(o),t(B),t(y),t(L),t(E),t(H),"There are no movies in your watched yet")),c.refs.watchedBtn.removeEventListener("click",Q),c.refs.watchedBtn.removeEventListener("click",R),c.refs.watchedBtn.addEventListener("click",C)};function C(){s.Notify.info("You haven't added a movie to your watched yet"),(0,k.addClass)(c.refs.watchedBtn,"active-button"),(0,k.removeClass)(c.refs.queueBtn,"active-button")}function R(){return T.apply(this,arguments)}function T(){return(T=t(v)(t(g).mark((function e(){var n,r,a;return t(g).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:m.paginationLibrary.off("afterMove",x),m.paginationLibrary.on("afterMove",_),sessionStorage.removeItem("currentPageLibraryQueue"),(0,k.addClass)(c.refs.watchedBtn,"active-button"),(0,k.removeClass)(c.refs.queueBtn,"active-button"),(0,k.hideElement)(c.refs.paginationBlock);try{(0,f.spinnerStart)(),n=sessionStorage.getItem("currentPageLibraryWatched"),r=n?parseInt(n,10):1,a=u.auth.currentUser,(0,p.onSnapshot)((0,p.doc)(u.db,"users",a.uid),(function(e){var t;(0,k.enableButton)(c.refs.queueBtn);var n=(null===(t=e.data())||void 0===t?void 0:t.watched)||[],a=n[r-1]||[],i=a.total_results;if(a.results)c.refs.watchedBtn.removeEventListener("click",C),m.paginationLibrary.reset(i),m.paginationLibrary.movePageTo(r),(0,k.disableButton)(c.refs.watchedBtn),n.length>1?(0,k.showElement)(c.refs.paginationBlock):(0,k.hideElement)(c.refs.paginationBlock);else if(n.length>0){var o=n.length,s=9*o;m.paginationLibrary.reset(s),m.paginationLibrary.movePageTo(o),n.length>1?(0,k.showElement)(c.refs.paginationBlock):(0,k.hideElement)(c.refs.paginationBlock)}else S()}))}catch(e){console.log("Error getting cached document:",e)}finally{setTimeout((function(){(0,f.spinnerStop)()}),200)}case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(e){return q.apply(this,arguments)}function q(){return(q=t(v)(t(g).mark((function e(n){var r,a;return t(g).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.page;try{(0,f.spinnerStart)(),a=u.auth.currentUser,(0,p.onSnapshot)((0,p.doc)(u.db,"users",a.uid),(function(e){var t,n=((null===(t=e.data().watched)||void 0===t?void 0:t[r-1])||[]).results;if(n){var a=n.map((function(e){var t=e.id,n=e.img,r=e.title,a=e.genres,i=e.releaseYear,o=e.vote,s=a.split(","),u=(0,w.createGenresArr)(s);return(0,h.createMovie)(t,n,r,u,i,o)}));c.refs.moviesList.innerHTML=a.join("")}sessionStorage.setItem("currentPageLibraryWatched",r),(0,b.scrollToTop)()}))}catch(e){console.log("Error getting cached document:",e)}finally{setTimeout((function(){(0,f.spinnerStop)()}),200)}case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}w=i("3ALyB");var N=function(){sessionStorage.removeItem("currentPageLibraryWatched"),(0,k.hideElement)(c.refs.paginationBlock),(0,k.enableButton)(c.refs.queueBtn);c.refs.moviesList.innerHTML="",c.refs.moviesList.insertAdjacentHTML("afterbegin",(0,d.createImageNotification)(t(o),t(B),t(y),t(L),t(E),t(H),"There are no movies in your queue yet")),c.refs.queueBtn.removeEventListener("click",Q),c.refs.queueBtn.removeEventListener("click",A),c.refs.queueBtn.addEventListener("click",O)};function O(){s.Notify.info("You haven't added a movie to your queue yet"),(0,k.addClass)(c.refs.queueBtn,"active-button"),(0,k.removeClass)(c.refs.watchedBtn,"active-button")}function A(){return P.apply(this,arguments)}function P(){return(P=t(v)(t(g).mark((function e(){var n,r,a;return t(g).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:m.paginationLibrary.off("afterMove",_),m.paginationLibrary.off("afterMove",x),m.paginationLibrary.on("afterMove",x),sessionStorage.removeItem("currentPageLibraryWatched"),(0,k.addClass)(c.refs.queueBtn,"active-button"),(0,k.removeClass)(c.refs.watchedBtn,"active-button"),(0,k.hideElement)(c.refs.paginationBlock);try{n=sessionStorage.getItem("currentPageLibraryQueue"),r=n?parseInt(n,10):1,(0,f.spinnerStart)(),a=u.auth.currentUser,(0,p.onSnapshot)((0,p.doc)(u.db,"users",a.uid),(function(e){var t;(0,k.enableButton)(c.refs.watchedBtn);var n=(null===(t=e.data())||void 0===t?void 0:t.queue)||[],a=n[r-1]||[],i=a.total_results;if(a.results)c.refs.queueBtn.removeEventListener("click",O),m.paginationLibrary.reset(i),m.paginationLibrary.movePageTo(r),(0,k.disableButton)(c.refs.queueBtn),n.length>1?(0,k.showElement)(c.refs.paginationBlock):(0,k.hideElement)(c.refs.paginationBlock);else if(n.length>0){var o=n.length,s=9*o;m.paginationLibrary.reset(s),m.paginationLibrary.movePageTo(o),n.length>1?(0,k.showElement)(c.refs.paginationBlock):(0,k.hideElement)(c.refs.paginationBlock)}else N()}))}catch(e){console.log("Error getting cached document:",e)}finally{setTimeout((function(){(0,f.spinnerStop)()}),200)}case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e){return M.apply(this,arguments)}function M(){return(M=t(v)(t(g).mark((function e(n){var r,a;return t(g).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.page;try{(0,f.spinnerStart)(),a=u.auth.currentUser,(0,p.onSnapshot)((0,p.doc)(u.db,"users",a.uid),(function(e){var t,n=((null===(t=e.data().queue)||void 0===t?void 0:t[r-1])||[]).results;if(n){var a=n.map((function(e){var t=e.id,n=e.img,r=e.title,a=e.genres,i=e.releaseYear,o=e.vote,s=a.split(","),u=(0,w.createGenresArr)(s);return(0,h.createMovie)(t,n,r,u,i,o)}));c.refs.moviesList.innerHTML=a.join("")}sessionStorage.setItem("currentPageLibraryQueue",r),(0,b.scrollToTop)()}))}catch(e){console.log("Error getting cached document:",e)}finally{setTimeout((function(){(0,f.spinnerStop)()}),200)}case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var J;k=i("bNaJi");J=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("i31bA");var I;I=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("lRM12");var U;U=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("dECbq");var j;j=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("lCyPD");var F;F=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("kwyPl");var Y;Y=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("7uipt");var K="queue";function W(e){if(K!==e){var t="queue"===(K=e)?"watched":"queue";sessionStorage.removeItem("currentPageLibrary".concat(t))}}function Q(){s.Notify.info("To use the library you should sign up or sign in")}(0,k.removeClass)(c.refs.homeLink,"active-link"),(0,k.addClass)(c.refs.libraryLink,"active-link");(0,l.onAuthStateChanged)(u.auth,(function(e){if((0,k.enableButton)(c.refs.queueBtn),(0,k.enableButton)(c.refs.watchedBtn),(0,k.hideElement)(c.refs.paginationBlock),sessionStorage.removeItem("currentPageHomePopularMovies"),sessionStorage.removeItem("currentPageHomeQuery"),sessionStorage.removeItem("userQuery"),e){var n=sessionStorage.getItem("currentPageLibraryWatched");c.refs.queueBtn.removeEventListener("click",Q),c.refs.watchedBtn.removeEventListener("click",Q),c.refs.queueBtn.addEventListener("click",(function(){W("queue"),A()})),c.refs.watchedBtn.addEventListener("click",(function(){W("watched"),R()})),n?R():A()}else(0,f.spinnerStop)(),(0,k.removeClass)(c.refs.queueBtn,"active-button"),(0,k.removeClass)(c.refs.watchedBtn,"active-button"),(0,k.hideElement)(c.refs.paginationBlock),(0,k.enableButton)(c.refs.queueBtn),"Sign up or sign in to use your library",c.refs.moviesList.innerHTML="",c.refs.moviesList.insertAdjacentHTML("afterbegin",(0,d.createImageNotification)(t(J),t(I),t(U),t(j),t(F),t(Y),"Sign up or sign in to use your library")),c.refs.queueBtn.removeEventListener("click",A),c.refs.watchedBtn.removeEventListener("click",R),c.refs.queueBtn.removeEventListener("click",O),c.refs.watchedBtn.removeEventListener("click",C),c.refs.queueBtn.addEventListener("click",Q),c.refs.watchedBtn.addEventListener("click",Q)})),i("1LZ5c"),i("9WuAv"),i("9VC5X")}();
//# sourceMappingURL=library.40f4379b.js.map