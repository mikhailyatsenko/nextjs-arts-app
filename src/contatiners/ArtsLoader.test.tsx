import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { server } from '../test/server';
import ArtsLoader from './ArtsLoader';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
describe('loader tests', () => {
  test('Renders items on the main page', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Provider store={store}>
            <ArtsLoader />
          </Provider>
        </MemoryRouter>
      )
    );
    const artsLoadedOnPage = await screen.findAllByTestId('art-list-item');
    expect(artsLoadedOnPage.length).toBe(5);
    screen.debug();
    const selectItemsOnPage = screen.getByTestId('select-items-on-page');
    fireEvent.change(selectItemsOnPage, { target: { value: 3 } });
    expect(
      (screen.getByRole('option', { name: '3' }) as HTMLOptionElement).selected
    ).toBe(true);
  });
});
