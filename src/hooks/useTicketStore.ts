import { create } from 'zustand';
import { Ticket } from '@/lib/types';
import { Row } from '@tanstack/react-table';
import { TicketStore } from '@/lib/types';

export const useTicketStore = create<TicketStore>(
  (set) => ({
    tickets: [],
    selectedTicket: null,
    setTickets: (tickets) => set({tickets: tickets}),
    setSelectedTicket: (row: Row <Ticket> ) => set({ selectedTicket: row }),
  })
);
