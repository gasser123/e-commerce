import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../UI/FormContainer";
import { useAppDispatch } from "../../app/hook";
import cartSlice from "../../app/features/cartSlice";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");
   const {savePaymentMethod} = cartSlice.actions;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const submitHanlder: React.FormEventHandler<HTMLFormElement> = (event) =>{
     event.preventDefault();
     dispatch(savePaymentMethod(paymentMethod));
     navigate("/placeorder");
   }
  return (
    <FormContainer>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHanlder}>
        <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            className="my-2"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(event) => {
              setPaymentMethod(event.target.value);
            }}
          />
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Col>
      </Form>
    </FormContainer>
  );
};

export default Payment;
