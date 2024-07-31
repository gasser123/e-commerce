import { Row, Col } from "react-bootstrap";
import products from "../../products";
import Product from "./Product";
const Products = () => {
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
