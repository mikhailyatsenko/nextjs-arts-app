import Home from '@/pages/index';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { artsListData } from '@/mocks/artsListMock';
import { DetailArtResponse } from '@/mocks/detailArtMock';
import { fireEvent } from '@testing-library/react';

describe('Home', () => {
  test('Render arts list', async () => {
    mockRouter.push('/');

    render(
      <Home arts={artsListData} limit={'5'} totalPages={12} detailArt={null} />
    );
    const artsLoadedOnPage = await screen.findAllByTestId('art-list-item');
    expect(artsLoadedOnPage.length).toBe(5);
  });

  test('Render selected detailed art, click on collapsed list area to close selected art', async () => {
    mockRouter.push('/?selectedArtId=129884#art-item');

    render(
      <Home
        arts={artsListData}
        limit={'5'}
        totalPages={12}
        detailArt={DetailArtResponse.data}
      />
    );

    expect(mockRouter.query.selectedArtId).toBe('129884');
    const collapseListOverlayDiv = screen.getByTestId('art-list-overlay');
    fireEvent.click(collapseListOverlayDiv);
    expect(mockRouter.query.selectedArtId).toBe(undefined);
  });
});
