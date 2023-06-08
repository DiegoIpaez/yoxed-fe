import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import ModalPostYox from "@/components/modals/ModalPostYox";

export const ProfileDropdownNavbar = () => {
  const [user, setUser] = useState<any>(null);
  const [show, setShow] = useState(false);

  const handleUser = () => {
    const auth = localStorage.getItem("auth");
    const user = auth ? JSON.parse(auth) : null;
    setUser(user);
    return user;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (user) return setShow(true);

    const token = handleUser();
    if (!token) return window.alert("No hay token");
    setShow(true);
  };

  const logout = () => localStorage.clear();

  return (
    <>
      <Nav>
        <NavDropdown
          onClick={() => handleUser()}
          title={<i className="fas fa-user ms-2"></i>}
          id="collasible-nav-dropdown"
          className="nav-link"
        >
          <NavDropdown.Item
            as={Link}
            href={user ? "/user" : "/login"}
            className="nav-link droopdown-nav ps-2"
            style={{ color: "black" }}
          >
            <i className="far fa-user me-1"></i>{" "}
            {user ? "MiCuenta" : "Iniciar sesion"}
          </NavDropdown.Item>
          {user?.usuario.rol === "ADMIN_ROLE" && (
            <NavDropdown.Item
              as={Link}
              className="nav-link droopdown-nav ps-2"
              href="/admin"
              style={{ color: "black" }}
            >
              <i className="fas fa-cogs"></i> Admin
            </NavDropdown.Item>
          )}
          {user && (
            <>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                <span
                  className="nav-link droopdown-nav"
                  style={{ color: "black" }}
                >
                  <i className="fas fa-sign-out-alt"></i> Salir
                </span>
              </NavDropdown.Item>
            </>
          )}
        </NavDropdown>
        <Nav.Link eventKey={2} className=" ps-1">
          <button
            className="btn btn-primary text-white"
            onClick={() => handleShow()}
          >
            YOX <i className="far fa-plus-square"></i>
          </button>
        </Nav.Link>
        <Nav.Link className="pt-3 ps-1"></Nav.Link>
        <Nav.Link className="pt-3 ps-1"></Nav.Link>
      </Nav>
      <ModalPostYox show={show} handleClose={handleClose} />
    </>
  );
};
