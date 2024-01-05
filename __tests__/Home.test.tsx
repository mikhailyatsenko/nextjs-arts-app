import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import mockRouter from 'next-router-mock';
import { artsList } from '../mocks/mockedData';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Home', () => {
  test('Renders items on the main page', async () => {
    mockRouter.push('/');

    render(<Home arts={artsList} limit={'5'} totalPages={12} />);
    const artsLoadedOnPage = await screen.findAllByTestId('art-list-item');
    expect(artsLoadedOnPage.length).toBe(5);
    screen.debug();
    // const heading = screen.getByRole('heading', { level: 1 });

    // expect(heading).toBeInTheDocument();
  });
});
