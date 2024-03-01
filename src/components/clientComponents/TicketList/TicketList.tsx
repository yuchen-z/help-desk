'use client'
import { z } from "zod"
import DataTable from "../DataTable/DataTable"
import ResponseForm from "../ResponseForm/ResponseForm"
import { columns } from "../../../constants/columns"
import { Ticket } from "@/lib/types"
import { Row } from "@tanstack/react-table"
import { formSchema } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import useTickets from "@/hooks/useTickets"
import useUpdateTicket from "@/hooks/useUpdateTicket"
import { useTicketStore } from "@/hooks/useTicketStore"

export default function TicketList (){
  const { error, isLoading } = useTickets()
  const { updateTicket } = useUpdateTicket()
  const { toast } = useToast()
  const { tickets, selectedTicket, setSelectedTicket } = useTicketStore()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmitResponse = async (data: z.infer<typeof formSchema>) => {
    if (!selectedTicket) return
    try {
      await updateTicket(selectedTicket.original.id, 'PATCH')
      toast({
        title: 'Response submitted',
        description: 'Refer to console for logged response submission'
      })
      console.log('submitted ticket response', data)
    } catch (error){
      console.error
      setSelectedTicket(null)
    }
  }

  const onClickCloseTicket = async () => {
    if (!selectedTicket) return;
    try {
      await updateTicket(selectedTicket.original.id, 'DELETE')
      toast({
        title: 'Ticket Closed',
        description: 'Good job!'
      })
    } catch (error){
      console.error(error)
      setSelectedTicket(null)
    }
  }
  
  return (
    <div className="w-9/12">
      {selectedTicket == null ? 
      <DataTable 
        columns={columns} 
        data={tickets} 
        onClickRow={(row: Row<Ticket>) => { setSelectedTicket(row)}}/>
      :
      <ResponseForm 
        row={selectedTicket} 
        onClickClose={() => setSelectedTicket(null)} 
        onSubmitResponse={ onSubmitResponse } 
        onClickCloseTicket={onClickCloseTicket}/>
    }
    <Toaster/>
    </div>
  )
}