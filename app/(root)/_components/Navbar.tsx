import Link from "next/link";
import React from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import MobileNavbar from "./MobileNavbar";
import { linksArray } from "@/lib/utils";
import { Loader } from "lucide-react";

const Navbar = () => {

  const {userId} = auth();

  return (
    <header className="h-[70px] px-6 sm:px-10 bg-blue-500 text-white flex justify-between items-center">
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
      <ul className="hidden sm:flex gap-8 text-xl">
        {linksArray.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        <li>
          <Link href={`/profile/${userId}`}>My profile</Link>
        </li>
      </ul>
      <div className="flex sm:hidden">
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Navbar;
