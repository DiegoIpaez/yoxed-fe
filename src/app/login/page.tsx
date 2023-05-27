"use client"
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { postAuth } from "../../services/auth.service";
import ModalRegisUser from "../../components/modals/ModalRegisUser";

export default function Login() {
  const isMounted = useRef(true);

  const [formValue, setFormvalue] = useState({
    email: "",
    password: "",
  });

  const [btnDisable, setBtnDisable] = useState(false);

  const [login, setLogin] = useState({
    ok: false,
    msg: '',
  });

//   useEffect(() => {
//     if (login.token) {
//       localStorage.setItem("auth", JSON.stringify(login));
//       setTimeout(() => {
//         history.push("/");
//       }, 1000);
//     }
//   }, [login, history]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = ({ target }: any) => {
    setFormvalue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const handleSumbit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { email, password } = formValue;

    if (email && password) {
      setBtnDisable(true);
      if (isMounted.current) {
        postAuth(formValue).then((respuesta) => {
          setLogin(respuesta);

          setBtnDisable(false);

          setFormvalue({
            email: "",
            password: "",
          });
        });
      }
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container mt-5 mb-5">
      <div className="row mt-5">
        <div className="col-md-3 col-12"></div>
        <div className="col-md-6 col-12 login-form pt-4 pb-4">
          <div className="container">
            {/* Cuerpo Login*/}
            <div className="row text-white ">
              <Form onSubmit={(e) => handleSumbit(e)}>
                <h3 className="text-center"> Bienvenido a Yoxed</h3>

                <hr className="userlogin-hr mb-4" style={{ color: 'white' }} />
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
                  <Button
                    className="btn-registrar"
                    disabled={btnDisable}
                    type="submit"
                  >
                    Iniciar sesión
                  </Button>
                </div>
                <div className="text-center">
                  <button className="btn btn-registrar-login mt-2" onClick={handleShow}>
                    ¿No tienes una cuenta? Haz clic aquí
                  </button>
                </div>

                {login?.ok === false && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {login?.msg}
                  </div>
                )}
              </Form>
            </div>
            {/* Fin de Cuerpo login */}
          </div>
        </div>
        <div className="col-md-3 col-12"></div>
      </div>{" "}
      <div className="row mb-5 pb-3"></div>
      <ModalRegisUser show={show} handleClose={handleClose} />
    </div>
  );
}
