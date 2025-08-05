import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "../../style/custom-datepicker.css";
import CustomInput from "../../ui/custom-input";
import CustomButton from "../../ui/button";
import { IoCloseCircle, IoChevronDown } from "react-icons/io5";
import DaySelect from "../../ui/day-select";
import { useTranslation } from "react-i18next";

const Calculate = ({
  calcData,
  setCalcData,
  setTourists,
  tourists,
  setVisableCard,
}: any) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDays, setSelectedDays] = useState<number>(365);
  const [checkbox, setCheckbox] = useState<boolean>(
    calcData?.dayCheck || false
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showAgeDropdown, setShowAgeDropdown] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
    tourists: "",
  });
  const endDateRef = useRef<any>(null);

  const ageDropdownRef = useRef<HTMLDivElement>(null);
  const ageOptions = Array.from({ length: 101 }, (_, i) => i);

  const removeTourist = (id: number) => {
    setTourists((prev: any) => prev.filter((t: any) => t.id !== id));
  };

  const addTourist = (age: number) => {
    setTourists((prev: any) => [
      ...prev,
      { id: Date.now(), age, firstname: "", lastname: "", isBuy: false },
    ]);
    setShowAgeDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {
      startDate: "",
      endDate: "",
      tourists: "",
    };
    let isValid = true;

    if (!startDate) {
      newErrors.startDate = t("calculate.errors.startDate");
      isValid = false;
    }

    if (!checkbox && !endDate) {
      newErrors.endDate = t("calculate.errors.endDate");
      isValid = false;
    }

    if (tourists.length === 0) {
      newErrors.tourists = t("calculate.errors.len");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setCalcData((prev: any) => ({
      ...prev,
      startDate,
      endDate,
      dayCheck: checkbox,
      travelers: tourists,
      police: {
        lastname: "",
        firstname: "",
        email: [{ value: "" }],
        birthOfDate: undefined,
      },
    }));
    setVisableCard(true);
  };

  // Checkbox true bo'lsa avtomatik 365 kun qo‘shiladi
  useEffect(() => {
    if (startDate && checkbox) {
      // Checkbox true bo‘lsa 365 kun qo‘shiladi va endDate avtomatik belgilanadi
      const newEndDate = new Date(startDate);
      newEndDate.setDate(newEndDate.getDate() + 365);
      setEndDate(newEndDate);
      setSelectedDays(365);
    } else if (startDate && endDate && !checkbox) {
      // Checkbox false bo‘lsa, startDate va endDate orasidagi farq hisoblanadi
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setSelectedDays(diffDays);
    } else {
      setSelectedDays(0);
    }
  }, [startDate, endDate, checkbox]);

  // Age dropdown tashqarisiga bosilsa yopiladi
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ageDropdownRef.current &&
        !ageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAgeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (startDate && !checkbox) {
      setTimeout(() => {
        endDateRef.current?.setOpen(true);
      }, 100); // biroz delay beramiz, DOM tayyor bo'lishi uchun
    }
  }, [startDate, checkbox]);

  return (
    <div className="px-5">
      <h1 className="text-[26px] font-bold leading-7 text-white text-center mx-auto max-w-[210px] mb-[18px]">
        {t("calculate.title")}
      </h1>

      <div className="bg-white rounded-2xl p-4 shadow-md">
        {/* Start Date */}
        <div className="w-full mb-3">
          <label className="mb-1 text-[14px] font-medium leading-[140%]">
            {t("calculate.firstDate")}
          </label>
          <DatePicker
            selected={startDate}
            minDate={new Date()}
            onChange={(date: any) => setStartDate(date)}
            placeholderText={t("date")}
            dateFormat="dd.MM.yyyy"
            className="w-full"
            calendarClassName="custom-datepicker"
            customInput={<CustomInput />}
          />
          {errors.startDate && !startDate && (
            <div className="text-red-500 text-sm mt-1">{errors.startDate}</div>
          )}
        </div>

        {/* End Date */}
        {!checkbox && (
          <div className="w-full mb-3">
            <label className="mb-1 text-[14px] font-medium leading-[140%]">
              {t("calculate.lastDate")}
            </label>
            <DatePicker
              ref={endDateRef}
              selected={endDate}
              disabled={!startDate}
              onChange={(date: any) => setEndDate(date)}
              placeholderText={t("date")}
              dateFormat="dd.MM.yyyy"
              className="w-full"
              calendarClassName="custom-datepicker"
              customInput={<CustomInput />}
              minDate={startDate} 
            />

            {errors.endDate && !endDate && (
              <div className="text-red-500 text-sm mt-1">{errors.endDate}</div>
            )}
          </div>
        )}

        {/* Days + Checkbox */}
        <div className="w-full mb-3">
          <label className="mb-1 text-[14px] font-medium leading-[140%]">
            {t("calculate.days")} <span>{selectedDays || 0}</span>
          </label>
          <div className="flex items-center text-[#8C8B9B] gap-x-[7px]">
            <input
              type="checkbox"
              id="checked"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
            />
            <label htmlFor="checked">{t("calculate.police")}</label>
          </div>
        </div>

        {checkbox && (
          <DaySelect
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        )}

        {/* Tourists */}
        <div className="w-full mb-3">
          <label className="mb-1 text-[14px] font-medium leading-[140%]">
            {t("calculate.traveler")}{" "}
            {tourists.length ? `(${tourists.length})` : null}
          </label>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#F3F6FB] rounded-lg py-[7px] px-3 w-full h-[38px] font-normal text-[14px] text-left"
          >
            {tourists.length
              ? tourists.map((t: any) => t.age).join(", ") +
                " " +
                t("calculate.year")
              : t("calculate.countTourist")}
          </button>

          {isOpen && (
            <div className="bg-white mt-2">
              <div className="p-4 border border-button rounded-md space-y-2 relative">
                {tourists.map((tourist: any, index: number) => (
                  <div
                    key={tourist.id}
                    className="flex justify-between items-center bg-gray-100 text-sm px-3 py-2 rounded-md"
                  >
                    <span>
                      {index + 1} {t("calculate.tourist")}: {tourist.age}{" "}
                      {t("calculate.year")}
                    </span>
                    <button
                      onClick={() => removeTourist(tourist.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <IoCloseCircle size={18} />
                    </button>
                  </div>
                ))}

                {/* Age Dropdown */}
                <div className="relative" ref={ageDropdownRef}>
                  <button
                    onClick={() => setShowAgeDropdown((prev) => !prev)}
                    className="bg-button w-full text-white justify-between py-2 px-3 rounded-md text-sm flex items-center"
                  >
                    {t("calculate.button")}
                    <IoChevronDown className="ml-1" />
                  </button>

                  {showAgeDropdown && (
                    <div className="absolute z-10 mt-2 w-full max-h-[160px] overflow-y-auto bg-white border border-button rounded-md shadow-lg">
                      {ageOptions.map((age) => (
                        <div
                          key={age}
                          onClick={() => addTourist(age)}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                        >
                          {age} {t("calculate.age")}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {errors.tourists && !tourists?.length && (
          <div className="text-red-500 text-sm mt-2">{errors?.tourists}</div>
        )}
      </div>

      <div className="mt-4 w-full">
        <CustomButton width={"w-full"} onClick={handleSubmit} text={t("calculate.button1")} />
      </div>
    </div>
  );
};

export default Calculate;
