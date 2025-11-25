"use client"

import * as React from "react"
import Link from "next/link"
// import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
// import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu"

import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

import iconImage from "../../public/account_circle.png"

export default function Header() {
    return(
        <header className='flex justify-between items-center px-4 py-2 bg-card shadow-md'>
            <div>
                <NavigationMenu>
                    <NavigationMenuList className="flex-wrap gap-3">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/search">Search</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/library">MyLibrary</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div>
                <Avatar>
                    <AvatarImage src={iconImage.src}/>
                    <AvatarFallback>Icon</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}