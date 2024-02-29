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
import { formSchema } from "@/lib/utils"
import { ResponseFormProps } from "@/lib/types"
import { SubmitHandler } from "react-hook-form"

export default function ResponseForm({ row, onSubmitResponse, onClickCloseTicket, onClickClose }: ResponseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      response: ""
    },
  })
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => onSubmitResponse(data)
 
  return (
    <>
    <Button aria-label="close-form" variant="ghost" size="icon" onClick={() => onClickClose()}>
      <X className="h-4 w-4"/>
    </Button>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 min-w-full">
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