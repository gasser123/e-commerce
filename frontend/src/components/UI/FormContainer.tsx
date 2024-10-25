import { Container, Row, Col } from "react-bootstrap";
interface Props{
children?: React.ReactNode;    
}
const FormContainer: React.FC<Props> = (props) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
         {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
