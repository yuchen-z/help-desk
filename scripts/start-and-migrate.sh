#!/bin/sh
npm run dev &
echo "Waiting for the server to start..."
sleep 10
echo "Running Prisma migrate..."
npx prisma migrate dev
wait
