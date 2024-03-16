import Link from "next/link";
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import MobileNavbar from "./MobileNavbar";
import { linksArray } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="py-4 px-6 sm:py-6 sm:px-10 bg-blue-500 text-white flex justify-between items-center">
      <SignedIn>
        <div>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex gap-4 text-black">
          <Link href="/sign-in">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline">Sign up</Button>
          </Link>
        </div>
      </SignedOut>
      <ul className="hidden sm:flex gap-8 text-xl">
        {linksArray.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex sm:hidden">
        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
