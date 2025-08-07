import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen  flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          {t("notFound.title")}
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          {t("notFound.description")}
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
