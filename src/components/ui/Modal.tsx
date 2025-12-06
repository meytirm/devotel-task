import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
} from "react";
import { XIcon } from "lucide-react";

const Modal = ({
  children,
  isOpen = false,
  onClose,
  title = "title",
}: Props) => {
  function handleCloseModal() {
    onClose(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div
        className="flex flex-col items-center justify-center bg-black/60 fixed inset-0"
        onClick={handleCloseModal}
      >
        <div
          className="bg-white md:w-[400px] w-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <div className="font-bold">{title}</div>
            <div>
              <XIcon
                onClick={handleCloseModal}
                size={20}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    )
  );
};

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  title?: string;
}

export default Modal;
