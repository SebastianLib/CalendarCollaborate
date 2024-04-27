"use client";
import { cn, linksArray } from "@/utils/arrays";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <ul className="hidden sm:flex text-xl h-full">
      {linksArray.map((link, index) => (
        <li
          key={index}
          className={cn(
            "flex items-center px-6 justify-center h-full hover:text-white/70 transition-colors",
             pathname.includes(link.href) && "bg-white text-blue-500 hover:text-blue-500/70 transition-colors"
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
      <li>
        <Link
          href={`/profile/${userId}`}
          className={cn(
            "flex items-center px-6 justify-center h-full hover:text-white/70 transition-colors",
            pathname.includes("profile") && "bg-white text-blue-500 hover:text-blue-500/70 transition-colors"
          )}
        >
          My profile
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
