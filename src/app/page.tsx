import TicketForm from "@/components/clientComponents/TicketForm/TicketForm";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-18">
      <div className="w-8/12 font-bold">
        <h1 className="py-12">Submit your ticket here!</h1>
        <TicketForm/>
        <Toaster/>
      </div>
    </main>
  );
}
