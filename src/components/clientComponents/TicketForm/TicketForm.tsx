"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ticketFormSchema } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function TicketForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      name: "",
      email:"",
      description:""
    }
  })
 
  function onSubmit(values: z.infer<typeof ticketFormSchema>) {
    const postTicket = async () => {
      try {
        const post = await fetch ('/api/ticket', {
          "headers": {
            "Content-type": "application/json"
          },
          "method": "POST",
          "body": JSON.stringify({...values})
        })
        if (post.ok) {
          form.reset({
            name: "",
            email: "",
            description: ""
          });
          toast({
            title: "Ticket Successfully Submitted",
            description: "Go to the ticket-list page to see your ticket"
          })
        } else {
          toast({
            title: "Failed to submit ticket",
            description: "Please try again",
            variant: "destructive"
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    postTicket()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 min-w-full font-light">
      <FormItem>

            </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} className="bg-white"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} className="bg-white"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts with Zealthy"
                  className="resize-none bg-white h-32"
                  {...field}
                />
              </FormControl>
              <small className="font-light">500 char max</small>
            </FormItem>
          )}
        />
        <Button className="float-right" type="submit">Submit</Button>
      </form>
    </Form>
  )
}