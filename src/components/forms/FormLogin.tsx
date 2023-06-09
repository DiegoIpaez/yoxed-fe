"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { postAuth } from "@/services/auth.service";
import ModalRegisUser from "@/components/modals/ModalRegisUser";
import { showMessage } from "@/utils/showMessage.util";

function FormLogin() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [formValue, setFormvalue] = useState({
    email: "",
    password: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = ({ target }: any) => {
    setFormvalue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await postAuth(formValue);
      if (!data.token)
        throw new Error("Error al autenticarse, intentelo de nuevo.");
      localStorage.setItem("auth", JSON.stringify(data));
      showMessage("success", "Felicidades, se ha autenticado correctamente!.");
      router.push("/");
    } catch (error) {
      showMessage(
        "error",
        "Hubo un error, verifique su correo y su contraseña."
      );
    }
  };

  return (
    <>
      <Form onSubmit={(e) => handleSumbit(e)}>
        <h3 className="text-center"> Bienvenido a Yoxed</h3>

        <hr className="userlogin-hr mb-4" style={{ color: "white" }} />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email:<span className="text-required">*</span>
          </Form.Label>
          <Form.Control
            value={formValue.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="user@gmail.com"
            className="inputLoginUser"
            maxLength={30}
            minLength={8}
          />
          <Form.Text className="text-muted ps-1">
            We ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 mb-4" controlId="formBasicPassword">
          <Form.Label>
            Contraseña:<span className="text-required">*</span>
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formValue.password}
            name="password"
            type="password"
            placeholder="Password"
            className="inputLoginUser"
            maxLength={20}
            minLength={6}
          />
        </Form.Group>

        <hr />
        <div className="d-grid gap-2">
          <Button className="btn-registrar" type="submit">
            Iniciar sesión
          </Button>
        </div>
        <div className="text-center">
          <button className="btn btn-registrar-login mt-2" type="button" onClick={() => handleShow()}>
            ¿No tienes una cuenta? Haz clic aquí
          </button>
        </div>
      </Form>
      <ModalRegisUser show={show} handleClose={handleClose} />
    </>
  );
}

export default FormLogin;
