import Home from '@/pages/index';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { artsListData } from '@/mocks/artsListMock';
import { DetailArtResponse } from '@/mocks/detailArtMock';
import { fireEvent } from '@testing-library/react';

describe('Home', () => {
  test('Render arts list, click on art in list', async () => {
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

  test('Render selected detailed art, click close button', async () => {
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

    expect(mockRouter.query.selectedArtId).toBe('129884');
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockRouter.query.selectedArtId).toBe(undefined);
  });

  test('Render selected detailed art, click on collapsed list to close selected art', async () => {
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

  test('Pagination', async () => {
    mockRouter.push('/');

    render(
      <Home arts={artsListData} limit={'5'} totalPages={12} detailArt={null} />
    );
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    const nextPaginationButton = screen.getByText('»');
    fireEvent.click(nextPaginationButton);
    expect(mockRouter.query.page).toBe('2');

    const fivePaginatinButton = screen.getAllByText('5')[1] as HTMLElement;
    fireEvent.click(fivePaginatinButton);
    expect(mockRouter.query.page).toBe('5');

    const prewPaginationButton = screen.getByText('«');
    fireEvent.click(prewPaginationButton);
    expect(mockRouter.query.page).toBe('4');
  });
});
