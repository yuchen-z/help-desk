import { Metadata } from "next"
import TicketList from "@/components/clientComponents/TicketList/TicketList";

export const metadata: Metadata = {
  title: "View Tickets"
};

export default function TicketListPage (){
  return (
    <main className="flex h-8/12 flex-col items-center justify-between py-16">
      <TicketList/>
    </main>
  )
}