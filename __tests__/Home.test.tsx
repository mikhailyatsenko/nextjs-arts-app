import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import mockRouter from 'next-router-mock';
import { artsListData } from '@/mocks/artsListMock';
import { DetailArtResponse } from '@/mocks/detailArtMock';
import { fireEvent } from '@testing-library/react';

describe('Home', () => {
  test('Render arts list, click on art in list, close selected art', async () => {
    mockRouter.push('/');

    render(
      <Home arts={artsListData} limit={'5'} totalPages={12} detailArt={null} />
    );
    const artsLoadedOnPage = await screen.findAllByTestId('art-list-item');
    expect(artsLoadedOnPage.length).toBe(5);

    fireEvent.click(artsLoadedOnPage[0]);

    expect(mockRouter).toMatchObject({
      query: { selectedArtId: '129884' },
    });
  });

  test('Renders selected detailed art', async () => {
    mockRouter.push('/?selectedArtId=129884#art-item');

    render(
      <Home
        arts={artsListData}
        limit={'5'}
        totalPages={12}
        detailArt={DetailArtResponse.data}
      />
    );
    const selectedArtOnPage = await screen.findByTestId('art-item');
    expect(selectedArtOnPage).toBeInTheDocument();
    screen.debug();

    expect(mockRouter.query.selectedArtId).toBe('129884');
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockRouter.query.selectedArtId).toBe(undefined);
  });
});
