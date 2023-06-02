import * as React from "react";
import { useAuth } from "../../Context/authContext";
import { devolver, comparar, info } from "./../../Firebase/Api/api";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import swal from "sweetalert";


function Prestamos() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [libros, setLibros] = React.useState([{}]);
  const [librosOriginales, setLibrosOriginales] = React.useState([]);

  // obtener libros
  const getLinks = async () => {
    const usuario = auth.currentUser;
    const books = await info(usuario).then((data) => { return data.libros })
    const librosOrdenados = books.sort(comparar);
    setLibros(librosOrdenados);
    setLibrosOriginales(librosOrdenados);
  };


  // cargar los libros
  React.useEffect(() => {
    getLinks();
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = () => {
    if (searchTerm === "") {
      setLibros(librosOriginales);
    } else {
      const filteredLibros = librosOriginales.filter((libro) =>
        libro.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLibros(filteredLibros);
    }
  };


  // devolver un libro
  const devolverLibro = async (id_libro, nombre) => {
    try {
      let confirm = await swal({
        title: `Do you want to return the book ${nombre} ?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((decision) => {
        return decision;
      });
      if (confirm) {
        const usuario = auth.currentUser;
        await devolver(id_libro, usuario.uid, usuario)
        getLinks();
        swal({
          title: "The book has been successfully returned",
          icon: "success",
        });
      }
    } catch (error) {
      swal({
        title: `${error}`,
        text: `Try again`,
        icon: "error",
      });
    }
  };

  // HTML - User view
  return (
    <>
      <div className="w-full max-w-xs m-auto text-black mb-5">
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-xl mb-4">
            welcome {user.displayName || user.email}
          </p>
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-2 mb-5">
            <div className="card rounded-5">
              <br></br>
              <div className="card-body">
                <button
                  className="btn btn-danger"
                  onClick={() => navigate("/HomeUser")}
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-8 col-lg-10">
            <div
              className="
                row 
                g-4 
                overflow-y-scroll 
                border 
                album 
                container
                "
              style={{ minHeight: "49vh", maxHeight: "52vh" }}
            >
              <div className="card-group">
                <div className="col-12 mb-4">
                  <input
                    className=" col-10 border rounded-start-5"
                    type="text"
                    placeholder="Ingrese titulo del libro"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className=" col-2 border rounded-end-5"
                    onClick={handleSearch}
                  >
                    <i className="fa-solid ">Buscar .</i>
                    <i className="fa-solid fa-magnifying-glass fa-beat"></i>
                  </button>
                </div>
                {libros.map((item) => (
                  <>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-1 mb-2 p-2 " key={item.id}>
                      <div className="card shadow-sm mt-4 p-1">
                        <img
                          className="card-img"
                          src={item.caratula}
                          alt="..."
                          style={{ minHeight: "38vh", maxHeight: "40vh" }}
                        />
                        <div className="card-img-overlay">
                          <div
                            className={`card text-center border-info ${item.disponible
                              ? "text-bg-dark"
                              : "text-bg-danger"
                              }`}
                          >
                            <div className="card-body">
                              <div className="card-text lead mb-4 fw-semibold" >
                                <h5 className="card-title">{item.nombre}</h5>
                                <button type="submit" onClick={() => devolverLibro(item.id, item.nombre)}>Devolver</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prestamos