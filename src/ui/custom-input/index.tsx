import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const CustomInput = forwardRef(({ value, onClick, className }: any, ref) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      ref={ref as React.Ref<HTMLDivElement>}
      className={`
        w-full bg-[#F3F6FB] rounded-lg py-[7px] px-3 text-[14px] font-normal leading-6 
        outline-none focus:outline focus:outline-button flex justify-between items-center 
        cursor-pointer transition
        ${className}  // 👉 MUHIM: tashqaridan kelgan className shu yerda ishlatiladi
      `}
    >
      <span>{value || t("date")}</span>
      {/* svg qismi o‘zgartirilmagan */}
    </div>
  );
});

export default CustomInput;
