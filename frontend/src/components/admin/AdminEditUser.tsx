import { Link, useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../app/features/usersApiEndpoints";
import { UserInfo } from "../../schemas/UserInfo.schema";
import {
  AdminUpdateUserDto,
  AdminUpdateUserDtoSchema,
} from "../../schemas/AdminUpdateUserDto.schema";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
import FormContainer from "../UI/FormContainer";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Button, Form } from "react-bootstrap";

interface Props {
  user: UserInfo;
  children?: React.ReactNode;
}
const AdminEditUser: React.FC<Props> = (props) => {
  const { user } = props;
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [userInput, setUserInput] = useState<Omit<AdminUpdateUserDto, "id">>({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const userInputDto: AdminUpdateUserDto = {
        ...userInput,
        id: user.id,
      };
      const { success, error } =
        AdminUpdateUserDtoSchema.safeParse(userInputDto);
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

      await updateUser(userInputDto).unwrap();
      toast.success("User updated succesfully");
      navigate("/admin/users");
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
      <Link to="/admin/users" className="btn btn-secondary my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isLoading ? <LoadingSpinner /> : null}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={userInput.name}
              onChange={(e) =>
                setUserInput((currentState) => ({
                  ...currentState,
                  name: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userInput.email}
              onChange={(e) =>
                setUserInput((currentState) => ({
                  ...currentState,
                  email: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="isAdmin" className="my-2">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={userInput.isAdmin}
              onChange={(e) => {
                setUserInput((currentState) => ({
                  ...currentState,
                  isAdmin: e.target.checked,
                }));
              }}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AdminEditUser;
