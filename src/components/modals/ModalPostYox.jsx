import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getCategorias } from "../../helpers/categorias";
import { postYox, getYox } from "../../helpers/yoxs";

const ModalPostYox = ({ show, handleClose, actualizar }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    titulo: "",
    descripcion: "",
    url: "",
    categoria: "",
  });

  useEffect(() => {
    getCategorias().then((respuesta) => {
      setCategorias(respuesta.categorias);
    });
  }, []);

  useEffect(() => {
    setFormValue({
      titulo: "",
      descripcion: "",
      url: "",
      categoria: "",
    });
    if (actualizar) {
      getYox(actualizar).then((respuesta) => {
        setFormValue({
          titulo: respuesta.yox.titulo,
          descripcion: respuesta.yox.descripcion,
          url: respuesta.yox.url,
          categoria: respuesta.yox.url,
        });
      });
    }
  }, [actualizar]);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //-----------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    postYox(formValue).then((respuesta) => {
      if (respuesta.errors) {
        setLoading(false);
        return window.alert(respuesta.errors[0].msg);
      }
      if (respuesta.msg) {
        window.alert(respuesta.msg);
      }
      setLoading(false);
      setFormValue({
        titulo: "",
        descripcion: "",
        url: "",
        categoria: "",
      });
      handleClose();
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <div className="bg-dark text-white ">
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group mb-3">
                <label>Titulo</label>
                <input
                  type="text"
                  name="titulo"
                  className="form-control"
                  placeholder="Voxed volvio.."
                  required
                  value={formValue.titulo}
                  onChange={handleChange}
                  maxLength={55}
                  minLength={1}
                />
              </div>
              <div className="form-group mb-3">
                <label>Url:img</label>
                <input
                  type="text"
                  name="url"
                  className="form-control"
                  placeholder="www.img.com"
                  required
                  value={formValue.url}
                  onChange={handleChange}
                  maxLength={1000}
                  minLength={1}
                />
              </div>
              <div className="form-group mb-3">
                <label>Categorias</label>
                <select
                  className="form-select"
                  name="categoria"
                  value={formValue.categoria}
                  onChange={handleChange}
                  required
                >
                  <option defaultValue="">Elige una categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label>Descripcion</label>
                <textarea
                  type="text"
                  name="descripcion"
                  className="form-control"
                  placeholder="Escriba el redactaso.."
                  required
                  value={formValue.descripcion}
                  onChange={handleChange}
                  maxLength={100}
                  minLength={5}
                />
              </div>
              {/*  */}
              <div className="container mt-4">
                <div className="row mb-1">
                  <Button variant="success" type="submit" disabled={loading}>
                    Enviar yox
                  </Button>
                </div>

                <div className="row">
                  <Button variant="danger" onClick={handleClose}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalPostYox;
