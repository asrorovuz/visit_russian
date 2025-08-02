import { type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title?: string;
  children: ReactNode;
  width?: string; 
  height?: string; 
  showCloseIcon?: boolean;
}

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  width = "w-[100%] max-w-md",
  height = "max-h-[90vh]",
  showCloseIcon = true,
}: ModalProps) => {

  const {t} = useTranslation()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 relative ${width} ${height}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title va close icon */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t("navbar.title")}</h2>
          {showCloseIcon && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
          )}
        </div>

        {/* Children joyi */}
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
