import prisma from '../../../../../prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  {params} : {params: {id: string}}
  ){
  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: JSON.parse(params.id),
      }
    });
    return NextResponse.json(ticket, {status: 200});
  } catch (error) {
    console.error("Failed to find ticket:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500})
  }
}

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