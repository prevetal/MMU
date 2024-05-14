WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Services slider
	const servicesSliders = [],
		services = document.querySelectorAll('.services .swiper')

	services.forEach((el, i) => {
		el.classList.add('services_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			spaceBetween: 6,
			slidesPerView: 'auto',
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.service')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.service')

					items.forEach(el => el.style.height = 'auto')

					setTimeout(() => setHeight(items))
				}
			}
		}

		servicesSliders.push(new Swiper('.services_s' + i, options))
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Order form submit
	$('#order_modal form, .first_section form').submit(function(e) {
		e.preventDefault()

		// Close other modals
		Fancybox.close()

		// Show success modal
		Fancybox.show([{
			src: '#order_success_modal',
			type: 'inline'
		}])
	})


	// Fixed header menu
	$('header .menu_btn').click(e => {
		e.preventDefault()

		$('header .menu_btn').toggleClass('active')
		// $('body').toggleClass('menu_open')
		$('header .menu').toggleClass('show')
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click(e => {
		e.preventDefault()

		$('.mob_header .contacts_btn').removeClass('active')
		$('.mob_contacts_info').removeClass('show')

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header').toggleClass('show')
	})


	// Mob. contacts
	$('.mob_header .contacts_btn').click(e => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('header').removeClass('show')

		$('.mob_header .contacts_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('.mob_contacts_info').toggleClass('show')
	})


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	// Animate
	const boxes = document.querySelectorAll('.animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio >= 0.2 && entry.target.classList.contains('animate') && !entry.target.classList.contains('animated')) {
				entry.target.classList.add('animated')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
})



window.addEventListener('load', function () {
	// Fixed header
	headerInit   = true,
	headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	WW > 1900 && headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Reviews
	$('.reviews_slider .wheelSlider-container').wheelSlider({
		items: 5,
		arrowPrevHtml: '<svg class="icon"><use xlink:href="images/sprite.svg#ic_arr_hor"></use></svg>',
		arrowNextHtml: '<svg class="icon"><use xlink:href="images/sprite.svg#ic_arr_hor"></use></svg>'
	})
})



window.addEventListener('scroll', function () {
	// Fixed header
	WW > 1900 && typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth

		// Fixed header
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit   = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			WW > 1900 && headerInit && $(window).scrollTop() > 0
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)
	}
})



// Init map
function initMap() {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.850479, 37.537955],
			zoom: 16,
			controls: []
		})

		let myPlacemark = new ymaps.Placemark([55.850479, 37.537955], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'images/ic_map_marker.svg',
			iconImageSize : [65, 84],
			iconImageOffset : [-33, -84]
		})

		myMap.geoObjects.add(myPlacemark)

		myMap.behaviors.disable('scrollZoom')
	})
}