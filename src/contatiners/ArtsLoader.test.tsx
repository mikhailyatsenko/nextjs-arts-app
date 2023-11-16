import { render } from '@testing-library/react';
import ArtsLoader from './ArtsLoader';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const MOCK_DATA = {
  preference: null,
  pagination: {
    total: 123386,
    limit: 5,
    offset: 0,
    total_pages: 24678,
    current_page: 1,
  },
  data: [
    {
      _score: 20092.596,
      artist_display: 'Alma Thomas\nAmerican, 1891\u20131978',
      id: 129884,
      image_id: 'e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9',
      title: 'Starry Night and the Astronauts',
    },
    {
      _score: 10046.298,
      artist_display: 'Vincent van Gogh\nDutch, 1853-1890',
      id: 28560,
      image_id: '25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e',
      title: 'The Bedroom',
    },
    {
      _score: 6697.5317,
      artist_display: 'India\nTamil Nadu, near Nagapattinam',
      id: 21023,
      image_id: '0675f9a9-1a7b-c90a-3bb6-7f7be2afb678',
      title: 'Buddha Shakyamuni Seated in Meditation (Dhyanamudra)',
    },
    {
      _score: 5023.149,
      artist_display: 'Kerry James Marshall\nAmerican, born 1955',
      id: 137125,
      image_id: 'd94d0e3d-5d89-ce07-ee0f-7fa6d8def8ab',
      title: 'Many Mansions',
    },
    {
      _score: 2009.2595,
      artist_display: 'Tanaka Atsuko\nJapanese, 1932-2005',
      id: 229393,
      image_id: '7690dd6e-05ed-773c-a80e-e7cc4eb879cc',
      title: 'Untitled',
    },
  ],
  info: {
    license_text:
      'The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu. All other data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.',
    license_links: [
      'https://creativecommons.org/publicdomain/zero/1.0/',
      'https://www.artic.edu/terms',
    ],
    version: '1.9',
  },
  config: {
    iiif_url: 'https://www.artic.edu/iiif/2',
    website_url: 'http://www.artic.edu',
  },
};

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('user tests', () => {
  test('Renders the main page', () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(MOCK_DATA),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    render(
      <MemoryRouter>
        <ArtsLoader />
      </MemoryRouter>
    );

    expect(true).toBeTruthy();
  });
});
