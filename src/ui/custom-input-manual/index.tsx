import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const CustomInputDateLike = forwardRef<HTMLInputElement, any>(
  ({ value, onClick, onChange, className }, ref) => {
    const { t } = useTranslation();

    return (
      <input
        type="text"
        name="custom-date-input" // autoFill oldini olish uchun noyob nom
        autoComplete="off" // Safari autofill'ni o‘chiradi
        inputMode="numeric" // faqat raqamli klaviatura (mobilda)
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        value={value || ""}
        placeholder={t("date")}
        className={`
          w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          appearance-none transition ${className}
        `}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1rem 1rem",
        }}
      />
    );
  }
);

export default CustomInputDateLike;
