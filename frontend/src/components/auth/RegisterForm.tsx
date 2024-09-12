import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../UI/FormContainer";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useRegisterMutation } from "../../app/features/usersApiEndpoints";
import authSlice from "../../app/features/authSlice";
import { toast } from "react-toastify";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
import { RegisterInputSchema } from "../../schemas/RegisterInput.schema";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useRegisterMutation();
  const { setCredentials } = authSlice.actions;
  const { userInfo } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const { success, error } = RegisterInputSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      });
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
      const res = await signup({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
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
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Register
        </Button>
        {isLoading ? <LoadingSpinner /> : null}
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterForm;
