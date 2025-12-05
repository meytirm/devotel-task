import {type Dispatch, type ReactNode, type SetStateAction, useEffect} from "react";

const Modal = ({children, isOpen = false, onClose, title = 'title'}: Props) => {


  function handleCloseModal() {
    onClose(false)
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


  return (isOpen && <div className="flex flex-col items-center justify-center bg-black/60 fixed inset-0" onClick={handleCloseModal}>
      <div className="bg-white md:w-[400px] w-auto rounded-md p-4">
          <div className="flex justify-between items-center">
              <div>{title}</div>
              <div onClick={handleCloseModal}>close</div>
          </div>
          <div>{children}</div>
      </div>
  </div>)
}

interface Props {
  children: ReactNode
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  title?: string
}

export default Modal