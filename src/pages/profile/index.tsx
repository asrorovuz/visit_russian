import { IoChevronDownSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  return (
    <div className="relative z-20 top-[88px] px-5">
      <h2 className="text-[26px] font-bold leading-7 text-white text-center mx-auto max-w-[210px] mb-[18px]">
        {t("profile.title")}
      </h2>

      <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
        <div className="flex items-center gap-x-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#dbeafe] text-blue-600 text-3xl flex items-center justify-center">
            <FaRegUser />
          </div>
          <div className="flex gap-y-0.5 flex-col">
            <h4 className="text-lg text-gray-800 font-semibold">User Name</h4>
            <p className="text-gray-600 text-[14px]">exam@gmail.com</p>
          </div>
        </div>
        <div className="flex justify-between items-center cursor-pointer border-b border-gray-300 text-gray-600 py-3 mb-5 text-[16px]">
          {t("profile.personal")}{" "}
          <span className="-rotate-90">
            <IoChevronDownSharp />
          </span>
        </div>
        <div className="flex justify-between items-center cursor-pointer border-b border-gray-300 text-gray-600 py-3 mb-5 text-[16px]">
          {t("profile.history")}
          <span className="-rotate-90">
            <IoChevronDownSharp />
          </span>
        </div>
        <div className="flex justify-between items-center cursor-pointer border-b border-gray-300 text-gray-600 py-3 mb-5 text-[16px]">
          {t("profile.settings")}
          <span className="-rotate-90">
            <IoChevronDownSharp />
          </span>
        </div>
        <div className="flex justify-between items-center cursor-pointer text-gray-600 mb-5 text-[16px]">
          {t("profile.support")}
          <span className="-rotate-90">
            <IoChevronDownSharp />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
