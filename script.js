'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

// Using browser geolocation API
navigator.geolocation.getCurrentPosition(function(position) {
		const {latitude} = position.coords;
		const {longitude} = position.coords;

		//console.log(`https://www.google.pl/maps/@${latitude},${longitude}`);
		const coords = [latitude, longitude];
		map = L.map('map').setView(coords, 13);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		// leaflit map eventListenner
		map.on('click', function(mapE) {
			// show the form
			form.classList.remove('hidden');
			inputDistance.focus();
			mapEvent = mapE;
		})
	}, function() {
		alert('Cannot fetch current user position!');
	}
)

form.addEventListener('submit', function(e) {
	e.preventDefault();

	const {lat, lng} = mapEvent.latlng;

	L.marker([lat, lng]).addTo(map).bindPopup(
	L.popup({
		maxWidth: 250,
		minWidth: 100,
		autoClose: false,
		closeOnClick: false,
		className: 'running-popup',
	})).setPopupContent('Running').openPopup();
	inputDuration.value = inputDistance.value = inputCadence.value = inputElevation.value = '';
})

inputType.addEventListener('change', function() {
	inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
	inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
})
