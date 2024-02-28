'use client'
import { useState, useEffect, ReactEventHandler } from "react"
import DataTable from "../../components/clientComponents/TicketsList/DataTable"
import ResponseForm  from "../../components/clientComponents/ResponseForm/ResponseForm"
import { Ticket, columns } from "../../components/clientComponents/TicketsList/Columns"

export default function TicketList (){
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/ticket', {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      const ticketData = await data.json()
      const activeTickets = ticketData.filter(ticket => ticket.status !== 'CLOSE')
      setTickets(activeTickets)
    }
    fetchData()
  }, [])

  const onClickRow = (row) => {
    setSelectedTicket(row)
  }

  const onSubmitResponse = () => {
    console.log('selected Ticket', selectedTicket)
    const patchTicket = async () => {
      try {
        const patch = await fetch (`/api/ticket/${selectedTicket.original.id}`, {
          "headers": {
            "Content-type": "application/json"
          },
          "method": "PATCH"
        })
        const response = await patch.json()
        console.log('tickets after patch', tickets)
        console.log('patch response', response)
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