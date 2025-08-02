import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/button";
import { useTranslation } from "react-i18next";

const SuccessPayment = () => {
    const navigate = useNavigate()
  const {t} = useTranslation()

  return (
    <div className="relative z-20 top-[88px] px-5">
      <h2 className="text-[26px] font-bold leading-7 text-white text-center mx-auto max-w-[220px] mb-[18px]">
        {t("success.title")}
      </h2>

      <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
        <div className="text-[43px] flex justify-center">
          <span>
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.89915 19.6257L10.7638 28.5017L28.5504 10.6925L30.4496 12.594L11.7134 31.354C11.1889 31.8791 10.3387 31.8791 9.81421 31.354L0 21.5274L1.89915 19.6257ZM23.3058 28.5013L20.5381 25.7282L18.6323 27.623L22.3555 31.3536C22.6074 31.6059 22.9489 31.7478 23.3053 31.7478C23.6615 31.7478 24.0031 31.6063 24.255 31.354L42.9912 12.594L41.0921 10.6925L23.3058 28.5013Z"
                fill="#055087"
              />
            </svg>
          </span>
        </div>
        <h4 className="text-[16px] font-medium text-[#191919] text-center">{t("success.subtitle")}</h4>
        <p className="text-center font-normal text-[14px] text-[#8C8B9B] mb-[17px]">{t("success.content")}</p>
      </div>
      <CustomButton onClick={() => navigate("/")} text={t("success.button")}/>
    </div>
  );
};

export default SuccessPayment;
