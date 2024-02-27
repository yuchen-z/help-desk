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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function TicketForm() {
  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      name: "",
      email:"",
      description:""
    },
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
        const response = await post.json()
      } catch (error) {
        console.error
      }
    }
    postTicket()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 min-w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} />
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
                <Input placeholder="Email..." {...field} />
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
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <small>500 char max</small>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}