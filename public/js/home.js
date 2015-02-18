$(function() {
	$(window).resize(function() {
		var width = $(window).width();
	});

	var b1 = document.querySelector('.backgroundOne');
	var b2 = document.querySelector('.backgroundTwo');
	var b3 = document.querySelector('.backgroundThree');

	function setTranslate3d(element, y, x) {
		element.style['webkitTransform'] = 'translate3d(' + y + 'px,' + x + 'px, 0)';
		element.style['mozTransform'] = 'translate3d(' + y + 'px,' + x + 'px, 0)';
	}

	function handleOrientation(event) {
	  var x = Math.max(Math.min(event.beta, 90), -90);
	  var y = event.gamma;
	  
	  setTranslate3d(b1, y / 3, x / 3);
	  setTranslate3d(b2, y / 15, x / 15);
	  setTranslate3d(b3, y / 30, x / 30);
	}
	
	window.addEventListener('deviceorientation', handleOrientation);
	
	setInterval(function() {
		magicEightBall();
	}, 3500);
	
	var inputArgs = [
		['sashimi', 'emoji1'],
		['bikeguy', 'emoji2'],
		['libby', 'emoji3']
	];
	
	var currentIdx = 0;
	function typeCurrent() {
		performTyping(inputArgs[currentIdx][0], inputArgs[currentIdx][1], function() {
			currentIdx++;
			if (currentIdx >= inputArgs.length) { currentIdx = 0; }
			setTimeout(function() { typeCurrent(); }, 3000);
		});
	}
	typeCurrent();
});

function magicEightBall() {
	var screens = $('#screens');
	var screen  = $('#screen');
	var emoji   = $('.animate');
	var wash    = $('.wash');
	
	screens.css({ '-webkit-animation-name' : 'dip', '-moz-animation-name' : 'dip' });
	setTimeout(function() {
		screens.css({'-webkit-animation-name' : '', '-moz-animation-name' : '' });
	}, 300);
	
	var roomClasses = ['room1', 'room2', 'room3'];
	
	setTimeout(function() {
		for (var idx = 0; idx < roomClasses.length; idx++) {
			if (screen.hasClass(roomClasses[idx])) {
				break;
			}
		}
		screen.removeClass();
		idx++;
		idx = idx >= roomClasses.length ? 0 : idx;
		setTimeout(function() { screen.addClass(roomClasses[idx]); }, 0);
	}, 100);
	
	setTimeout(function() {
		emoji.css({'-webkit-animation-name' : 'like', '-moz-animation-name' : 'like'});
		wash.css({'-webkit-animation-name' : 'opacity', '-moz-animation-name' : 'opacity'});
			
		setTimeout(function() {
			emoji.css({'-webkit-animation-name' : '', '-moz-animation-name' : ''});
			wash.css({'-webkit-animation-name' : '', '-moz-animation-name' : ''});
		}, 2000);
	}, 800);
}

function performTyping(nameStr, emoji, callback) {
	var name = $('#name');
	name.html('&nbsp;');
	name.removeClass();
	
	var idx = 0;
	function typeChar() {
		setTimeout(function() {
			if (idx < nameStr.length) {
				name.html(nameStr.substr(0, ++idx));
				typeChar();
			} else {
				name.addClass(emoji);
				if (callback) { callback(); }
			}
		}, idx === 0 ? 300 : 100);
	}
	
	typeChar();
};
