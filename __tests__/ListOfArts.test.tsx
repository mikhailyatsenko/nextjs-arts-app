import ListOfArts from '@/components/ListOfArts';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { artsListData } from '@/mocks/artsListMock';
import { fireEvent } from '@testing-library/react';

describe('ListOfArts', () => {
  test('Click on art in list', async () => {
    mockRouter.push('/');

    render(<ListOfArts arts={artsListData} />);
    const artsLoadedOnPage = await screen.findAllByTestId('art-list-item');
    expect(artsLoadedOnPage.length).toBe(5);

    fireEvent.click(artsLoadedOnPage[0]);
    expect(mockRouter).toMatchObject({
      query: { selectedArtId: '129884' },
    });
  });
});
