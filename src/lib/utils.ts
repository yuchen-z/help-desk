import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ticketFormSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  description: z.string().min(1).max(500)
})