import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { useEffect } from "react";
import { ShippingAddressInputSchema } from "../schemas/ShippingAddressInput.schema";
import PlaceOrder from "../components/orders/PlaceOrder";
import CheckOutSteps from "../components/UI/CheckOutSteps";
const PlaceOrderPage = () => {
  const { shippingAddress, paymentMethod } = useAppSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!ShippingAddressInputSchema.safeParse(shippingAddress).success) {
      navigate("/shipping");
    }

    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, navigate, paymentMethod]);
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <PlaceOrder />
    </>
  );
};

export default PlaceOrderPage;
