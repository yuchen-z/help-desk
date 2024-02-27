import React from 'react';
import { render } from '@testing-library/react';
import TicketForm from '@/components/clientComponents/TicketForm/TicketForm';

describe('Login component tests', () => {

  it('Renders correctly initial document', () => {
    render(
      <TicketForm />
    );
  });

});
