const filterBtn = document.querySelector('#filter-button');
const filterNav = document.querySelector('.map-navigation');
if (filterBtn) {
  filterBtn.addEventListener('click', function() {
    filterNav.classList.toggle('oppened');
  });
}
export default function googleMap() {
  global.initMap = initMap;
}
// Google map start
async function func() {
  const script = document.createElement('script');
  let key = 'AIzaSyCaYQ83EA9peTsEI6ih6cUc6uaCjn080qE';
  // if (window.location.href.match(/localhost/)) key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=ua`;
  document.getElementsByTagName('head')[0].appendChild(script);
}

// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach(image => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});
// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  // const center = {
  //   lat: 49.2281012,
  //   lng: 28.3925433,
  // };
  const lat = window.innerWidth < 768 ? 49.4381135 : 49.437254;
  const lng = window.innerWidth < 768 ? 32.0933513 : 32.096053;
  const center = {
    lat,
    lng,
  };

  const choosedCategories = new Set();
  const zoomMap = window.innerWidth < 768 ? 15.5 : 16;
  choosedCategories.add('main');
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoomMap,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'ua',
    styles: getMapTheme(),
  });
  window.googleMap = map;
  const filterMarkers = function(category, categoriesArray) {
    gmarkers1.forEach(el => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach(item => {
    item.addEventListener('click', evt => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });
  var baseFolder = '/wp-content/themes/3d/assets/images/map/';
  var defaultMarkerSize = new google.maps.Size(56, 90);
  var buildLogoSize = new google.maps.Size(82, 82);
  if (document.documentElement.clientWidth < 1600) {
    var defaultMarkerSize = new google.maps.Size(46, 80);
    var buildLogoSize = new google.maps.Size(82, 82);
  }
  const markersAdresses = {
    main: `${baseFolder}main.png`,
    mall: `${baseFolder}mall.svg`,
    park: `${baseFolder}park.svg`,
    pharmacy: `${baseFolder}pharmacy.svg`,
    restaurant: `${baseFolder}restaurant.svg`,
    school: `${baseFolder}school.svg`,
    sport: `${baseFolder}sport.svg`,
    supermarket: `${baseFolder}supermarket.svg`,
    drivingSchool: `${baseFolder}driving-school.svg`,
    post: `${baseFolder}post.svg`,
    aquapark: `${baseFolder}aquapark.svg`,
    petrolStation: `${baseFolder}petrol-station.svg`,
    busStop: `${baseFolder}bus-stop.svg`,
    carWashing: `${baseFolder}car-washing.svg`,
    quay: `${baseFolder}quay.svg`,
    fun: `${baseFolder}fun.svg`,
    tire: `${baseFolder}tire.svg`,
  };
  const markersData = [
    {
      type: 'main',
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      position: { lat: 49.4411238, lng: 32.0931392 },
      text: 'ЖК Premier Bay, м. Черкаси, вул. Героїв Дніпра',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.4368178, lng: 32.0888686 },
      text: 'Гімназія №31 - вул. Г.Дніпра, 27',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.4381135, lng: 32.0933513 },
      text: 'Спеціалізована школа №33 імені Василя Симоненка - вул. Г.Дніпра,13',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.4362532, lng: 32.0960091 },
      text: 'Дитячий садочок №90 - вул. Припортова,12',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.4395377, lng: 32.0979717 },
      text: 'Медичний центр «Лікар здоровʼя» - вул. Козацька, 9/1',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.4400953, lng: 32.0955655 },
      text: 'Гала аптека - вул. Г.Дніпра, 6',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.4360701, lng: 32.1004398 },
      text: 'Аптека Копійка - вул. Козацька, 1/1',
    },

    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.434546, lng: 32.0910256 },
      text: 'ТЦ "Dnipro Plaza" - Припортова, 34',
    },

    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4399502, lng: 32.0947041 },
      text: 'Крихітка «Шу» - вул. Г.Дніпра,6',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4400052, lng: 32.0965315 },
      text: 'GreenWood pizzeria - вул. Г.Дніпра,4',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4372542, lng: 32.096053 },
      text: 'Кавʼярня - вул.Козацька, 7',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4382394, lng: 32.1005053 },
      text: 'Ресторан Faro del Porto  - вул. Козацька, 2',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4359314, lng: 32.1001442 },
      text: 'Street Pizza - вул. Козацька, 1',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4355718, lng: 32.1000468 },
      text: 'БоХліб - вул. Козацька, 1/1',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4354433, lng: 32.1018814 },
      text: 'Salvadore - вул. Припортова, 1',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4350266, lng: 32.0915966 },
      text: 'Bulochna - вул. Припортова, 34/2',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.4400216, lng: 32.0982144 },
      text: 'Donuts Club - вул. Г. Дніпра, 1',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.4377156, lng: 32.1004582 },
      text: 'Sport life - вул. Козацька, 2',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.4343321, lng: 32.0907261 },
      text: 'Студія танцю «Крок вперед» - вул. Припортова, 34 (у ТЦ Dnipro Plaza)',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.4379775, lng: 32.0913558 },
      text: 'Molli - вул. Г.Дніпра, 19',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.4364645, lng: 32.1001751 },
      text: 'Делікат - вул. Козацька, 1/2',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.4344685, lng: 32.0912126 },
      text: 'Велмарт - вул. Припортова, 34 (у ТЦ Dnipro Plaza)',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.4371023, lng: 32.0914351 },
      text: 'OkWine - вул.Г. Дніпра, 23',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.4367528, lng: 32.091401 },
      text: 'Шарлотка - вул.Г. Дніпра, 25/1',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.4401011, lng: 32.0973247 },
      text: 'Центр видачі замовлень Епіцентр - вул. Г.Дніпра, 4/3',
    },
    {
      type: 'drivingSchool',
      icon: { url: markersAdresses.drivingSchool, scaledSize: defaultMarkerSize },
      position: { lat: 49.22865449, lng: 28.3956975 },
      text:
        'Автошкола на Вишеньці - вулиця Келецька, 130а, Вінниця, Вінницька область, Украина, 21000',
    },

    {
      type: 'post',
      icon: { url: markersAdresses.post, scaledSize: defaultMarkerSize },
      position: { lat: 49.4345763, lng: 32.1018748 },
      text: 'Нова пошта №2 - вул.Ю.Іллєнка, 1',
    },
    {
      type: 'post',
      icon: { url: markersAdresses.post, scaledSize: defaultMarkerSize },
      position: { lat: 49.4399239, lng: 32.0965302 },
      text: 'Поштомат № 26231 - вул. Г. Дніпра, 4',
    },
    {
      type: 'tire',
      icon: { url: markersAdresses.tire, scaledSize: defaultMarkerSize },
      position: { lat: 49.4394479, lng: 32.0943828 },
      text: 'Твоя шина - вул. Г.Дніпра, 7',
    },
    {
      type: 'quay',
      icon: { url: markersAdresses.quay, scaledSize: defaultMarkerSize },
      position: { lat: 49.4398741, lng: 32.0988967 },
      text: 'Набережна: Козацька, 9',
    },
    {
      type: 'fun',
      icon: { url: markersAdresses.fun, scaledSize: defaultMarkerSize },
      position: { lat: 49.4341287, lng: 32.0912722 },
      text: 'Космос Боулінг - вул. Припортова, 34Б(у ТЦ Dnipro Plaza)',
    },
    {
      type: 'fun',
      icon: { url: markersAdresses.fun, scaledSize: defaultMarkerSize },
      position: { lat: 49.4347951, lng: 32.0914171 },
      text: 'Кінотеатр Мультиплекс - вул. Припортова, 34 (у ТЦ Dnipro Plaza)',
    },
    {
      type: 'fun',
      icon: { url: markersAdresses.fun, scaledSize: defaultMarkerSize },
      position: { lat: 49.4345705, lng: 32.0911216 },
      text: 'Атракціони віртуальної реальності - вул. Припортова, 34 (у ТЦ Dnipro Plaza)',
    },
    {
      type: 'fun',
      icon: { url: markersAdresses.fun, scaledSize: defaultMarkerSize },
      position: { lat: 49.4345525, lng: 32.0907657 },
      text: 'Розважальний центр Fly Kids - вул. Припортова, 34 (у ТЦ Dnipro Plaza)',
    },
  ];
  /* beautify preserve:end */
  const infowindow = new google.maps.InfoWindow({
    text: '',
    maxWidth: 300,
  });
  markersData.forEach(marker => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      animation: google.maps.Animation.DROP,
      zIndex: marker.zIndex || 1,
      icon: marker.icon,
      cursor: 'grap', // курсор при наведении на макркер жк
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function() {
      infowindow.setContent(marker.text);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });

    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}

// window.addEventListener("load", () => {
// const legend = document.querySelector("[data-accordeon]");
// const legendTitle = document.querySelector(".infrastructure-markers__btn");
// const openedMarker = document.querySelector(".infrastructure-markers__btn svg");
// const markersHeight = getComputedStyle(
//   document.querySelector(".infrastructure-markers__ul")
// ).height;
// if (document.documentElement.clientWidth < 575) {
//     legend.classList.remove("opened");
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
// }

// legendTitle.addEventListener("click", () => {
//   const legendWrapper = document.querySelector('.infastructure-markers__wrapper');
//   legend.classList.toggle('opened');
//   openedMarker.classList.toggle('rotate');
//   if (legend.classList.contains("opened")) {
//     legendWrapper.classList.remove('closed');
//     gsap.timeline().fromTo(legend, { y: markersHeight }, { y: 0 });
//     gsap.timeline().fromTo(legendTitle, {y: markersHeight}, {y: 0});
//   } else {
//     legendWrapper.classList.add('closed')
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
//   }
// });
// });

function getMapTheme() {
  return [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#424b5b',
        },
        {
          weight: 2,
        },
        {
          gamma: '1',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          weight: 0.6,
        },
        {
          color: '#545b6b',
        },
        {
          gamma: '0',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#545b6b',
        },
        {
          gamma: '1',
        },
        {
          weight: '10',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#000117',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#666c7b',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#545b6b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#424a5b',
        },
        {
          lightness: '0',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#666c7b',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2e3546',
        },
      ],
    },
  ];
}
