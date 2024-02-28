import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ResponseForm from '@/components/clientComponents/ResponseForm/ResponseForm';

describe('ResponseForm', () => {
  const mockRow = {
    id: 1,
    name: "Tiff",
    email: "tiff@email.com",
    description: "preview text..",
    status: "OPEN",
    date: "Feb 26"
  }

  const mockSubmit = jest.fn()
  const mockCloseTicket = jest.fn()
  const mockOnClickClose = jest.fn()

  beforeEach(() => {
    render(<ResponseForm
      row={mockRow} 
      onSubmitResponse={mockSubmit} 
      onClickCloseTicket={mockCloseTicket} 
      onClickClose={mockOnClickClose}/>);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form with all fields and a submit and close button', () => {
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/response/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close ticket/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('calls onSubmit handler on form submission', async () => {
    await userEvent.type(screen.getByLabelText(/from/i), 'reviewer')
    await userEvent.type(screen.getByLabelText(/response/i), 'response')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(mockSubmit).toHaveBeenCalledTimes(1)
  });

  it('calls closeTicket when close ticket button is clicked', async() => {
    await userEvent.click(screen.getByRole('button', { name: /close ticket/i }))
    expect(mockCloseTicket).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is clicked', async() => {
    await userEvent.click(screen.getByRole('button', { name: /close-form/i }))
    expect(mockOnClickClose).toHaveBeenCalledTimes(1)
  })
});

