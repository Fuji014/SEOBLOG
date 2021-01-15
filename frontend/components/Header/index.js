import { useState } from "react";

// component
import SearchBox from "../../components/SearchBox";

// env
import { APP_NAME } from "../../config";

// link
import Link from "next/link";
//router
import { Router, useRouter } from "next/router";

// bootstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// redux
import { useDispatch, useSelector } from "react-redux";

// actions
import { isAuth, userSignOut } from "../../redux/actions/auth";

// nprogress
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Header = () => {
  const dispatch = useDispatch();

  // user state
  const userState = useSelector((state) => state.auth);
  const { userLogged } = userState;

  const router = useRouter();

  // useState
  const [isOpen, setIsOpen] = useState(false);

  // functions
  const toggle = () => setIsOpen(!isOpen);

  const navBrandHandle = () => {
    router.push("/");
  };

  // debug area

  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Container>
        <NavbarBrand style={{ cursor: "pointer" }} onClick={navBrandHandle}>
          {APP_NAME}
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isAuth() ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {userLogged.userInfo.name}
                </DropdownToggle>
                <DropdownMenu right>
                  {isAuth().role === 0 && (
                    <Link href="/user">
                      <DropdownItem>Dashboard</DropdownItem>
                    </Link>
                  )}
                  {isAuth().role === 1 && (
                    <>
                      <Link href="/admin">
                        <DropdownItem>Dashboard</DropdownItem>
                      </Link>
                      <Link href="/admin/blog">
                        <DropdownItem>Blog</DropdownItem>
                      </Link>
                      <Link href="/admin/category-tag">
                        <DropdownItem>Category-Tag</DropdownItem>
                      </Link>
                    </>
                  )}
                  <DropdownItem divider />
                  <DropdownItem onClick={() => dispatch(userSignOut())}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <>
                <NavItem>
                  <Link href="/signin" passHref>
                    <NavLink
                      className={router.pathname === "/signin" ? "active" : ""}
                    >
                      Signin
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup" passHref>
                    <NavLink
                      className={router.pathname === "/signup" ? "active" : ""}
                    >
                      Signup
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
          <SearchBox />
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
