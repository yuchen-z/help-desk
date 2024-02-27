import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { ticketFormSchema } from '@/lib/utils';

const prisma = new PrismaClient();

export async function POST(req: Request){
  const body = await req.json()
  console.log('request body', body)
  const {name, email, description} = ticketFormSchema.parse(body)
  console.log('parsed info', name, email, description)
  try {
    const newTicket = await prisma.ticket.create({
      data: {
        name: name,
        email: email,
        description: description,
        status: "OPEN"
      },
    });
    return NextResponse.json(newTicket, {status: 201});
  } catch (error) {
    console.error("Failed to create ticket:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500})
  }
}
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany()
    return NextResponse.json(tickets, {status: 200});
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500})
  }
}
