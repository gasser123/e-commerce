import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/shop-solid.svg";
import classes from "./Header.module.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { useLogoutMutation } from "../app/features/usersApiEndpoints";
import authSlice from "../app/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../util/validate-error-type";
import SearchBox from "./UI/SearchBox";
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
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [signout] = useLogoutMutation();
  const { logout } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler: React.MouseEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();
    try {
      await signout().unwrap();
      dispatch(logout());
      navigate("/login");
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
              <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 ? (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, element) => acc + element.qty, 0)}
                    </Badge>
                  ) : null}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin ? (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
