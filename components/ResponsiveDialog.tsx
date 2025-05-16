"use client";

import React, { ReactNode, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
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
import { ReusableDialog } from "@/components/Dialog";

export interface ResponsiveDialogProps {
  title?: string;
  description?: string;
  drawerClose?: ReactNode;
  trigger?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  width?: string;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  children,
  trigger,
  open: externalOpen,
  setOpen: externalSetOpen,
  title = "Heads Up!",
  description = "Here's some important information or action you need to review and take",
  drawerClose,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Continue",
  width = "sm:max-w-[425px]",
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled =
    externalOpen !== undefined && externalSetOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? externalSetOpen : setInternalOpen;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <ReusableDialog
        open={open}
        setOpen={setOpen}
        onConfirm={onConfirm}
        title={title}
        description={description}
        cancelText={cancelText}
        confirmText={confirmText}
        width={width}
        trigger={trigger}
        withAnimation={true}
      >
        {children}
      </ReusableDialog>
    );
  }

  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter className="flex flex-row justify-between gap-4">
          <DrawerClose asChild>
            {drawerClose || (
              <button className="btn secondary">{cancelText}</button>
            )}
          </DrawerClose>
          <button onClick={handleConfirm} className="btn primary">
            {confirmText}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
