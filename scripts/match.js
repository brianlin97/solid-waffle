$('document').ready(function(){
	console.log('DOM loaded');

// 	Barba.Pjax.init();
// 	Barba.Prefetch.init();
// 	var transEffect = Barba.BaseTransition.extend({
// 		start: function(){
// 			this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
// 		},
// 		fadeInNewcontent: function(nc) {
// 			nc.hide();
// 			var _this = this;
// 			$(this.oldContainer).fadeOut(1000).promise().done(() => {
// 				nc.css('visibility','visible');
// 				nc.fadeIn(1000, function(){
// 					_this.done();
// 				})
// 			});
// 		}
// 	});
// 	Barba.Pjax.getTransition = function() {
// 		return transEffect;
// 	}
// 	Barba.Pjax.start();
// });

// Match button
$("#view-button-1").click(function(){
  $("#match-inner-1").css({"animation":"slide-left-leave 500ms"}).fadeOut(500);
  $("#match-inner-2").delay(100).css({"animation":"slide-left-enter 500ms"}).fadeIn(200);
  $(".header").fadeIn(200).html("These comments describe a bot being born and immediately turning to its one purpose in life: finding a man.");
  $(".subtext").fadeIn(200).html("The Angels, also called 'hosts' by the company's engineers, lay dormant until a bot animates them and uses them like a skin to contact a male user. They used over 70,000 hosts to engage with Ashley Madison users, launching a synchronized attack to extract as much money and attention from the users as they could.");
});

// Potato Menu
$("#potato-icon-default").mouseenter(function() {
	$("#potato-icon-hover").css({"display": "block"});
	$("#potato-icon-default").css({"display": "none"});
});

$("#potato-icon-hover").click(function() {
	if ($("#menu-links").children().hasClass("slide-in")) {
		$("#menu-links").children().removeClass("slide-in");
		$("#menu-links").fadeOut(100);
    // $("#potato-icon-hover").css({"display": "none"});
	}
	else {
		$("#menu-links").children().addClass("slide-in");
		$("#menu-links").fadeIn(100);
    // $("#potato-icon-default").css({"display": "block"});
    // $("#potato-icon-hover").css({"display": "none"});
	}
});

$("#potato-icon-hover").mouseout(function() {
	$("#potato-icon-hover").css({"display": "none"});
	$("#potato-icon-default").css({"display": "block"});
});

// MENU
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);
