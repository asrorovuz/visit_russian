import { useState } from "react";
import { useTranslation } from "react-i18next";

const DaySelect = ({selectedDays, setSelectedDays}: any) => {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  const daysOptions = [10, 15, 30, 45, 60, 90, 180, 365];

  return (
    <div className="w-full mb-3 relative">
      <label className="mb-1 block text-[14px] font-medium leading-[140%]">
        {t("calculate.selectTitle")}
      </label>

      <div
        onClick={() => setOpen(!open)}
        className="w-full border border-[#cbd5e1] rounded-md px-3 py-2 cursor-pointer flex justify-between items-center bg-white"
      >
        <span className="text-[14px] text-[#191919]">
          {selectedDays ? `${selectedDays} ${t("calculate.days")}` : t("calculate.select")}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
          {daysOptions.map((day) => (
            <li
              key={day}
              onClick={() => {
                setSelectedDays(day);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedDays === day ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {day} {t("calculate.day")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DaySelect;
