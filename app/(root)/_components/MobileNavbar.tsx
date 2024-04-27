import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { linksArray } from "@/utils/arrays";
import { auth } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileNavbar = () => {
  const { userId } = auth();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-10 h-10" />
      </SheetTrigger>
      <SheetContent>
        <ul className="flex flex-col gap-8 cursor-pointer justify-center mt-12">
          {linksArray.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link href={item.href}>
                <li className=" text-3xl font-medium">{item.label}</li>
              </Link>
            </SheetClose>
          ))}
          <li>
            <Link
              className="text-3xl font-medium"
              href={`/profile/${userId}`}
            >
              My profile
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
