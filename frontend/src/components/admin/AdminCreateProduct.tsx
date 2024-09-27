import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../UI/FormContainer";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../app/features/productsApiEndpoints";
import {
  CreateProductDto,
  CreateProductDtoSchema,
} from "../../schemas/CreateProductDto.schema";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
const AdminCreateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [productInput, setProductInput] = useState({
    name: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const productInputDto: CreateProductDto = {
        ...productInput,
        price: parseFloat(productInput.price),
        countInStock: parseInt(productInput.countInStock),
      };
      const { success, error } =
        CreateProductDtoSchema.safeParse(productInputDto);
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
      if (!image) {
        throw new Error("Uploading an image is required");
      } else if (
        image.type !== "image/png" &&
        image.type !== "image/jpg" &&
        image.type !== "image/jpeg"
      ) {
        throw new Error("File is not of type image");
      }
      const formData = new FormData();
      let key: keyof CreateProductDto;
      for (key in productInputDto) {
        formData.append(key, String(productInputDto[key]));
      }
      formData.append("image", image);
      await createProduct(formData).unwrap();
      toast.success("Product created succesfully");
      navigate("/admin/products");
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
      <Link to="/admin/products" className="btn btn-secondary my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {isLoading ? <LoadingSpinner /> : null}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={productInput.name}
              onChange={(e) =>
                setProductInput((currentState) => ({
                  ...currentState,
                  name: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price in $"
              value={productInput.price}
              step="0.01"
              min="0"
              onChange={(e) =>
                setProductInput((currentState) => ({
                  ...currentState,
                  price: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const file = target.files ? target.files[0] : null;
                setImage(file);
              }}
            />
          </Form.Group>
          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={productInput.brand}
              onChange={(e) =>
                setProductInput((currentState) => ({
                  ...currentState,
                  brand: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Count"
              value={productInput.countInStock}
              onChange={(e) =>
                setProductInput((currentState) => ({
                  ...currentState,
                  countInStock: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={productInput.category}
              onChange={(e) =>
                setProductInput((currentState) => ({
                  ...currentState,
                  category: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={productInput.description}
              onChange={(e) =>
                setProductInput((currentState) => ({
                  ...currentState,
                  description: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AdminCreateProduct;
