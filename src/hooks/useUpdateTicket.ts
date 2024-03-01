import axios from "axios";
import { useTicketStore } from "./useTicketStore";

export default function useUpdateTicket(){
  const { tickets, setTickets, setSelectedTicket } = useTicketStore()
  const updateTicket = async (ticketId: number, method: 'PATCH' | 'DELETE') => {
    const response = await axios({
      method: method,
      url: `/api/ticket/${ticketId}`
    })
      const updateTickets = tickets.map(ticket => {
        if (ticket.id === response.data.id){
          ticket.status = response.data.status
        }
        return ticket
      })
      setTickets(updateTickets)
      setSelectedTicket(null)
    return response.data
  }
  return { updateTicket };
}