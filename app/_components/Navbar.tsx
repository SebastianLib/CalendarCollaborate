import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className='p-6 px-10 bg-blue-500 text-white flex justify-between items-center'>
        <SignedIn>
            <div className="hidden md:flex">
              <UserButton />
            </div>
        </SignedIn>
        <SignedOut>
          <div className="hidden md:flex gap-4 text-black">
            <Link href="/sign-in">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline">Sign up</Button>
            </Link>
          </div>
        </SignedOut>
        <ul className='flex gap-8 text-xl'>
            <li><Link href={"/create"}>Create</Link></li>
            <li><Link href={"/schedule"}>Schedule</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar