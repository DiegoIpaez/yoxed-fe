"use client";
import React, { useEffect, useState } from "react";
import { postComentario, getComentario } from "@/services";
import type { Commentary, User } from "@/models";

interface Props {
  comments: Commentary[];
  totalComents: number;
  author: User;
  id: string;
}
const Comments = ({ comments, totalComents, author, id }: Props) => {
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
  }, [actualizar, id]);

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
      await postComentario(formValue);
      setFormValue({
        yox: id,
        comentario: "",
      });
    } catch (error) {
      window.alert(error);
    } finally {
      setLoading(false);
    }
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
        <h5>Comentarios({totalComents})</h5>
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
      {comments.map((comentario) => (
        <div
          className="row mb-1 pt-2 pb-2 text-white bg-dark  ps-0 pe-0"
          style={{
            borderTopLeftRadius: "9px",
            borderBottomLeftRadius: "9px",
          }}
          key={comentario._id}
        >
          <div className="col-1 pe-0">
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              style={{ width: "100%", height: "50px", borderRadius: "7px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KJta8kWIZZuPXXKTB4LuhCDjh-yiecCt9BSBJ0WAAhFogOyBfZuTn8hlegwNRRFnShk&usqp=CAU"
              alt=""
            />
          </div>
          <div className="col-11">
            <h6>
              User
              {comentario?.usuario?.uid === author.uid ? (
                <>
                  {comentario?.usuario?.nombre}{" "}
                  <span style={{ color: "red" }}>OP</span>{" "}
                </>
              ) : (
                <>{comentario?.usuario?.nombre}</>
              )}
            </h6>
            <p>{comentario?.comentario}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
