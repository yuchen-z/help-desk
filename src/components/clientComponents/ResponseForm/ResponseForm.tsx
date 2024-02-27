"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  // from: z.string().min(1).max(50),
  // response: z.string().min(1).max(500),
  from: z.string().max(50),
  response: z.string().max(500),
})

export function ResponseForm({ row, onSubmitResponse, onClickCloseTicket }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      response: ""
    },
  })
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitResponse)} className="space-y-6 min-w-full">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input placeholder="From..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Respond to ticket here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <small>500 char max</small>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => onClickCloseTicket()}>Close Ticket</Button>
      </form>
    </Form>
  )
}