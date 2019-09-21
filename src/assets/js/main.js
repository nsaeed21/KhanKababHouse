;(function(window, document, $) {
	const $win = $(window);
	const $doc = $(document);

	let scroll = $win.scrollTop();

	function isMobile() {
		return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	};
	

	// Nav
	$('.nav').on('click', 'a', function(e){
		let parentEl = $(this).closest('li');
		let subMenu = $(this).closest('li').children('ul');

		parentEl.siblings().removeClass('hovered');

		if ( !parentEl.hasClass('hovered') && isMobile() && subMenu.length > 0 ) {
			e.preventDefault();

			parentEl.addClass('hovered');
		};
	});

	$('.accordion .accordion__head').on('click', function (event) {
		if ($win.width() < 768 ){
			$(this)
			.next()
				.stop()
				.slideToggle()
			.parent()
				.toggleClass('accordion__section--current')
				// .siblings()
				// .removeClass('accordion__section--current')
				// 	.find('.accordion__body')
				// 	.slideUp();
		}			
	});

	$('.nav').find('a').click(function(event) {
		event.preventDefault();

		if ($('body').hasClass('animating')){
			return;
		}

		$('body').addClass('animating');

		var section = $(this).attr('href');

		$('html, body').animate({
			scrollTop: $(section).offset().top - 50
		}, 2000);

		setTimeout(function(){
			$('body').removeClass('animating');
		}, 2000)
	});

	$doc.on('click', function(e) {
		if ( !e.target.closest('.nav') ) {
			$('.nav').find('li').removeClass('hovered');
		};
	});

	$('.nav-trigger').on('click', function(event) {
		event.preventDefault();

		$('body').toggleClass('nav-show');
	});

	$win.on('resize', function () {
		if ($(this).width() > 1023 ) {
			$('body').removeClass('nav-show');
		}
	}).on('load resize', function () {
		if ($win.width() < 768 ) {
			$('.accordion__section .accordion__body')
			.hide();
		}
	}).on('resize', function(){
		if ($win.width() < 768 ) {
			$('.accordion__section--current')
			.removeClass('accordion__section--current');
		}
	}).on('scroll', function(){
		scroll = $(window).scrollTop();

		$('.header').toggleClass('header--fixed', scroll >= 1)
	})



})(window, document, window.jQuery);
