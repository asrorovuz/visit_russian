import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Layout from "./layout";
import PaymantPage from "./pages/payment";
import "react-datepicker/dist/react-datepicker.css";
import SuccessPayment from "./pages/success-payment";
import FaildPayment from "./pages/faild-payment";
import Profile from "./pages/profile";
import NotFoundPage from "./pages/not-found";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymantPage />} />
        <Route path="/success-payment" element={<SuccessPayment />} />
        <Route path="/faild-payment" element={<FaildPayment />} />
        <Route path={"/profile"} element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
