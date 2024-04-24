import Link from "next/link";
import React from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import MobileNavbar from "./MobileNavbar";
import { Loader } from "lucide-react";

import NavLinks from "./NavLinks";

const Navbar = () => {

  return (
    <header className="h-[70px] shadow-xl px-6 sm:px-10 bg-blue-500 text-white flex justify-between items-center">
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
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
      </ClerkLoaded>
    <NavLinks/>
      <div className="flex sm:hidden">
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Navbar;
