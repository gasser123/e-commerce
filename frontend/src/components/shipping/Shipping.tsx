import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../UI/FormContainer";
import ShippingAddress from "../../interfaces/ShippingAddress";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import cartSlice from "../../app/features/cartSlice";
const Shipping = () => {
  const { shippingAddress } = useAppSelector((state) => state.cart);
  const [shippingAddressState, setShippingAddressState] =
    useState<ShippingAddress>({
      address: shippingAddress.address,
      city: shippingAddress.city,
      country: shippingAddress.country,
      postalCode: shippingAddress.postalCode,
    });
  const dispatch = useAppDispatch();
  const { saveShippingAddress } = cartSlice.actions;
  const navigate = useNavigate();
  const submitHanlder: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress(shippingAddressState));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHanlder}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={shippingAddressState.address}
            onChange={(event) => {
              setShippingAddressState((currentState) => ({
                ...currentState,
                address: event.target.value,
              }));
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={shippingAddressState.city}
            onChange={(event) => {
              setShippingAddressState((currentState) => ({
                ...currentState,
                city: event.target.value,
              }));
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={shippingAddressState.postalCode}
            onChange={(event) => {
              setShippingAddressState((currentState) => ({
                ...currentState,
                postalCode: event.target.value,
              }));
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={shippingAddressState.country}
            onChange={(event) => {
              setShippingAddressState((currentState) => ({
                ...currentState,
                country: event.target.value,
              }));
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
