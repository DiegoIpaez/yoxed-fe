"use client";
import Link from "next/link";
import { Container, Navbar, Nav } from "react-bootstrap";
import { CategoryDropdown, ProfileDropdownNavbar } from "./components";

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <CategoryDropdown />
          <Navbar.Brand as={Link} href="/">
            Yoxed
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto mb-1"></Nav>
            <ProfileDropdownNavbar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
