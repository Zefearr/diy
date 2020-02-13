import '../styles/styles.css';
import Mobile from './modules/mobilemenu.js';
import Reveal from './modules/reveal.js';
import StickyHeader from './modules/stickyheader.js';

let stickyHeader = new StickyHeader(); 
let mobile = new Mobile();

new Reveal(document.querySelectorAll('.feature-item'), 85);
new Reveal(document.querySelectorAll('.team-item'), 80);
new Reveal(document.querySelectorAll('.gallery-item'), 70);
new Reveal(document.querySelectorAll('.contacts-item'), 100);

 
if(module.hot) {
    module.hot.accept(); 
}
function initMap() {
    var carwash = {lat: 59.429360, lng: 24.722962}; 
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: carwash,
      styles: [
        // {elementType: 'geometry', stylers: [{color: '#E3E3E3'}]},
        // {elementType: 'labels.text.stroke', stylers: [{color: '#E3E3E3'}]},
        // {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#47260B'}]
        },
        {
          featureType: "landscape",
          elementType: "labels",
          stylers: [
            { color: '#47260B' }
          ]
        },
      
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#2D7A17'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#222222'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#14171C'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },




      ]
      
    });
    
    var marker = new google.maps.Marker({
      position: carwash,
      map: map,
      
    });
  }  
  initMap();

  var swiper = new Swiper('.swiper-container', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });