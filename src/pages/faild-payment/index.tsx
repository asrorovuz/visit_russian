import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/button";
import { useTranslation } from "react-i18next";

const FaildPayment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const faildList: string[] = t("faild.lists", { returnObjects: true }) as string[];

  return (
    <div className="relative z-20 top-[88px] px-5">
      <h2 className="text-[26px] font-bold leading-7 text-white text-center mx-auto max-w-[210px] mb-[18px]">
        {t("faild.title")}
      </h2>

      <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
        <div className="text-[43px] flex justify-center">
          <span>
            <svg
              width="39"
              height="35"
              viewBox="0 0 39 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.62578 28.1887L17.2795 4.26567C18.263 2.54261 20.7472 2.5426 21.7306 4.26567L35.3844 28.1887C36.3594 29.897 35.1258 32.0213 33.1588 32.0213H5.85131C3.88437 32.0213 2.65078 29.897 3.62578 28.1887ZM1.40025 26.9184L15.054 2.99547C17.0209 -0.45066 21.9892 -0.45066 23.9562 2.99547L37.6099 26.9184C39.5599 30.335 37.0927 34.5838 33.1588 34.5838H5.85131C1.91741 34.5838 -0.549743 30.335 1.40025 26.9184ZM18.2903 21.8728H20.7102L21.0974 16.776V10.95H17.903V16.776L18.2903 21.8728ZM17.903 27.7327H21.0974V24.4242H17.903V27.7327Z"
                fill="#055087"
              />
            </svg>
          </span>
        </div>
        <h4 className="text-[16px] font-medium text-[#191919] text-center">
          {t("faild.subtitle")}
        </h4>
        <p className="text-center font-normal text-[14px] text-[#8C8B9B] mb-[17px]">
          {t("faild.subtitle2")}
        </p>
        <ul className="flex flex-col gap-y-[15px] text-[13px] font-normal text-[#191919] mb-[17px]">
          {faildList?.map((item: string, index: number) => (
            <li key={index} className="flex items-center gap-x-1.5">
              <div className="min-w-[5px] min-h-[5px] rounded-full bg-[#055087]"></div>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-[14px] font-normal text-center text-[#8C8B9B]">
          {t("faild.police")}
        </p>
      </div>
      <CustomButton onClick={() => navigate("/")} text={"Pay Now"} />
    </div>
  );
};

export default FaildPayment;
