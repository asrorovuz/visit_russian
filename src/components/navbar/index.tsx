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
  const lang = i18n.language;
  const [country, setCountry] = useState("");

  const onChangeCountry = (e: any) => {
    setCountry(e.target.innerText);
    setIsOpen(false);
  };

  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setToggle(false);
  };

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

  useEffect(() => {
    setCountry(lang === "en" ? "Uzbekistan" : "Узбекистан")
  }, [lang])

  return (
    <div className="px-4 flex justify-between items-center">
      <div className="relative flex items-center gap-x-[17px]">
        <div className="w-[68px] h-[33px]">
          <Link to={"/"}>
            <img className="w-full h-full object-cover" src={logo} alt="logo" />
          </Link>
        </div>

        <CountryPopover country={country} setIsOpen={setIsOpen} />
        <Modal
          title={t("navbar.title")}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        >
          <div className="max-h-[70vh] overflow-y-auto py-3">
            <ul
              onClick={onChangeCountry}
              className="flex flex-col gap-y-1 text-gray-700"
            >
              {countries?.map((item: any, index: number) => (
                <li key={index}>{item?.[lang]}</li>
              ))}
            </ul>
          </div>
        </Modal>
      </div>
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
              src={lang === "en" ? enImg : ruImg}
              alt="language"
            />
          </button>

          {toggle && (
            <div className="absolute top-full right-0 mt-2 w-10 bg-white shadow-md rounded z-30">
              {lang !== "en" && (
                <div
                  onClick={() => handleLangChange("en")}
                  className="cursor-pointer p-1 hover:bg-gray-100"
                >
                  <img src={enImg} alt="English" />
                </div>
              )}
              {lang !== "ru" && (
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
