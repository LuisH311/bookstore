import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateLibro,
  getLibro,
  validado,
  validURL,
} from "../../Firebase/Api/api";
import swal from "sweetalert";

function UpdateLibro() {
  const [libro, setlibro] = React.useState({
    nombre: "",
    descripcion: "",
    autor: "",
    disponible: false,
    year: 0,
    genero: "",
    caratula: "",
  });
  const navigate = useNavigate();
  const params = useParams();


  const handleDisponibleChange = (event) => {
    const { value } = event.target;
    setlibro({ ...libro, disponible: value === "true" });
  };

  // libro por id
  const getBookById = async (id) => {
    try {
      const doc = await getLibro(id);
      setlibro({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };
  // Update un libro
  const Update = async () => {
    try {
      const respuesta = await validado(
        libro.nombre,
        libro.autor,
        libro.descripcion,
        libro.genero,
        libro.year,
        libro.disponible,
        libro.caratula
      );
      if (respuesta.correcto === true) {
        const urlOk = await validURL(libro.caratula);
        if (urlOk) {
          await updateLibro(
            params.id,
            libro.nombre,
            libro.autor,
            libro.descripcion,
            libro.genero,
            libro.year,
            libro.disponible,
            libro.caratula
          );
          swal({
            title: "The book has been updated",
            icon: "success",
          });
          navigate("/HomeAdmin");
        } else {
          swal({
            title: "Error",
            text: ` The url is invalid`,
            icon: "error",
          });
        }
      } else {
        swal({
          title: "Incomplete form",
          text: ` The ${respuesta.campo} field is empty`,
          icon: "error",
        });
      }
    } catch (error) {
      swal({
        title: `${error.message}`,
        text: `Try again`,
        icon: "error",
      });
    }
  };

  React.useEffect(() => {
    getBookById(params.id);
  }, [params.id]);

  return (
    <>
      <main className="contentForm container">
        <h2 style={{ marginBottom: "20px" }}>Update book</h2>
        <div className="boxForm" style={{ width: "100%", maxWidth: "500px" }}>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={libro.nombre}
                className="form-control"
                onChange={({ target }) => {
                  setlibro((data) => ({ ...data, nombre: target.value }));
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="autor">Author:</label>
              <input
                type="text"
                name="autor"
                id="autor"
                value={libro.autor}
                className="form-control"
                onChange={({ target }) => {
                  setlibro((data) => ({ ...data, autor: target.value }));
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Description:</label>
              <textarea
                type="text"
                name="descripcion"
                id="descripcion"
                value={libro.descripcion}
                className="form-control"
                rows="5"
                onChange={({ target }) => {
                  setlibro((data) => ({ ...data, descripcion: target.value }));
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                name="year"
                id="year"
                value={libro.year}
                className="form-control"
                onChange={({ target }) => {
                  setlibro((data) => ({ ...data, year: target.value }));
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genero">Book type</label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="genero"
                value={libro.genero}
                onChange={({ target }) =>
                  setlibro((data) => ({ ...data, genero: target.value }))
                }
              >
                <option defaultChecked value="0">
                  Select book type
                </option>
                <option value="Children's books">Children's books</option>
                <option value="Literature books">Literature books</option>
                <option value="Consultation and reference books">
                  Consultation and reference books
                </option>
                <option value="Technical or specialized books">
                  Technical or specialized books
                </option>
                <option value="religious and sacred books">
                  Religious and sacred books
                </option>
                <option value="Informative books">Informative books</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="disponible">Available</label>
              {/* <select
                className="form-select"
                aria-label="Default select example"
                id="disponible"
                value={libro.disponible === "true"}
                onChange={({ target }) =>
                  setlibro((data) => ({ ...data, disponible: target.value }))
                }
              >
                <option defaultChecked value="0">
                  Select if the book is available
                </option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select> */}

              <select
                className="form-select"
                aria-label="Default select example"
                id="disponible"
                value={libro.disponible ? "true" : "false"}
                onChange={handleDisponibleChange}
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="caratual">Book cover:</label>
              <input
                type="text"
                name="caratula"
                id="caratula"
                value={libro.caratula}
                className="form-control"
                onChange={({ target }) => {
                  setlibro((data) => ({ ...data, caratula: target.value }));
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => Update()}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/HomeAdmin")}
            >
              Back
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default UpdateLibro;
