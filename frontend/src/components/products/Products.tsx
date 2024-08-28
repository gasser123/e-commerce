import { Row, Col } from "react-bootstrap";
import Product from "./Product";
import { Product as IProduct } from "../../schemas/Product.schema";
interface Props{
products: IProduct[]; 
}
const Products: React.FC<Props> = (props) => {
  const {products} = props;
  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default Products;
