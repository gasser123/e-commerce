import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../UI/FormContainer";
import { toast } from "react-toastify";
import { Product } from "../../schemas/Product.schema";
import { useUpdateProductMutation } from "../../app/features/productsApiEndpoints";
import {
  UpdateProductDto,
  UpdateProdutDtoSchema,
} from "../../schemas/UpdateProductDto.schema";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
interface Props {
  product: Product;
  children?: React.ReactNode;
}
const AdminEditProduct: React.FC<Props> = (props) => {
  const { product } = props;
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [productInput, setProductInput] = useState({
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    countInStock: `${product.countInStock}`,
    description: product.description,
    price: `${product.price}`,
  });
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const productInputDto: UpdateProductDto = {
        ...productInput,
        price: parseFloat(productInput.price),
        countInStock: parseInt(productInput.countInStock),
      };
      const { success, error } =
        UpdateProdutDtoSchema.safeParse(productInputDto);
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

      const formData = new FormData();
      let key: keyof UpdateProductDto;
      for (key in productInputDto) {
        formData.append(key, String(productInputDto[key]));
      }

      if (image) {
        if (
          image.type !== "image/png" &&
          image.type !== "image/jpg" &&
          image.type !== "image/jpeg"
        ) {
          throw new Error("File is not of type image");
        }
        formData.append("image", image);
      }
      await updateProduct(formData).unwrap();
      toast.success("Product updated succesfully");
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
        <h1>Edit Product</h1>
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
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AdminEditProduct;
