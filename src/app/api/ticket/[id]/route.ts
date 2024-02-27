import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  {params} : {params: {id: string}}
  ){
  try {
    const updateTicket = await prisma.ticket.update({
      where: {
        id: JSON.parse(params.id),
      },
      data: {
        status: "IN_PROGRESS"
      },
    });
    return NextResponse.json(updateTicket, {status: 200});
  } catch (error) {
    console.error("Failed to update ticket:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500})
  }
}
export async function DELETE(
  req: Request,
  {params} : {params: {id: string}}
  ){
  try {
    const updateTicket = await prisma.ticket.update({
      where: {
        id: JSON.parse(params.id),
      },
      data: {
        status: "CLOSE"
      },
    });
    return NextResponse.json(updateTicket, {status: 200});
  } catch (error) {
    console.error("Failed to close ticket:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500})
  }
}