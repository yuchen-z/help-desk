import React from 'react';
import { render, screen } from '@testing-library/react';
import {within} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import DataTable from '@/components/clientComponents/TicketsList/DataTable';
import { columns } from '@/components/clientComponents/TicketsList/Columns';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', description: 'Issues', date: new Date(), status: 'open' },
  { id: 3, name: 'Kate', email: 'kate@test.com', description: 'Help', date: new Date(), status: 'in_progress' },
  { id: 2, name: 'Jane Doe', email: 'jane@test.com', description: 'Description', date: new Date(), status: 'open' },
];

describe('DataTable', () => {
  const mockOnClickRow = jest.fn();
  beforeEach(() => {
    render(<DataTable columns={columns} data={mockData} onClickRow={mockOnClickRow} />);
  })

  afterEach(()=> {
    jest.clearAllMocks()
  })

  it('renders the correct number of rows and headers', () => {
    expect(screen.getAllByRole('columnheader')).toHaveLength(columns.length);
    expect(screen.getAllByRole('row')).toHaveLength(mockData.length + 1);
  });

  it('sorts columns when headers are clicked', async () => {
    await userEvent.click(screen.getByRole('button', { name: /ID/ }));
    const sortedIds = screen.getAllByRole('cell', { name: /^\d+$/ }).map(cell => parseInt(cell.textContent, 10));
    const isAscending = sortedIds.every((val, i, arr) => !i || (val >= arr[i - 1]));
    expect(isAscending).toBe(true);
  })

  it('triggers open response form handler on row click', async () => {    
    const firstRow = screen.getAllByRole('row')[1]; // skip header row
    await userEvent.click(firstRow);
    expect(mockOnClickRow).toHaveBeenCalledTimes(1);
  });

  it('filters rows based on description', async () => {
    const filterInput = screen.getByPlaceholderText('Filter description...');
    await userEvent.type(filterInput, mockData[0].description);
    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows).toHaveLength(2); // Length 2 including header row
    const descriptionCell = within(filteredRows[1]).getByText(mockData[0].description);
    expect(descriptionCell).toBeInTheDocument();
  });
})