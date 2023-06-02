import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import { db } from './Firebase/config'; // base de datos
//import {collection, getDocs } from 'firebase/firestore';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
/*
// obtener base de datos ejemplo - https://firebase.google.com/docs/firestore/query-data/queries?hl=es-419
const usuariosRef = collection(db, "usuarios");
getDocs(usuariosRef).then(res => console.log(res.docs.map(usuario => ({ ...usuario.data() }))))
*/
