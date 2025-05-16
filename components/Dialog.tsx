import { AnimatePresence, AnimationProps, motion } from "motion/react";
import * as Dialog from "toldo";
import React from "react";

export interface DialogProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  children?: React.ReactNode;
  width?: string;
  trigger?: React.ReactNode;
  triggerText?: string;
  withAnimation?: boolean;
}

export const ReusableDialog: React.FC<DialogProps> = ({
  open,
  setOpen,
  onConfirm,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Continue",
  children,
  width = "max-w-[450px]",
  trigger,
  triggerText,
  withAnimation = true,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined && setOpen !== undefined;

  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? setOpen : setInternalOpen;

  const variants: { [key: string]: AnimationProps } = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
    content: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      ) : triggerText ? (
        <Dialog.Trigger className="border-gray-3 bg-gray-1 from-gray-1 to-gray-2 h-[32px] rounded-lg border bg-gradient-to-t px-3 transition-all ease-in-out hover:brightness-95">
          {triggerText}
        </Dialog.Trigger>
      ) : null}
      <Dialog.Portal forceMount>
        {withAnimation ? (
          <>
            <AnimatePresence mode="popLayout">
              {isOpen && (
                <Dialog.Overlay className="fixed top-0 left-0 z-30 h-full w-full">
                  <motion.div
                    className="fixed inset-0 bg-black/40"
                    {...variants.overlay}
                  />
                </Dialog.Overlay>
              )}
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
              {isOpen && (
                <Dialog.Content
                  className={`fixed top-1/2 left-1/2 z-40 max-h-[85vh] w-[90vw] ${width} -translate-x-1/2 -translate-y-1/2`}
                >
                  <motion.div
                    className="flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-100 sm:w-full dark:border-gray-700 dark:bg-gray-800"
                    {...variants.content}
                  >
                    <Dialog.Title className="px-6 pt-5 text-lg font-semibold dark:text-gray-200">
                      {title}
                    </Dialog.Title>
                    {description && (
                      <Dialog.Description className="px-6 py-1">
                        {description}
                      </Dialog.Description>
                    )}
                    {children && <div className="px-6 py-2">{children}</div>}
                    <div className="bg-gray-2 flex justify-between gap-4 border-t border-gray-100 px-6 py-5 dark:border-gray-700">
                      <Dialog.Close className="btn secondary transition-all ease-in-out">
                        {cancelText}
                      </Dialog.Close>
                      <button
                        autoFocus
                        onClick={handleConfirm}
                        className="btn primary transition-all ease-in-out"
                      >
                        {confirmText}
                      </button>
                    </div>
                  </motion.div>
                </Dialog.Content>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            {isOpen && (
              <>
                <Dialog.Overlay className="fixed top-0 left-0 z-30 h-full w-full bg-black/40" />
                <Dialog.Content
                  className={`fixed top-1/2 left-1/2 z-40 max-h-[85vh] w-[90vw] ${width} -translate-x-1/2 -translate-y-1/2`}
                >
                  <div className="flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-100 sm:w-full dark:border-gray-700 dark:bg-gray-800">
                    <Dialog.Title className="px-6 pt-5 text-lg font-semibold dark:text-gray-200">
                      {title}
                    </Dialog.Title>
                    {description && (
                      <Dialog.Description className="px-6 py-1">
                        {description}
                      </Dialog.Description>
                    )}
                    {children && <div className="px-6 py-2">{children}</div>}
                    <div className="bg-gray-2 flex justify-between gap-4 border-t border-gray-100 px-6 py-5 dark:border-gray-700">
                      <Dialog.Close className="btn secondary transition-all ease-in-out">
                        {cancelText}
                      </Dialog.Close>
                      <button
                        autoFocus
                        onClick={handleConfirm}
                        className="btn primary transition-all ease-in-out"
                      >
                        {confirmText}
                      </button>
                    </div>
                  </div>
                </Dialog.Content>
              </>
            )}
          </>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// Example of usage for logout
export const LogoutDialog: React.FC<{
  open: boolean;
  setOpen: (value: boolean) => void;
  onLogout: () => void;
}> = ({ open, setOpen, onLogout }) => {
  return (
    <ReusableDialog
      open={open}
      setOpen={setOpen}
      onConfirm={onLogout}
      title="Are you sure you want to log out?"
      description="Click on continue to log out of this session."
      confirmText="Continue"
    />
  );
};

// Example of usage for user deletion
export const DeleteUserDialog: React.FC<{
  open: boolean;
  setOpen: (value: boolean) => void;
  onDelete: () => void;
  userName?: string;
}> = ({ open, setOpen, onDelete, userName }) => {
  return (
    <ReusableDialog
      open={open}
      setOpen={setOpen}
      onConfirm={onDelete}
      title={`Delete User${userName ? `: ${userName}` : ""}`}
      description="This action cannot be undone. The user will be permanently deleted from the system."
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
};
