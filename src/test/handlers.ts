import { http, HttpResponse } from 'msw';
import { artsListMock } from './mocks/artsListMock';

export const handlers = [
  http.get('https://api.artic.edu/api/v1/artworks/*', () => {
    return HttpResponse.json(artsListMock);
  }),
];
