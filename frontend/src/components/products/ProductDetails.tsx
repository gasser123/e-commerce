import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../rating/Rating";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cartSlice from "../../app/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useCreateReviewMutation } from "../../app/features/reviewsApiEndpoints";
import { toast } from "react-toastify";
import { ProductJoins } from "../../schemas/ProductJoins.schema";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  CreateReviewDto,
  CreateReviewDtoSchema,
} from "../../schemas/CreateReviewDto.schema";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
interface Props {
  product: ProductJoins;
}
const ProductDetails: React.FC<Props> = (props) => {
  const { product } = props;
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { addToCart } = cartSlice.actions;
  const addTOCartHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const createReviewDto: CreateReviewDto = {
        rating,
        comment,
        productId: product.id,
      };
      const { success, error } =
        CreateReviewDtoSchema.safeParse(createReviewDto);
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
      await createReview(createReviewDto).unwrap();
      toast.success("review added successfully");
      setRating(0);
      setComment("");
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
      <Link className="btn btn-secondary my-3" to="..">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 ? (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(event) => {
                          setQty(Number(event.target.value));
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map(
                          (element) => (
                            <option key={element + 1} value={element + 1}>
                              {element + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ) : null}

              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addTOCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>
          {(product.reviews && product.reviews.length === 0) ||
          !product.reviews ? (
            <Message>No Reviews</Message>
          ) : (
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review.id}>
                  <strong>{review.user ? review.user.name : null}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Write A Customer Review</h2>
              {isLoading ? <LoadingSpinner /> : null}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => {
                        setRating(Number(e.target.value));
                      }}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment" className="my-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button disabled={isLoading} type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">Sign in </Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
