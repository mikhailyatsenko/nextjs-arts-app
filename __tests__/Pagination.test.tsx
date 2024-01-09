import Pagination from '@/components/Pagination';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { fireEvent } from '@testing-library/react';

describe('Pagination tests', () => {
  test('Pagination clicks', () => {
    mockRouter.push('/');

    render(<Pagination totalPages={12} />);

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    const nextPaginationButton = screen.getByText('»');
    fireEvent.click(nextPaginationButton);
    expect(mockRouter.query.page).toBe('2');

    const fivePaginatinButton = screen.getByText('5');
    fireEvent.click(fivePaginatinButton);
    expect(mockRouter.query.page).toBe('5');

    const prewPaginationButton = screen.getByText('«');
    fireEvent.click(prewPaginationButton);
    expect(mockRouter.query.page).toBe('4');
  });

  test('Pagination with less than 6 pages', async () => {
    mockRouter.push('/?page=12');

    render(<Pagination totalPages={12} />);
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    const paginationButtons = screen.getAllByTestId('pagination-number');
    expect(paginationButtons).toHaveLength(1);
  });
});
