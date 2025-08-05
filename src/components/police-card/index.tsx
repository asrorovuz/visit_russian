import DatePicker from "react-datepicker";
import CustomInput from "../../ui/custom-input";
import { IoCloseSharp } from "react-icons/io5";
import CustomButton from "../../ui/button";
import { BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const PoliceCard = ({ item, setCalcData }: any) => {
  const { t } = useTranslation();
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    emailIndex?: number
  ) => {
    const { name, value } = e.target;

    setCalcData((prev: any) => {
      const police = { ...prev.police };

      if (name === "email" && typeof emailIndex === "number") {
        const updatedEmails = [...(police.email || [])];
        updatedEmails[emailIndex] = { value };
        return {
          ...prev,
          police: {
            ...police,
            email: updatedEmails,
          },
        };
      }

      return {
        ...prev,
        police: {
          ...police,
          [name]: value,
        },
      };
    });
  };

  const onChangeBirthDate = (date: Date | null) => {
    setCalcData((prev: any) => ({
      ...prev,
      police: {
        ...prev.police,
        birthDate: date,
      },
    }));
  };

  const addEmailField = () => {
    setCalcData((prev: any) => ({
      ...prev,
      police: {
        ...prev.police,
        email: [...(prev.police?.email || []), { value: "" }],
      },
    }));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const removeEmailField = (index: number) => {
    setCalcData((prev: any) => {
      const updatedEmails = [...(prev.police?.email || [])];
      if (updatedEmails.length > 1) {
        updatedEmails.splice(index, 1);
      }
      return {
        ...prev,
        police: {
          ...prev.police,
          email: updatedEmails,
        },
      };
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 custom-shadow">
      <h4 className="font-semibold text-[16px] mb-[15px]">
        {t("traveler.titlePlice")}
      </h4>

      <div className="text-[16px] font-normal text-[#8C8B9B] flex justify-between items-center mb-[15px]">
        <p className="w-4/5">{t("traveler.subTitlePolice")}</p>
        <span>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.2292 9.49998C16.2292 13.2164 13.2164 16.2291 9.5 16.2291C5.78359 16.2291 2.77084 13.2164 2.77084 9.49998C2.77084 5.78356 5.78359 2.77081 9.5 2.77081C13.2164 2.77081 16.2292 5.78356 16.2292 9.49998ZM17.4167 9.49998C17.4167 13.8722 13.8722 17.4166 9.5 17.4166C5.12775 17.4166 1.58334 13.8722 1.58334 9.49998C1.58334 5.12772 5.12775 1.58331 9.5 1.58331C13.8722 1.58331 17.4167 5.12772 17.4167 9.49998ZM10.0523 10.7493H8.94401L8.76668 8.39323V5.69994H10.2297V8.39323L10.0523 10.7493ZM10.2297 13.4583H8.76668V11.9288H10.2297V13.4583Z"
              fill="#055087"
            />
          </svg>
        </span>
      </div>

      {/* First name */}
      <div className="w-full mb-3">
        <label className="mb-1 text-[14px] font-medium leading-[140%]">
          {t("traveler.firstName")}
        </label>
        <input
          name="firsname"
          value={item.firsname || ""}
          onChange={onChangeInput}
          type="text"
          className="py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB]"
        />
      </div>

      {/* Last name */}
      <div className="w-full mb-3">
        <label className="mb-1 text-[14px] font-medium leading-[140%]">
          {t("traveler.lastName")}
        </label>
        <input
          name="lastname"
          value={item.lastname || ""}
          onChange={onChangeInput}
          type="text"
          className="py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB]"
        />
      </div>

      {/* Birth date */}
      <div className="w-full mb-3">
        <label className="mb-1 text-[14px] font-medium leading-[140%]">
          {t("traveler.birthOfDate")}
        </label>
        <DatePicker
          selected={item.birthDate || null}
          onChange={onChangeBirthDate}
          placeholderText={t("date")}
          dateFormat="dd.MM.yyyy"
          className="w-full"
          calendarClassName="custom-datepicker"
          customInput={<CustomInput />}
        />
      </div>

      {/* ✅ Email fields (object-based) */}
      <div className="w-full mb-3">
        <label className="mb-1 text-[14px] font-medium leading-[140%]">
          {t("traveler.email")}
        </label>
        {(item?.email || [{ value: "" }]).map(
          (emailObj: { value: string }, i: number) => {
            const isInvalid = emailObj.value && !isValidEmail(emailObj.value);
            return (
              <div key={i} className="flex items-center gap-2 mb-[15px]">
                <input
                  name="email"
                  value={emailObj.value}
                  onChange={(e) => onChangeInput(e, i)}
                  type="email"
                  className={`py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB] 
            ${isInvalid ? "border border-red-500" : ""}`}
                />
                {item.email?.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmailField(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoCloseSharp />
                  </button>
                )}
              </div>
            );
          }
        )}

        <CustomButton
          py={"py-[5px]"}
          size={"text-[13px]"}
          width={"w-max"}
          text={
            <p className="flex items-center gap-2">
              {t("traveler.buttonEmail")}
              <span>
                <BiPlus />
              </span>
            </p>
          }
          onClick={addEmailField}
          className="text-blue-600 text-sm underline mt-1"
        />
      </div>
    </div>
  );
};

export default PoliceCard;
