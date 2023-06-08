import { getYox, getComentariosYox } from "@/services";
import Comments from "@/components/Comments";

interface Params {
  params: {
    id: string;
  };
}

const DEFAULT_VALUE = {};

const fetchData = async (id: string) => {
  try {
    const { yox } = await getYox(id);
    return yox;
  } catch (error) {
    return {
      yox: DEFAULT_VALUE,
      usuario: DEFAULT_VALUE,
      categoria: DEFAULT_VALUE,
    };
  }
};

const fetchComments = async (id: string) => {
  try {
    const { comentario, Total } = await getComentariosYox(id);
    return { comments: comentario, totalComents: Total };
  } catch (error) {
    return { comments: [], totalComents: 0 };
  }
};

const YoxId = async ({ params }: Params) => {
  const { id } = params;
  const yox = await fetchData(id);
  const { comments, totalComents } = await fetchComments(id);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Yox */}
          <div className="col-md-6 col-12 mb-5 ">
            <div className="container ">
              <div
                className="row bg-dark pt-2 pb-2 text-white mb-3"
                style={{ borderRadius: "9px" }}
              >
                <span>YOXED/{yox?.categoria?.nombre}</span>
              </div>
              <div className="row text-white">
                <div className="col-md-7 col-12 mb-2 ps-0 pe-0">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                    src={yox.url}
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "6px",
                    }}
                    alt=""
                  />
                </div>
                <div className="col-md-5 col-12">
                  <h3>{yox.titulo}</h3>
                  <p>{yox.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Yox */}
          {/* Comentarios */}
          <div className="col-md-6 col-12">
            <div className="container  ps-0 pe-0">
              <Comments
                comments={comments}
                totalComents={totalComents}
                author={yox?.usuario}
                id={id}
              />
            </div>
          </div>
          {/* Comentarios */}
        </div>
      </div>
    </>
  );
};

export default YoxId;
