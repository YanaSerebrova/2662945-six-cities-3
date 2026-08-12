import { Review } from '../types';

export const mockComments: Review[] = [
  {
    id: '1',
    comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24T21:00:00.000Z',
    rating: 4,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
  },
  {
    id: '2',
    comment: 'Great location and very comfortable stay. The host was very responsive and helpful. Would definitely recommend!',
    date: '2019-05-15T21:00:00.000Z',
    rating: 5,
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar-angelina.jpg',
    },
  },
];
