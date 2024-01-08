import store from '@/store';
import { fetchAllArts, fetchSelectedArt } from '@/services/ArtService';
import fetch from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import { artsListMockResponse, artsListData } from '@/mocks/artsListMock';
import { DetailArtResponse } from '@/mocks/detailArtMock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('api tests', () => {
  test('Fetch arts', async () => {
    fetch.mockResponse(JSON.stringify(artsListMockResponse));
    const { data } = await store.dispatch(
      fetchAllArts.initiate('test&limit=${limit}&page=${page}')
    );
    expect(data).toEqual({ arts: artsListData, totalPages: 10321 });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Fetch detailed art', async () => {
    fetch.mockResponse(JSON.stringify(DetailArtResponse));
    const { data } = await store.dispatch(fetchSelectedArt.initiate('27992'));
    expect(data).toEqual(DetailArtResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
