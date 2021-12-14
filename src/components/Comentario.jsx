import React, { useEffect, useState } from "react";
import { postComentario, getComentario } from "../helpers/comentarios";

const Comentario = ({ comentarioId, totalComent, userYox, id }) => {
  const [actualizar, setActualizar] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    yox: id,
    comentario: "",
  });

  useEffect(() => {
    setFormValue({
      yox: id,
      comentario: "",
    });
    if (actualizar) {
      getComentario(actualizar).then((respuesta) => {
        setFormValue({
          yox: respuesta.comentario.yox,
          comentario: respuesta.comentario.comentario,
        });
      });
    }
  }, [actualizar,id]);

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

    postComentario(formValue).then((respuesta) => {
      if (respuesta.errors) {
        setLoading(false);
        return window.alert(respuesta.errors[0].msg);
      }
      if (respuesta.msg) {
        window.alert(respuesta.msg);
      }
      setLoading(false);
      setFormValue({
        yox: id,
        comentario: "",
      });
    });
  };

  return (
    <>
      <div
        className="row pt-2 pb-2 bg-dark mb-1 text-white"
        style={{
          borderTopLeftRadius: "9px",
          borderBottomLeftRadius: "9px",
        }}
      >
        <h5>Comentarios({totalComent})</h5>
      </div>
      {/* POST */}
      <div
        className="row bg-dark text-white mb-2 mt-2 pb-2"
        style={{ borderTopLeftRadius: "9px", borderBottomLeftRadius: "9px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label></label>
            <textarea
              type="text"
              name="comentario"
              className="form-control"
              value={formValue.comentario}
              onChange={handleChange}
              maxLength={300}
              minLength={3}
            />
          </div>

          <button
            className="btn me-1 mt-2"
            type="submit"
            style={{
              border: "1px solid red",
              borderRadius: "20px",
              color: "red",
            }}
            onClick={() => {
              setActualizar("");
            }}
            disabled={loading}
          >
            <i className="far fa-paper-plane"></i>
          </button>
        </form>
      </div>
      {/* Fin de POST */}
      {/* COMENTARIOS */}
      {comentarioId.map((comentario) => (
        <div
          className="row mb-1 pt-2 pb-2 text-white bg-dark  ps-0 pe-0"
          style={{
            borderTopLeftRadius: "9px",
            borderBottomLeftRadius: "9px",
          }}
          key={comentario._id}
        >
          <div className="col-1 pe-0">
            <img
              style={{ width: "100%", height: "50px", borderRadius: "7px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KJta8kWIZZuPXXKTB4LuhCDjh-yiecCt9BSBJ0WAAhFogOyBfZuTn8hlegwNRRFnShk&usqp=CAU"
              alt=""
            />
          </div>
          <div className="col-11">
            <h6>
              User
              {comentario.usuario === userYox.uid ? (
                <>
                  {comentario.usuario} <span style={{ color: "red" }}>OP</span>{" "}
                </>
              ) : (
                <>{comentario.usuario}</>
              )}
            </h6>
            <p>{comentario.comentario}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comentario;
