import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { linksArray } from "@/lib/utils";
  import { Menu } from "lucide-react";
  import Link from "next/link";
  
  const MobileNavbar = () => {
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
                  <li className="navLi text-3xl font-medium">{item.label}</li>
                </Link>
              </SheetClose>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default MobileNavbar;
  