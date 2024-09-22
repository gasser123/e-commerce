import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { toast } from "react-toastify";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useCreateOrderMutation } from "../../app/features/ordersApiEndpoints";
import cartSlice from "../../app/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
const PlaceOrder = () => {
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const cart = useAppSelector((state) => state.cart);
  const { clearCartItems } = cartSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let errorView = null;
  if (error) {
    if (isFetchBaseQueryError(error)) {
      const { data } = error;
      if (isCustomErrorResponse(data)) {
        if (typeof data.message === "string") {
          errorView = <Message variant="danger">{data.message}</Message>;
        } else {
          errorView = (
            <Message variant="danger">
              {data.message.map((element, index) => (
                <p key={index}>{element}</p>
              ))}
            </Message>
          );
        }
      }
    } else if (error instanceof Error) {
      errorView = <Message variant="danger">{error.message}</Message>;
    }
  }
  const placeOrderHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const order = await createOrder(cart).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${order.id}`);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const { data } = error;
        if (isCustomErrorResponse(data)) {
          if (typeof data.message === "string") {
            toast.error(data.message);
          } else {
            data.message.forEach((element) => toast.error(element));
          }
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length > 0 ? (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroupItem key={item.id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              ) : (
                <Message>Your cart is empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>{errorView}</ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length <= 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
              {isLoading ? <LoadingSpinner /> : null}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
