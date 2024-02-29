'use client'
import { z } from "zod"
import { useState, useEffect} from "react"
import DataTable from "../../components/clientComponents/TicketsList/DataTable"
import ResponseForm  from "../../components/clientComponents/ResponseForm/ResponseForm"
import { columns } from "../../components/clientComponents/TicketsList/Columns"
import { Ticket } from "@/lib/types"
import { Row } from "@tanstack/react-table"
import { formSchema } from "@/lib/utils"

export default function TicketList (){
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Row<Ticket> | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/ticket', {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      const ticketData : Ticket[] = await data.json()
      const activeTickets = ticketData.filter(ticket => ticket.status !== 'CLOSE')
      setTickets(activeTickets)
    }
    fetchData()
  }, [])

  const onClickRow = (row: Row<Ticket>) => {
    setSelectedTicket(row)
  }

  const onSubmitResponse = (data: z.infer<typeof formSchema>) => {
    if (!selectedTicket) return
    const patchTicket = async () => {
      try {
        const patch = await fetch (`/api/ticket/${selectedTicket.original.id}`, {
          "headers": {
            "Content-type": "application/json"
          },
          "method": "PATCH"
        })
        const response = await patch.json()
        console.log('submitted ticket response', data)
        const updateTickets = tickets.map(ticket => {
          if (ticket.id === response.id){
            ticket.status = response.status
          }
          return ticket
        })
        setTickets(updateTickets) 
        setSelectedTicket(null)
      } catch (error) {
        console.error
        setSelectedTicket(null)
      }
    }
    patchTicket()
  }

  const onClickCloseTicket = () => {
    if (!selectedTicket) return;
    const closeTicket = async () => {
      try {
        const close = await fetch (`/api/ticket/${selectedTicket.original.id}`, {
          "headers": {
            "Content-type": "application/json"
          },
          "method": "DELETE"
        })
        const response = await close.json()
        const updateTickets = tickets.filter(ticket => ticket.id !== response.id)
        setTickets(updateTickets)
        setSelectedTicket(null)
      } catch (error) {
        console.error
        setSelectedTicket(null)
      }
    }
    closeTicket()
  }

  const onClickClose = () => setSelectedTicket(null)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1>Tickets</h1>
      {selectedTicket == null ? 
      <DataTable columns={columns} data={tickets} onClickRow={onClickRow}/>
      :
      <ResponseForm row={selectedTicket} onClickClose={onClickClose} onSubmitResponse={onSubmitResponse} onClickCloseTicket={onClickCloseTicket}/>
      }
    </main>
  )
}