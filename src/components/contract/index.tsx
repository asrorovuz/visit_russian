import logoBlack from "../../assets/logo-black.png";
import { FaCheck } from "react-icons/fa6";
import CustomButton from "../../ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Contract = () => {
  const { t } = useTranslation();
  const [allTag, setAllTag] = useState(false);
  const [activeService, setActiveService] = useState(false);

  const list = t("contract.listTag", { returnObjects: true }) as string[];

  return (
    <div className="px-5">
      <h1 className="text-[26px] font-bold leading-7 text-black text-center mx-auto max-w-[210px] mb-[18px]">
        {t("contract.title")}
      </h1>

      <div className="bg-white rounded-2xl p-4 custom-shadow">
        <div className="flex justify-between items-center mb-[15px]">
          <h4 className="text-[16px] font-semibold max-w-[162px]">
            {t("contract.subTitleL")}
          </h4>
          <div className="flex items-center gap-x-2">
            <ul className="flex flex-col text-right text-[10px] font-normal">
              <li>{t("contract.lists.n1")}</li>
              <li>{t("contract.lists.n2")}</li>
              <li>{t("contract.lists.n3")}</li>
            </ul>
            <div className="w-[59px] h-7">
              <img
                className="w-full h-full object-cover"
                src={logoBlack}
                alt="logo"
              />
            </div>
          </div>
        </div>
        <div className="rounded-md py-[10px] px-2 border border-[#E5E3F9] text-[14px] font-normal text-[#8C8B9B] mb-[15px]">
          {t("contract.coverage")}{" "}
          <span className="text-[15px] font-semibold text-[#055087] ml-1.5">
            35,000 €
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-[15px]">
          {list?.slice(0, allTag ? list.length : 4)?.map((item: any) => (
            <div className="w-max flex gap-0.5 items-center py-1.5 px-2.5 rounded-md bg-[#F3F6FB] text-[14px] font-normal text-black">
              <span className="text-[055087] mr-0.5">
                <FaCheck />
              </span>{" "}
              {item}
            </div>
          ))}
        </div>
        {!allTag && (
          <div className="mb-[15px]">
            <CustomButton
              py={"py-[5px]"}
              size={"text-[13px]"}
              width={"w-max"}
              onClick={() => setAllTag(true)}
              text={
                <p className="flex items-center gap-x-[5px]">
                  {t("contract.button")}
                  <span>
                    <FaChevronDown />
                  </span>
                </p>
              }
            />
          </div>
        )}
        <div className="bg-[#F3F6FB] py-4 px-2.5 rounded-lg border border-[#F3F6FB] text-center mb-[15px]">
          <p className="font-normal text-black text-[15px] mb-3">
            {t("contract.police")}
          </p>
          <span className="text-[25px] font-semibold text-[69,00 €]">
            {activeService ? `${69 + 35}.00` : "69.00"} €
          </span>
        </div>
        <div>
          <div className="flex items-center text-[#8C8B9B] gap-x-[7px]">
            <input
              type="checkbox"
              id="checkedActive"
              checked={activeService}
              onChange={() => setActiveService(!activeService)}
            />
            <label htmlFor="checkedActive">{t("contract.active")}</label>
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
        </div>
      </div>
    </div>
  );
};

export default Contract;
