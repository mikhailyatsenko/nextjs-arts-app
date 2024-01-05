import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Search from '@/components/Search';
import mockRouter from 'next-router-mock';
import { fireEvent } from '@testing-library/react';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Home', () => {
  test('Search input has a text from router query', async () => {
    mockRouter.push('?search=test+search+query');

    render(<Search />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('test search query');
  });

  test('Submitting search value changes the value in query params', async () => {
    render(<Search />);

    const inputElement = screen.getByTestId('input-search') as HTMLInputElement;
    const button = screen.getByTestId('button-search');

    fireEvent.change(inputElement, {
      target: { value: 'another test search query' },
    });

    expect(inputElement.value).toBe('another test search query');

    fireEvent.click(button);

    expect(mockRouter).toMatchObject({
      query: { search: 'another test search query' },
    });
  });
});
