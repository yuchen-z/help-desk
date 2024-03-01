'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import Link from "next/link";


export default function Navigation (){
  return (
  <NavigationMenu className="flex flex-row gap-8 p-8 text-sm">
    <NavigationMenuItem>
      <Link href='/' legacyBehavior passHref>
        <NavigationMenuLink className="hover:underline">Home</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href='/ticket-list' legacyBehavior passHref>
        <NavigationMenuLink className="hover:underline">Ticket List</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  </NavigationMenu>
  )
}