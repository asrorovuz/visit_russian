import DatePicker from "react-datepicker";
import CustomInput from "../../ui/custom-input";
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const TourCard = ({ item, index, setCalcData, onRemove, error }: any) => {
  const {t} = useTranslation()
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;

    setCalcData((prev: any) => {
      const updatedTravelers = [...prev.travelers];
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [name]: value,
      };
      return { ...prev, travelers: updatedTravelers };
    });
  };

  const onChangeCheckbox = (e: any) => {
    const { name, checked } = e.target;

    setCalcData((prev: any) => {
      const updatedTravelers = [...prev.travelers];
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [name]: checked,
      };
      return { ...prev, travelers: updatedTravelers };
    });
  };

  const onChangebirthOfDate = (date: any) => {
    setCalcData((prev: any) => {
      const updatedTravelers = [...prev.travelers];
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        birthOfDate: date,
      };
      return { ...prev, travelers: updatedTravelers };
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 custom-shadow">
      <h4 className="font-semibold text-[16px] mb-[15px] flex items-center justify-between">
        {t("traveler.title")} {index + 1} {t("traveler.title2")}
        {onRemove && (
          <button type="button" onClick={() => onRemove(index)}>
            <IoCloseSharp size={20} />
          </button>
        )}
      </h4>

      <div className="text-[16px] font-normal text-[#8C8B9B] flex justify-between items-center mb-[15px]">
        <p className="w-4/5">{t("traveler.subTitle")}</p>
        <span>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.2292 9.49998C16.2292 13.2164 13.2164 16.2291 9.5 16.2291C5.78359 16.2291 2.77084 13.2164 2.77084 9.49998C2.77084 5.78356 5.78359 2.77081 9.5 2.77081C13.2164 2.77081 16.2292 5.78356 16.2292 9.49998ZM17.4167 9.49998C17.4167 13.8722 13.8722 17.4166 9.5 17.4166C5.12775 17.4166 1.58334 13.8722 1.58334 9.49998C1.58334 5.12772 5.12775 1.58331 9.5 1.58331C13.8722 1.58331 17.4167 5.12772 17.4167 9.49998ZM10.0523 10.7493H8.94401L8.76668 8.39323V5.69994H10.2297V8.39323L10.0523 10.7493ZM10.2297 13.4583H8.76668V11.9288H10.2297V13.4583Z"
              fill="#055087"
            />
          </svg>
        </span>
      </div>

      <div className="w-full mb-3">
        <label className="mb-1 text-[14px] font-medium leading-[140%]">
          {t("traveler.firstName")}
        </label>
        <input
          name="firstname"
          value={item.firstname || ""}
          onChange={onChangeInput}
          type="text"
          className={`py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB] border ${error && !item?.firstname ? "border-red-500" : "border-transparent"}`}
        />
      </div>

      <div className="w-full mb-3">
        <label className="mb-1 text-[14px] font-medium leading-[140%]">
          {t("traveler.lastName")}
        </label>
        <input
          name="lastname"
          value={item.lastname || ""}
          onChange={onChangeInput}
          type="text"
          className={`py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB] border ${error && !item?.lastname ? "border-red-500" : "border-transparent"}`}
        />
      </div>

      <div className="w-full mb-3">
        <label className="mb-1 text-[14px] font-medium leading-[140%]">
          {t("traveler.birthOfDate")}
        </label>
        <DatePicker
          selected={item.birthOfDate || null}
          onChange={onChangebirthOfDate}
          placeholderText={t("date")}
          dateFormat="dd.MM.yyyy"
          className={`w-full border ${error && !item?.birthOfDate ? "border-red-500" : "border-transparent"}`}
          calendarClassName="custom-datepicker"
          customInput={<CustomInput />}
        />
      </div>

      <div className="flex items-center text-[#8C8B9B] gap-x-[7px]">
        <input
          type="checkbox"
          id={`isBuy${item?.id}`}
          checked={item?.isBuy || false}
          name="isBuy"
          onChange={onChangeCheckbox}
        />
        <label htmlFor={`isBuy${item?.id}`}>{t("traveler.access")}</label>
      </div>
    </div>
  );
};

export default TourCard;
