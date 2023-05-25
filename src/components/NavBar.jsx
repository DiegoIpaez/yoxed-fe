import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { getCategorias } from "../services/category.service";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import ModalPostYox from "./modals/ModalPostYox";

const NavBar = () => {
  const [categorias, setCategorias] = useState([]);
  const [actualizar, setActualizar] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getCategorias().then((res) => {
      setCategorias(res.categorias);
    });
  }, []);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          {/* Boton desplegable */}
          <Navbar.Brand>
            <NavDropdown
              title={<i className="fas fa-list-ul text-white"></i>}
              id="collasible-nav-dropdown"
            >
              {categorias.map((categoria) => (
                <NavDropdown.Item
                  as={Link}
                  to={`/categId/${categoria._id}`}
                  key={categoria._id}
                >
                  {categoria.nombre}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Navbar.Brand>
          {/* Boton desplegable */}
          <Navbar.Brand as={Link} to="/">
            Yoxed
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto mb-1"></Nav>
            <Nav>
              {/* Boton desplegable */}
              <NavDropdown
                title={<i className="fas fa-user ms-2"></i>}
                id="collasible-nav-dropdown"
                className="nav-link"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/user"
                  className="nav-link droopdown-nav ps-2"
                  style={{ color: "black" }}
                >
                  <i className="far fa-user me-1"></i> MiCuenta
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  className="nav-link droopdown-nav ps-2"
                  to="/admin"
                  style={{ color: "black" }}
                >
                  <i className="fas fa-cogs"></i> Admin
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  <span
                    className="nav-link droopdown-nav"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Salir
                  </span>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link eventKey={2} className=" ps-1">
                <button
                  className="btn btn-primary text-white"
                  onClick={() => {
                    setActualizar("");
                    handleShow();
                  }}
                >
                  YOX <i className="far fa-plus-square"></i>
                </button>
              </Nav.Link>
              <Nav.Link className="pt-3 ps-1"></Nav.Link>
              <Nav.Link className="pt-3 ps-1"></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalPostYox
        show={show}
        handleClose={handleClose}
        actualizar={actualizar}
      />
    </>
  );
};
export default NavBar;
