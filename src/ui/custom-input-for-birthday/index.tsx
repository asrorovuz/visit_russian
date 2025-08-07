import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const CustomInputForBirthDay = forwardRef<HTMLInputElement, any>(
    ({ value, onClick, onChange, className }, ref) => {
      const { t } = useTranslation();
  
      return (
        <input
          type="text"
          onClick={onClick}
          onChange={onChange} // ❗️ SHU joy muhim
          ref={ref}
          value={value || ""}
          placeholder={t("date")}
          className={`
            w-full bg-[#F3F6FB] rounded-lg py-[7px] px-3 text-[14px] font-normal leading-6 
            outline-none focus:outline focus:outline-button flex justify-between items-center 
            cursor-pointer transition
            ${className}
          `}
        />
      );
    }
  );
  

export default CustomInputForBirthDay;
