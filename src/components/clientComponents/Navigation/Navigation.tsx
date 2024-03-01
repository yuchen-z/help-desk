'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from "next/link";


export default function Navigation (){
  return (
  <NavigationMenu className="flex flex-row gap-8 p-8 text-sm">
    <NavigationMenuItem>
      <Link href='/'>
        <NavigationMenuLink className="hover:underline">Home</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href='/ticket-list'>
        <NavigationMenuLink className="hover:underline">Ticket List</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  </NavigationMenu>
  )
}