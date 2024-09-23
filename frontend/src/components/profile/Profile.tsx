import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../../app/features/usersApiEndpoints";
import authSlice from "../../app/features/authSlice";
import {
  UpdateProfileDto,
  UpdateProfileDtoSchema,
} from "../../schemas/UpdateProfileDto.schema";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
  isQueryError,
} from "../../util/validate-error-type";
import { useGetMyOrdersQuery } from "../../app/features/ordersApiEndpoints";
import { FaTimes } from "react-icons/fa";
const Profile = () => {
  const [updateProfileInput, setUpdateProfileInfo] = useState<UpdateProfileDto>(
    {
      email: "",
      name: "",
      password: "",
    }
  );

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { setCredentials } = authSlice.actions;
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  useEffect(() => {
    if (userInfo) {
      setUpdateProfileInfo((currentState) => ({
        ...currentState,
        email: userInfo.email,
        name: userInfo.name,
      }));
    }
  }, [userInfo]);

  const submitHanlder: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const { success, error } =
        UpdateProfileDtoSchema.safeParse(updateProfileInput);
      if (!success && error) {
        const { issues } = error;
        const customError: FetchBaseQueryError = {
          status: 422,
          data: {
            message: issues.map((issue) => issue.message),
          },
        };

        throw customError;
      }

      let password = updateProfileInput.password;
      if (!updateProfileInput.password?.trim() && !confirmPassword.trim()) {
        password = undefined;
      } else {
        if (updateProfileInput.password !== confirmPassword) {
          throw new Error("passwords don't match");
        }
      }

      const res = await updateProfile({
        ...updateProfileInput,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
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
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHanlder}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={updateProfileInput.name}
              onChange={(e) => {
                setUpdateProfileInfo((currentState) => ({
                  ...currentState,
                  name: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={updateProfileInput.email}
              onChange={(e) => {
                setUpdateProfileInfo((currentState) => ({
                  ...currentState,
                  email: e.target.value,
                }));
              }}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={updateProfileInput.password}
              onChange={(e) => {
                setUpdateProfileInfo((currentState) => ({
                  ...currentState,
                  password: e.target.value,
                }));
              }}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-2"
            disabled={loadingUpdateProfile}
          >
            Update
          </Button>
          {loadingUpdateProfile ? <LoadingSpinner /> : null}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : error && isQueryError(error) ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : orders ? (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order.id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h2>No orders made yet.</h2>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
