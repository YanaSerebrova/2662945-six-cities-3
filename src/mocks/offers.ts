import { Offer } from '../types';

export const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    isPremium: true,
    isFavorite: false,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg',
    city: { name: 'Amsterdam', location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 12 } },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 16 },
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    isPremium: false,
    isFavorite: true,
    rating: 4.0,
    previewImage: 'img/room.jpg',
    city: { name: 'Amsterdam', location: { latitude: 50.938361, longitude: 6.959974, zoom: 12 } },
    location: { latitude: 52.3609553943508, longitude: 4.85309666406198, zoom: 16 }
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    isPremium: false,
    isFavorite: true,
    rating: 4.2,
    previewImage: 'img/apartment-02.jpg',
    city: { name: 'Amsterdam', location: { latitude: 52.3609553943508, longitude: 4.85309666406198, zoom: 12 } },
    location: { latitude: 52.3909553943508, longitude: 4.929309666406198, zoom: 16 }
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    isPremium: true,
    isFavorite: false,
    rating: 5.0,
    previewImage: 'img/apartment-03.jpg',
    city: { name: 'Amsterdam', location: { latitude: 50.846557, longitude: 4.351697, zoom: 12 } },
    location: { latitude: 52.3809553943508, longitude: 4.939309666406198, zoom: 16 }
  },
];
