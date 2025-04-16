import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import * as Dialog from "toldo";

export const AuthUserLogoutDialog: React.FC<{
  open: boolean;
  setOpen: (value: boolean) => void;
  canProceed?: (value: boolean) => void;
}> = ({ open, setOpen, canProceed }) => {
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

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* <Dialog.Trigger className="border-gray-3 bg-gray-1 from-gray-1 to-gray-2 h-[32px] rounded-lg border bg-gradient-to-t px-3 transition-all ease-in-out hover:brightness-95">
        Open Dialog
      </Dialog.Trigger> */}
      <Dialog.Portal forceMount>
        <AnimatePresence mode="popLayout">
          {open && (
            <Dialog.Overlay className="fixed left-0 top-0 h-full w-full">
              <motion.div
                className="fixed inset-0 bg-black/40"
                {...variants.overlay}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {open && (
            <Dialog.Content className="fixed left-1/2 top-1/2 z-20 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-100 sm:w-[384px] dark:border-gray-700 dark:bg-gray-800"
                {...variants.content}
              >
                <Dialog.Title className="px-6 pt-5 text-lg font-semibold dark:text-gray-200">
                  Are you sure you want to log out?
                </Dialog.Title>
                <Dialog.Description className="px-6 py-1">
                  Click on continue to log out of this session.
                </Dialog.Description>
                <div className="bg-gray-2 flex justify-between gap-4 border-t border-gray-100 px-6 py-5 dark:border-gray-700">
                  <Dialog.Close className="btn secondary transition-all ease-in-out">
                    Cancel
                  </Dialog.Close>
                  <Dialog.Close
                    autoFocus
                    onClick={() => {
                      if (canProceed) canProceed(true);
                    }}
                    className="btn primary transition-all ease-in-out"
                  >
                    Continue
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
