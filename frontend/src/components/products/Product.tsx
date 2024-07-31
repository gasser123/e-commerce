import { Card } from "react-bootstrap";
import IProduct from "../../interfaces/product.interface";
import { Link } from "react-router-dom";
interface Props {
  product: IProduct;
  children?: React.ReactNode;
}
const Product: React.FC<Props> = (props) => {
  const { product } = props;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
