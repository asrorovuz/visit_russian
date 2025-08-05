import { GoHomeFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation()
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-md flex justify-around items-center py-3">
      {/* Home */}
      <Link
        to="/"
        className="flex flex-col items-center text-gray-500 hover:text-button font-medium text-sm"
      >
        <GoHomeFill size={24} />
        <span>{t("footer.home")}</span>
      </Link>

      {/* Floating Button */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white p-3 rounded-full custom-shadow flex justify-center items-center">
        <button className="bg-gradient-to-r from-button to-blue-700 rounded-full w-14 h-14 shadow-lg">
          
        </button>
      </div>

      {/* Profile */}
      <Link
        to="/profile"
        className="flex flex-col items-center text-gray-500 hover:text-button font-medium text-sm"
      >
        <CgProfile size={24} />
        <span>{t("footer.profile")}</span>
      </Link>
    </footer>
  );
};

export default Footer;
