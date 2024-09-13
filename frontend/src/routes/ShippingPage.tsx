import Shipping from "../components/shipping/Shipping";
import CheckOutSteps from "../components/UI/CheckOutSteps";
import { useAppSelector } from "../app/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ShippingPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  return (
    <>
      <CheckOutSteps step1 step2 />
      <Shipping />
    </>
  );
};

export default ShippingPage;
