import React, { useState } from "react";
import { postUsuario } from "../../services/user.service";
import { Modal, Button } from "react-bootstrap";
import { showMessage } from "@/utils/showMessage.util";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const INITIAL_VALUE = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  rol: "USER_ROLE",
}

const ModalRegisUser = ({ show, handleClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState(INITIAL_VALUE);

  const handleChange = (e: any) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      await postUsuario(formValue);
      setFormValue(INITIAL_VALUE)
      handleClose();
    } catch (error) {
      showMessage(
        "warning",
        "Hubo un error, intentelo de nuevo mas tarde."
      );
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <div className="cuerpoModal">
          <Modal.Header className="tituloModal">
            <Modal.Title className="text-secondary">
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              Registro
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group mb-3">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Ej: Pedro"
                  required
                  value={formValue.nombre}
                  onChange={handleChange}
                  maxLength={20}
                  minLength={1}
                />
              </div>
              <div className="form-group mb-3">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  className="form-control"
                  placeholder="Ej: Perez"
                  required
                  value={formValue.apellido}
                  onChange={handleChange}
                  maxLength={20}
                  minLength={1}
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="pedroperez@gmail.com"
                  required
                  value={formValue.email}
                  onChange={handleChange}
                  maxLength={40}
                  minLength={6}
                />
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  autoComplete="off"
                  required
                  value={formValue.password}
                  onChange={handleChange}
                  maxLength={20}
                  minLength={6}
                />
              </div>
              {/*  */}
            </Modal.Body>
            <Modal.Footer>
              <div className="container">
                <div className="row mb-2">
                  <Button
                    className="btn-registrar"
                    type="submit"
                    disabled={loading}
                  >
                    Registrarse
                  </Button>
                </div>
                <div className="row">
                  <Button className="btn-registrar-login" onClick={handleClose}>
                    ¿Ya tienes una cuenta? Haz clic aquí.
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalRegisUser;
