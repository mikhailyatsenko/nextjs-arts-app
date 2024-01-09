import SelectItemsPerPage from '@/components/SelectItemsPerPage';
import mockRouter from 'next-router-mock';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '@testing-library/react';

describe('SelectItemsPerPage', () => {
  test('SelectItemsPerPage renders and changes', () => {
    render(<SelectItemsPerPage limit="40" />);

    const selectItems = screen.getByTestId('select-items-on-page');
    expect(selectItems).toHaveValue('40');

    fireEvent.change(selectItems, { target: { value: '100' } });
    expect(mockRouter.query.limit).toBe('100');
  });
});
