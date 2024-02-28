import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TicketForm from '@/components/clientComponents/TicketForm/TicketForm';

const unfetchMock = global.fetch

describe('TicketForm', () => {
  beforeEach(() => {
    render(<TicketForm />);
  })

  afterEach(() => {
    global.fetch = unfetchMock
  })

  it('renders the form with all fields and a submit button', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  //TODO
  //form validation
  // it('does not call API and displays an error message on invalid form input', async () => {

  //   const emailInput = screen.getByLabelText(/email/i);
  //   fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  //   fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    
  //   // Assuming you display error messages for invalid fields
  //   expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  // });

  it('calls the API and resets form on successful submission', async () => {
    const mockValidData = {
      name: 'Janet',
      email: 'Janet@mockemail.com',
      description: 'test problem'
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 201,
        json: () => Promise.resolve({
          name: mockValidData.name,
          email: mockValidData.email,
          description: mockValidData.description,
          status: 'OPEN'
        })
    } as Response))

    await userEvent.type(screen.getByLabelText(/name/i), mockValidData.name)
    await userEvent.type(screen.getByLabelText(/email/i), mockValidData.email)
    await userEvent.type(screen.getByLabelText(/description/i), mockValidData.description)
    await userEvent.click(screen.getByText(/submit/i))

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/api/ticket', expect.objectContaining({
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: mockValidData.name,
        email: mockValidData.email,
        description: mockValidData.description
      })
    }))

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue("")
    })
  });
});

//TODO delete
// Integration - Submit Ticket
// input data into ticket form
// Check that after a while it is visible on the admin dashboard with status open and correct date

// Integration - Response Form
//integration test would be if I input janet, janet@email.com, janet's problem, it should show up on the dashboard
// input ticket, then check ticket is logged
// Close form, check fetch input and that the row is not visible 