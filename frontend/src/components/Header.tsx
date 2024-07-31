import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/shop-solid.svg";
import classes from "./Header.module.css";
import { LinkContainer } from "react-router-bootstrap";
/* 
When the screen size is below the lg breakpoint, the Navbar.Toggle button will appear. 
Clicking this button will show or hide the Navbar.Collapse content, providing a responsive navigation experience.
aria-controls="basic-navbar-nav":

Description: The aria-controls attribute specifies the ID of the element that the toggle button controls. 
It helps assistive technologies (like screen readers) understand the relationship 
between the toggle button and the collapsible content.
Usage: 
The value of aria-controls should match the id attribute of the Navbar.Collapse component. 
This linkage ensures that when the toggle button is clicked, the correct content is shown or hidden.
*/
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="MyShop" className={classes.logo} />
              MyShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
