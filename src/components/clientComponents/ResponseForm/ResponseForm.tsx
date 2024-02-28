"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
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
  from: z.string().min(1).max(50),
  response: z.string().min(1).max(500),
})

export default function ResponseForm({ row, onSubmitResponse, onClickCloseTicket, onClickClose }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      response: ""
    },
  })
 
  return (
    <>
    <Button aria-label="close-form" variant="ghost" size="icon" onClick={() => onClickClose()}>
      <X className="h-4 w-4"/>
    </Button>
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
        <div className="flex flex-row justify-between">
        <Button variant="destructive" type="button" onClick={() => onClickCloseTicket()}>Close Ticket</Button>
        <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
    </>
  )
}