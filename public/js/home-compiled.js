function magicEightBall(){var n=$("#screens"),e=$("#screen"),t=$(".animate"),a=$(".wash");n.css({"-webkit-animation-name":"dip","-moz-animation-name":"dip"}),setTimeout(function(){n.css({"-webkit-animation-name":"","-moz-animation-name":""})},300);var i=["room1","room2","room3"];setTimeout(function(){for(var n=0;n<i.length&&!e.hasClass(i[n]);n++);e.removeClass(),n++,n=n>=i.length?0:n,setTimeout(function(){e.addClass(i[n])},0)},400),setTimeout(function(){t.css({"-webkit-animation-name":"like","-moz-animation-name":"like"}),a.css({"-webkit-animation-name":"opacity","-moz-animation-name":"opacity"}),setTimeout(function(){t.css({"-webkit-animation-name":"","-moz-animation-name":""}),a.css({"-webkit-animation-name":"","-moz-animation-name":""})},4e3)},2e3)}function performTyping(n,e,t){function a(){setTimeout(function(){o<n.length?(i.html(n.substr(0,++o)),a()):(i.addClass(e),t&&t())},0===o?300:100)}var i=$("#name");i.html("&nbsp;"),i.removeClass();var o=0;a()}$(function(){function n(n,e,t){n.style.webkitTransform="translate3d("+e+"px,"+t+"px, 0)",n.style.mozTransform="translate3d("+e+"px,"+t+"px, 0)"}function e(e){var t=Math.max(Math.min(e.beta,90),-90),m=e.gamma;n(a,m/3,t/3),n(i,m/15,t/15),n(o,m/30,t/30)}function t(){performTyping(m[s][0],m[s][1],function(){s++,s>=m.length&&(s=0),setTimeout(function(){t()},5e3)})}$(window).resize(function(){$(window).width()});var a=document.querySelector(".backgroundOne"),i=document.querySelector(".backgroundTwo"),o=document.querySelector(".backgroundThree");window.addEventListener("deviceorientation",e),setInterval(function(){magicEightBall()},5500);var m=[["#trivia","emoj"],["#bigbang","emoj"],["#history","emoj"]],s=0;t()});