import SelectedArt from '@/components/SelectedArt';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { DetailArtResponse } from '@/mocks/detailArtMock';
import { fireEvent } from '@testing-library/react';

describe('SelectedArt', () => {
  test('Render selected detailed art, click close button', async () => {
    mockRouter.push('/?selectedArtId=129884#art-item');

    render(<SelectedArt detailArt={DetailArtResponse.data} />);
    const selectedArtOnPage = await screen.findByTestId('art-item');
    expect(selectedArtOnPage).toBeInTheDocument();

    expect(mockRouter.query.selectedArtId).toBe('129884');
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockRouter.query.selectedArtId).toBe(undefined);
  });
});
