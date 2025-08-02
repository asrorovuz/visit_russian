import { useState } from "react";
import logoBlack from "../../assets/logo-black.png";
import CustomButton from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymantPage = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [cardInfo, setCardInfo] = useState({
    number: "",
    date: "",
    cvv: "",
  });

  const formatCardNumber = (value: string) =>
    value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const formatCVV = (value: string) =>
    value.replace(/\D/g, "").slice(0, 3);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "number"
        ? formatCardNumber(value)
        : name === "date"
        ? formatDate(value)
        : name === "cvv"
        ? formatCVV(value)
        : value;

    setCardInfo((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const onPayment = () => {
    console.log(cardInfo);
    navigate("/success-payment")
  }

  return (
    <div className="relative z-20 top-[88px] px-5">
      <h2 className="text-[26px] font-bold leading-7 text-white text-center mx-auto max-w-[210px] mb-[18px]">
        {t("payment.title")}
      </h2>

      <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
        <p className="text-xs font-normal text-[#8C8B9B] text-center mb-[19px]">
           {t("payment.subtitle")} 23:59:46
        </p>

        <div className="flex justify-between mb-3">
          <div className="w-[69px] h-[33px]">
            <img
              className="w-full h-full object-cover"
              src={logoBlack}
              alt="logo"
            />
          </div>
          <div className="flex flex-col gap-y-2 items-end">
            <p className="text-[14px] font-normal text-[#191919]">
              ART12006 30.07.2025
            </p>
            <p className="text-[#055087] font-semibold text-[16px]">
              6 879,23 ₽
            </p>
          </div>
        </div>

        <div>
          <div className="w-full mb-3">
            <label className="mb-1 text-[14px] font-medium leading-[140%]">
              {t("payment.cardnumber")}
            </label>
            <input
              name="number"
              value={cardInfo.number}
              onChange={handleChange}
              type="text"
              placeholder="1234 5678 9012 3456"
              className="py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB]"
            />
          </div>

          <div className="flex gap-3 mb-3">
            <div className="w-1/2">
              <label className="mb-1 text-[14px] font-medium leading-[140%]">
                {t("payment.exprate")}
              </label>
              <input
                name="date"
                value={cardInfo.date}
                onChange={handleChange}
                type="text"
                placeholder="MM/YY"
                className="py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB]"
              />
            </div>

            <div className="w-1/2">
              <label className="mb-1 text-[14px] font-medium leading-[140%]">
                CVV:
              </label>
              <input
                name="cvv"
                value={cardInfo.cvv}
                onChange={handleChange}
                type="text"
                placeholder="123"
                className="py-2 px-2.5 w-full rounded-lg bg-[#F3F6FB]"
              />
            </div>
          </div>
        </div>
      </div>

      <CustomButton onClick={onPayment} text={"Pay Now"}/>
    </div>
  );
};

export default PaymantPage;
