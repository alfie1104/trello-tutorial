"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    //server에서 처음 rendering될때는 useEffect가 호출되지 않으므로 isMounted가 false상태임
    //그러나 client에서 rendering될때에는 useEffect가 호출되며, setIsMounted(true)를 실행하므로 isMounted가 true가 되어 return <div>..</div>부분이 화면에 출력되게 됨
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side="left" className="p-2 pt-10">
            <Sidebar storageKey="t-sidebar-mobile-state" />
          </SheetContent>
        </Sheet>
      </Button>
    </>
  );
};
