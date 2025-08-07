import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CountryPopover from "../../ui/popover";
import Modal from "../../ui/modal";
import { countries } from "../../data/country";
import logo from "../../assets/logo.png";
import phoneIcon from "../../assets/phone.svg";
import enImg from "../../assets/en-lng.png";
import ruImg from "../../assets/ru-lng.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);
  const [country, setCountry] = useState("");
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // 🔄 Til o'zgarsa, bayroq va country ni yangilash
  useEffect(() => {
    const handleLangChange = (lng: string) => {
      setCurrentLang(lng);
      setCountry(lng === "en" ? "Uzbekistan" : "Узбекистан");
    };

    i18n.on("languageChanged", handleLangChange);

    // Boshlanishida ham chaqiramiz
    handleLangChange(i18n.language);

    // Cleanup
    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, [i18n]);

  // Dropdown tashqarisiga bosilsa yopish
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setToggle(false);
  };

  const handleCountrySelect = (e: any) => {
    setCountry(e.target.innerText);
    setIsOpen(false);
  };

  const getFlag = (lang: string) => {
    switch (lang) {
      case "ru":
        return ruImg;
      case "en":
      default:
        return enImg;
    }
  };

  return (
    <div className="px-4 flex justify-between items-center">
      {/* Logo + Country Selector */}
      <div className="relative flex items-center gap-x-[17px]">
        <div className="w-[68px] h-[33px]">
          <Link to={"/"}>
            <img className="w-full h-full object-cover" src={logo} alt="logo" />
          </Link>
        </div>

        <CountryPopover country={country} setIsOpen={setIsOpen} />

        <Modal title={t("navbar.title")} setIsOpen={setIsOpen} isOpen={isOpen}>
          <div className="max-h-[70vh] overflow-y-auto py-3">
            <ul
              onClick={handleCountrySelect}
              className="flex flex-col gap-y-1 text-gray-700"
            >
              {countries?.map((item: any, index: number) => (
                <li key={index}>{item?.[currentLang]}</li>
              ))}
            </ul>
          </div>
        </Modal>
      </div>

      {/* Phone + Language Selector */}
      <div className="relative z-10 flex items-center gap-x-3">
        <a className="w-8 h-8" href="tel:+998999999999">
          <img
            src={phoneIcon}
            alt="Phone Icon"
            className="w-full h-full object-cover"
          />
        </a>

        <div className="relative w-[27px] h-[18px]" ref={dropdownRef}>
          <button
            onClick={() => setToggle((prev) => !prev)}
            className="w-[27px] h-[18px] rounded overflow-hidden"
          >
            <img
              className="w-full h-full object-cover"
              src={getFlag(currentLang)}
              alt="language"
            />
          </button>

          {toggle && (
            <div className="absolute top-full right-0 mt-2 w-10 bg-white shadow-md rounded z-30">
              {currentLang !== "en" && (
                <div
                  onClick={() => handleLangChange("en")}
                  className="cursor-pointer p-1 hover:bg-gray-100"
                >
                  <img src={enImg} alt="English" />
                </div>
              )}
              {currentLang !== "ru" && (
                <div
                  onClick={() => handleLangChange("ru")}
                  className="cursor-pointer p-1 hover:bg-gray-100"
                >
                  <img src={ruImg} alt="Russian" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
