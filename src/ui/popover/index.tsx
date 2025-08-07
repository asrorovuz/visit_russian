import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GrLocation } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";

const CountryPopover = ({ country = "Uzbekistan", setIsOpen }: any) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleYes = () => {
    setOpen(false);
  };

  const handleAnotherCountry = () => {
    setOpen(false);
    setIsOpen(true);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex gap-x-1 items-center text-white rounded"
      >
        <GrLocation />
        {country}
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute left-0 mt-2 w-[280px] bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-5"
        >
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-300"></div>

          <p className="mb-4 text-gray-800 flex items-center justify-between">
            {t("navbar.question")} {country}?
            <span onClick={handleYes} className="font-bold text-xl">
              <MdOutlineClose />
            </span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleYes}
              className="bg-button text-white px-4 py-2 rounded-full hover:bg-button/70 transition-all duration-300"
            >
              {t("navbar.yes")}
            </button>
            <button
              onClick={handleAnotherCountry}
              className="border border-button px-4 rounded-full text-button hover:text-button/70 transition-all duration-300"
            >
              {t("navbar.other")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryPopover;
