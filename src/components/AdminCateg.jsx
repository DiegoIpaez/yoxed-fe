import React, { useEffect, useState } from "react";
import { getCategorias, deleteCategoria } from "../helpers/categorias";

import BotonPag from "../components/BotonPag";
import ModalCateg from "../components/modals/ModalCateg";

const AdminCateg = () => {
  const [actualizar, setActualizar] = useState("");

  const [categorias, setCategorias] = useState({
    datos: [],
    loading: true,
  });

  const [pagina, setPagina] = useState(0);
  const [totPag, setTotpag] = useState(0);

  const [show, setShow] = useState(false);

  useEffect(() => {
    getCategorias().then((respuesta) => {
      setCategorias({
        datos: respuesta.categorias,
        loading: false,
      });
      setTotpag(respuesta.Total);
    });
  }, []);

  useEffect(() => {
    updateDatos(pagina);
  }, [pagina, show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDatos = (pag) => {
    getCategorias(pag).then((respuesta) => {
      setCategorias({
        datos: respuesta.categorias,
        loading: false,
      });
    });
  };

  //---------------------------
  const borrarCategoria = (uid) => {
    let categ = categorias.datos.find((categoria) => {
      return categoria._id === uid;
    });

    let validar = window.confirm(
      `Esta seguro que quiere inactivar ${categ.nombre} de categorías?`
    );
    if (validar) {
      deleteCategoria(uid).then((respuesta) => {
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        updateDatos(pagina);
      });
    }
  };

  return (
    <div className="container">
      {/* Titulo */}
      <div className="row ">
        <div className="col">
          <h1>Categorias</h1>
        </div>
      </div>
      {/* Fin Titulo */}
      {/* ------------------------------ */}
      {/* Titulo Tabla */}
      <div
        className="row mb-1 text-white"
        style={{
          background: "black",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <div className="col-10 pt-3 pb-3">Nombre</div>
        <div className="col-2 mt-2 text-center">
          <button
            className="btn"
            onClick={() => {
              setActualizar("");
              handleShow();
            }}
          >
            <i className="fas fa-user-plus text-white"></i>
          </button>
        </div>
      </div>
      {/* Fin de Titulo Tabla */}
      {/* ------------------------------ */}
      {/* Cuerpo Tabla */}
      {categorias.datos.map((categoria) => (
        <div className="row" key={categoria._id}>
          <div className="col-md-5 col-6 mt-2">{categoria.nombre}</div>
          <div className="col-md-5 col-2 mt-2"></div>
          <div className="col-md-1 col-2 mt-1">
            <button
              className="btn btn-primary"
              onClick={() => {
                setActualizar(categoria._id);
                handleShow();
              }}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
          <div className="col-md-1 col-2 mt-1">
            <button
              className="btn btn-danger"
              onClick={() => borrarCategoria(categoria._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          <hr className="mt-1" />
        </div>
      ))}

      {/* Cuerpo Tabla */}
      <div className="text-center">
        <BotonPag totPag={totPag} pagina={pagina} setPagina={setPagina} />
      </div>
      <ModalCateg
        show={show}
        handleClose={handleClose}
        actualizar={actualizar}
      />
    </div>
  );
};

export default AdminCateg;
