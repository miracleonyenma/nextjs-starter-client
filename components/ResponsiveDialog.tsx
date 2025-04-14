"use client";

import React, { ReactNode, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ResponsiveDialog: React.FC<{
  title?: string;
  description?: string;
  drawerClose?: ReactNode;
  trigger?: ReactNode;
  children?: ReactNode;
  openPrompt?: boolean;
}> = ({ children, trigger, openPrompt, title, description, drawerClose }) => {
  const [open, setOpen] = useState(openPrompt);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setOpen(openPrompt);
  }, [openPrompt]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title || "Heads Up!"}</DialogTitle>
            <DialogDescription>
              {description ||
                "Here's some important information or action you need to review and take"}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title || "Heads Up!"}</DrawerTitle>
          <DrawerDescription>
            {description ||
              "Here's some important information or action you need to review and take"}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter className="flex flex-row gap-4">
          <DrawerClose asChild>
            {drawerClose || <button className="btn">Cancel</button>}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
