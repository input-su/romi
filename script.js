document.addEventListener('DOMContentLoaded', () => {
	// Set year
	document.getElementById('year').textContent = new Date().getFullYear();

	// Mobile nav
	const toggle = document.querySelector('.nav__toggle');
	const list = document.getElementById('navList');
	if (toggle && list){
		toggle.addEventListener('click', () => {
			const expanded = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!expanded));
			list.setAttribute('aria-expanded', String(!expanded));
		});
		list.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
			toggle.setAttribute('aria-expanded','false');
			list.setAttribute('aria-expanded','false');
		}));
	}

	// Slider
	document.querySelectorAll('[data-slider]').forEach(initSlider);

	function initSlider(root){
		const track = root.querySelector('[data-track]');
		const btnPrev = root.querySelector('[data-prev]');
		const btnNext = root.querySelector('[data-next]');
		const dotsWrap = root.querySelector('[data-dots]');
		const slides = Array.from(track.children);

		let index = 0;

		function go(i){
			index = (i + slides.length) % slides.length;
			const x = slides[index].offsetLeft - track.offsetLeft;
			track.scrollTo({left:x, behavior:'smooth'});
			updateDots();
		}

		function makeDots(){
			slides.forEach((_,i) => {
				const b = document.createElement('button');
				b.type = 'button';
				b.addEventListener('click', () => go(i));
				dotsWrap.appendChild(b);
			});
		}
		function updateDots(){
			Array.from(dotsWrap.children).forEach((d,i)=>d.setAttribute('aria-current', String(i===index)));
		}

		btnPrev?.addEventListener('click',() => go(index-1));
		btnNext?.addEventListener('click',() => go(index+1));
		makeDots();
		updateDots();
	}

	// Fake forms
	function hookForm(id){
		const form = document.getElementById(id);
		if(!form) return;
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const data = Object.fromEntries(new FormData(form).entries());
			console.log(id, data);
			alert('Спасибо! Мы свяжемся с вами.');
			form.reset();
		});
	}

	hookForm('joinForm');
	hookForm('contactForm');
});