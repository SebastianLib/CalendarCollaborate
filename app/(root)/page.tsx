import { Button } from "@/components/ui/button";
import db from "@/db";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-[calc(100vh-70px)]">
      <div className="relative w-[300px] h-[240px] lg:w-[500px] lg:h-[400px] mb-8 lg:mb-0">
        <Image src="/teamImage.jpg" fill alt="Hero" className="object-cover" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1
          className="text-xl lg:text-3xl font-bold text-neutral-600
        max-w-[480px] text-center"
        >
          Task Management, Group Collaboration, Effortless Task Assignment
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <Link href="/sign-up" className="w-full">
                <Button size="lg" variant="main" className="w-full">
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in" className="text-black">
                  I already have an account
              </Link>
            </SignedOut>

            <SignedIn>
              <Button size="lg" variant="main" className="w-full" asChild>
                <Link href="/schedule">Go to my schedule</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
