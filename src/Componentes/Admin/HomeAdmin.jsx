import { useAuth } from "../../Context/authContext";
import * as React from "react";
import { getLibros, deleteLibro,comparar } from "./../../Firebase/Api/api";
import swal from "sweetalert";
import "./HomeAdmin.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
/* import { useState } from "react"; */
// Admin view
export function HomeAdmin() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  /* const [message, setMessage] = useState(""); */

  // Log out - Admin
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  const [libros, setLibros] = React.useState([{}]);
  // obtener libros
  const getLinks = async () => {
    const querySnapshot = await getLibros();
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    const librosOrdenados = docs.sort(comparar);
    setLibros(librosOrdenados);
  };
  

  // Eliminar un libro
  const onDelete = async (id,nombre) => {
    try {
      let confirm = await swal({
        title: `Are you sure you want to delete the book "${nombre}" ?`,
        text: "Once deleted, you will not be able to recover this book!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        return willDelete;
      });
      if (confirm) {
        await deleteLibro(id);
        getLinks();
        swal({
          title: "The book has been removed",
          icon: "success",
        });
      }
    } catch (error) {
      swal({
        title: "Error",
        text: `Try again`,
        icon: "error",
      });
    }
  };

  // cargar los libros
  React.useEffect(() => {
    getLinks();
  }, []);

  // HTML - Admin view
  return (
    <>
      <main className="container contentHomeAdmin">
        <header className="HeaderAdmin">
          <h2 style={{ margin: "0", maxWidth: "300px", fontSize: "20px" }}>
            Welcome Admin:{" "}
            <span style={{ fontSize: "18px" }}>{user.email}</span>{" "}
          </h2>
          <div style={{display: "flex"}} className="buttonsHeaderAdmin">
            <button
              className="btn btn-primary" onClick={() => navigate("/HomeAdmin/chatAdmin")}
            >
              Chat
            </button>
            <button
              className="btn btn-secondary"
              id="boton-logout"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </header>
        <div className="LibrosAdmin">
          <div className="contentCardsLibros">
            <article
              className="LibroAdmin NewLibroAdmin"
              onClick={() => navigate("/HomeAdmin/NewLibro")}
            >
              <h1 style={{ fontSize: "100px", opacity: ".5" }}>+</h1>
            </article>
            {libros.map((item, id) => (
              <article
                className="LibroAdmin"
                key={id}
                style={{
                  backgroundImage: `url(${item.caratula})`,
                  backgroundSize: "cover",
                }}
              >
                <h2 style={{ color: "#000", fontWeight: "1000" }}>
                  {item.nombre}
                </h2>
                <div className="ActionsLibros">
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`UpdateLibro/${item.id}`)}
                  >
                    <FaEdit fontSize={"25px"} />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id,item.nombre);
                    }}
                  >
                    <MdDelete fontSize={"29px"} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
export default HomeAdmin;
