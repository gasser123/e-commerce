import Payment from "../components/payment/Payment";
import CheckOutSteps from "../components/UI/CheckOutSteps";
import { useAppSelector } from "../app/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ShippingAddressInputSchema } from "../schemas/ShippingAddressInput.schema";
const PaymentPage = () => {
  const { shippingAddress, cartItems } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if(cartItems.length <= 0){
        navigate("/cart");
    }
    if (!ShippingAddressInputSchema.safeParse(shippingAddress).success) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate, cartItems]);
  return (
    <>
      <CheckOutSteps step1 step2 step3 />
      <Payment />
    </>
  );
};

export default PaymentPage;
