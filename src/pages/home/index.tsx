import { useEffect, useRef, useState } from "react";
import Calculate from "../../components/calculate";
import Contract from "../../components/contract";
import TourCard from "../../components/tour-card";
import CustomButton from "../../ui/button";
import PoliceCard from "../../components/police-card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visableCard, setVisableCard] = useState(false);
  const [tourists, setTourists] = useState<any>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [calcData, setCalcData] = useState({
    startDate: undefined,
    endDate: undefined,
    dayCheck: false,
    travelers: [],
    police: {},
  });
  const cardSectionRef = useRef<HTMLDivElement>(null);

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
  const validateCalcData = (data: any, setError: (val: boolean) => void) => {
    let isValid = true;

    // Travelers check
    if (!Array.isArray(data.travelers) || data.travelers.length === 0) {
      isValid = false;
    } else {
      for (const traveler of data.travelers) {
        if (!traveler.firstname?.trim() || !traveler.lastname?.trim()) {
          isValid = false;
          break;
        }
      }
    }

    // Police check
    const police = data.police;
    if (
      !police ||
      !police.firstname?.trim() ||
      !police.lastname?.trim() ||
      !police.birthOfDate ||
      !Array.isArray(police.email) ||
      police.email.length === 0 ||
      !police.email[0]?.value?.trim()
    ) {
      isValid = false;
    }

    setError(!isValid);
    return isValid;
  };

  const onSubmit = () => {
    setLoading(true)
    const isValid = validateCalcData(calcData, setError);
    setLoading(false)
    if (!isValid) return;

    setLoading(false)
    navigate("/payment");
  };

  useEffect(() => {
    if (visableCard) {
      setTimeout(() => {
        cardSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [visableCard]);
  return (
    <div className="relative z-20 top-[88px] flex flex-col gap-y-10">
      <Calculate
        calcData={calcData}
        setCalcData={setCalcData}
        tourists={tourists}
        setTourists={setTourists}
        setVisableCard={setVisableCard}
      />
      {calcData?.travelers?.length ? (
        <div ref={cardSectionRef}>
          <Contract />
        </div>
      ) : (
        ""
      )}
      {calcData?.travelers?.length ? (
        <div className="flex flex-col p-5 gap-y-[15px]">
          {calcData?.travelers?.map((item: any, index: number) => (
            <TourCard
              setCalcData={setCalcData}
              error={error}
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
          <PoliceCard error={error} item={calcData?.police} setCalcData={setCalcData} />
        </div>
      ) : (
        ""
      )}
      {visableCard ? (
        <div className="px-5">
          <button
            className="w-full bg-button block py-[16px] px-2 rounded-2xl"
            disabled={loading}
            onClick={onSubmit}
          >
            <div className="text-center text[18px] font-bold text-white leading-6 mb-[11px]">
              {loading ? "Loading..." : <>{t("police")} (69,00 €)</>}
            </div>
            <div className="text-center text-white text-[15px] font-semibold leading-6 ">
              6 879,23 rub.
            </div>
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="px-5 text-[13px] font-normal text-[#8C8B9B] text-center pb-20">
        {t("footer.pol1")}{" "}
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
