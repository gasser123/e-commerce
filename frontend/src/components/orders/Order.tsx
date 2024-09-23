import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// import {Button} from "react-bootstrap";
import Message from "../UI/Message";
import { OrderJoins } from "../../schemas/OrderJoins.schema";
import {
  PayPalButtons,
  usePayPalScriptReducer,
  ScriptReducerAction,
  DISPATCH_ACTION,
  SCRIPT_LOADING_STATE,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import {
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../../app/features/ordersApiEndpoints";
import { toast } from "react-toastify";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { PaymentResultDto } from "../../schemas/PaymentResult.dto.schema";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
interface Props {
  order: OrderJoins;
  refetch: () => unknown;
  children?: React.ReactNode;
}
const Order: React.FC<Props> = (props) => {
  const { order, refetch } = props;
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const {
    data: payPalClientInfo,
    isLoading: loadingPayPalClientId,
    error: errorPayPalClient,
  } = useGetPayPalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  // const onApproveTestHandler: React.MouseEventHandler<
  //   HTMLButtonElement
  // > = async () => {
  //   try {
  //     const paymentResult: PaymentResultDto = {
  //       id: "test",
  //       payer: { email_address: "test@gmail.com" },
  //       status: "test",
  //       update_time: "test",
  //     };
  //     await payOrder({ id: order.id, data: paymentResult });
  //     refetch();
  //     toast.success("Payment successful");
  //   } catch (error) {
  //     if (isFetchBaseQueryError(error)) {
  //       const { data } = error;
  //       if (isCustomErrorResponse(data)) {
  //         if (typeof data.message === "string") {
  //           toast.error(data.message);
  //         } else {
  //           data.message.forEach((element) => toast.error(element));
  //         }
  //       }
  //     } else if (error instanceof Error) {
  //       toast.error(error.message);
  //     }
  //   }
  // };
  const onApproveHandler: PayPalButtonsComponentProps["onApprove"] = async (
    _data,
    actions
  ) => {
    return actions.order?.capture().then(async (details) => {
      try {
        const paymentResult: PaymentResultDto = {
          id: details.id,
          payer: {
            email_address: details.payment_source?.paypal?.email_address,
          },
          status: details.status,
          update_time: details.update_time,
        };
        await payOrder({ id: order.id, data: paymentResult });
        refetch();
        toast.success("Payment successful");
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
    });
  };
  const createOrderHandler: PayPalButtonsComponentProps["createOrder"] = async (
    _data,
    actions
  ) => {
    return actions.order
      .create({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              value: order.totalPrice.toString(),
              currency_code: "USD",
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };
  const onErrorHandler: PayPalButtonsComponentProps["onError"] = async (
    err
  ) => {
    if ("message" in err && typeof err.message === "string") {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (!errorPayPalClient && !loadingPayPalClientId && payPalClientInfo) {
      const loadPayPalScript = async () => {
        const scriptReducerAction: ScriptReducerAction = {
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: {
            clientId: payPalClientInfo.clientId,
            currency: "USD",
            intent: "capture",
          },
        };
        paypalDispatch(scriptReducerAction);
        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [
    errorPayPalClient,
    loadingPayPalClientId,
    order,
    payPalClientInfo,
    paypalDispatch,
  ]);
  return (
    <>
      <h1>Order {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user?.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user?.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems?.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={1}>
                      <Image
                        fluid
                        rounded
                        alt="item image"
                        src={item.product.image}
                      />
                    </Col>
                    <Col>
                      <Link to={`/products/${item.product.id}`}>
                        {item.product.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.product.price} = $
                      {item.qty * item.product.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {order.isPaid ? null : (
                <ListGroup.Item>
                  {loadingPay ? <LoadingSpinner /> : null}
                  {isPending ? (
                    <LoadingSpinner />
                  ) : (
                    <div>
                      {/*<Button
                        style={{ marginBottom: "10px" }}
                        onClick={onApproveTestHandler}
                      >
                        Test Pay Order
                      </Button>*/}
                      <div>
                        <PayPalButtons
                          createOrder={createOrderHandler}
                          onApprove={onApproveHandler}
                          onError={onErrorHandler}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {/* mark as delivered placeholder */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
