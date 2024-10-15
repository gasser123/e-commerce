import Shipping from "../components/shipping/Shipping";
import CheckOutSteps from "../components/UI/CheckOutSteps";
import { useAppSelector } from "../app/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Meta from "../components/Meta";
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
      <Meta title="Checkout" />
      <CheckOutSteps step1 step2 />
      <Shipping />
    </>
  );
};

export default ShippingPage;
