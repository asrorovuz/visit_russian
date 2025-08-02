import { useState } from "react";
import Calculate from "../../components/calculate";
import Contract from "../../components/contract";
import TourCard from "../../components/tour-card";
import CustomButton from "../../ui/button";
import PoliceCard from "../../components/police-card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const [visableCard, setVisableCard] = useState(false);
  const [tourists, setTourists] = useState<any>([]);
  const [calcData, setCalcData] = useState({
    startDate: undefined,
    endDate: undefined,
    dayCheck: false,
    travelers: [],
    police: {},
  });

  const removeTraveler = (index: number) => {
    setCalcData((prev: any) => {
      if (prev.travelers.length <= 1) return prev; // Bitta qolsa o'chirmaydi
      const updated = [...prev.travelers];
      updated.splice(index, 1);
      return { ...prev, travelers: updated };
    });
  };

  const addATraveler = () => {
    setCalcData((prev: any) => ({
      ...prev,
      travelers: [
        ...prev.travelers,
        {
          id: Date.now(),
          age: null,
          firstname: "",
          lastname: "",
          isBuy: false,
        },
      ],
    }));
  };

  return (
    <div className="relative z-20 top-[88px] flex flex-col gap-y-10">
      <Calculate
        calcData={calcData}
        setCalcData={setCalcData}
        tourists={tourists}
        setTourists={setTourists}
        setVisableCard={setVisableCard}
      />
      {calcData?.travelers?.length ? <Contract /> : ""}
      {calcData?.travelers?.length ? (
        <div className="flex flex-col p-5 gap-y-[15px]">
          {calcData?.travelers?.map((item: any, index: number) => (
            <TourCard
              setCalcData={setCalcData}
              key={item?.id}
              item={item}
              index={index}
              onRemove={calcData.travelers.length > 1 ? removeTraveler : null}
            />
          ))}
          <CustomButton onClick={addATraveler} text={t("traveler.button")} />
        </div>
      ) : (
        ""
      )}
      {visableCard ? (
        <div className="px-5">
          <PoliceCard item={calcData?.police} setCalcData={setCalcData} />
        </div>
      ) : (
        ""
      )}
      {visableCard ? (
        <div className="px-5">
          <Link
            className="bg-button block py-[16px] px-2 rounded-2xl"
            to={"/payment"}
          >
            <div className="text-center text[18px] font-bold text-white leading-6 mb-[11px]">
              {t("police")} (69,00 €)
            </div>
            <div className="text-center text-white text-[15px] font-semibold leading-6 ">
              6 879,23 rub.
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="px-5 text-[13px] font-normal text-[#8C8B9B] text-center">
        {t("footer.pol1")} {" "}
        <a
          className="underline"
          href="https://www.solidtravel.shop/include/files/Personal%20Data%20Processing%20Policy.pdf"
        >
          {t("footer.pol2")} <br /> {t("footer.pol3")} <br /> {t("footer.pol4")}
        </a>
      </div>
    </div>
  );
};

export default HomePage;
