import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  addDoc,
  updateDoc
} from "firebase/firestore"
import { db } from "./../config"

const collectionBook = 'libros';
const collectionChat = 'chat';
const collectionUser = 'usuarios';
// validar url
export const validURL = async (url) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
    "i"
  )
  return !!pattern.test(url);
}
// validar formulario libros
export const validado = async (nombre, autor, descripcion, genero, year, disponible, caratula) => {
  let ok = true
  let response = { correcto: ok, campo: "" }
  const campos = [nombre, autor, descripcion, year, genero, disponible, caratula]
  const name = ["title", "author", "description", "year", "book type", "available", "book cover"]
  for (const key in campos) {
    if (campos[key] === "" || campos[key] === "0") {
      ok = false
      response = { correcto: ok, campo: name[key] }
      break
    }
  }

  return response
}
// Obtener libros
export const getLibros = async () => await getDocs(collection(db, collectionBook));
// Obtener un libro
export const getLibro = (id) => getDoc(doc(db, collectionBook, id));
// Eliminar un libro
export const deleteLibro = async (id) => await deleteDoc(doc(db, collectionBook, id));
// Guardar un libro
export const saveLibro = async (nombre, autor, descripcion, genero, year, disponible, caratula) => {

  await addDoc(collection(db, collectionBook), {
    nombre: nombre,
    autor: autor,
    descripcion: descripcion,
    genero: genero,
    year: parseInt(year),
    disponible: Boolean(disponible),
    caratula: caratula,
    createAt: Date.now(),
    updateAt: Date.now()
  });
}

// Actualizar libro
export const updateLibro = async (id, nombre, autor, descripcion, genero, year, disponible, caratula) => {
  const libroInfo = await info_libro(id)
  await updateDoc(doc(db, collectionBook, id), {
    nombre: nombre,
    autor: autor,
    descripcion: descripcion,
    genero: genero,
    year: parseInt(year),
    disponible: Boolean(disponible),
    caratula: caratula,
    createAt: libroInfo.createAt,
    updateAt: Date.now()
  });
}


// validar formulario registro usuario
export const registerOk = async (nombre, apellido, email, password, role) => {
  let ok = true
  let response = { correcto: ok, campo: "" }
  const campos = [nombre, apellido, email, password, role]
  const name = ["name", "lasname", "email", "password", "role"]
  for (const key in campos) {
    if (campos[key] === "" || campos[key] === "0") {
      ok = false
      response = { correcto: ok, campo: name[key] }
      break
    }
  }

  return response
}

// Query: User's info
export const info = async (usuario) => {
  const docRef = doc(db, `usuarios/${usuario.uid}`)
  const query = await getDoc(docRef)
  const info = query.data()
  return info

}
// Enviar mensaje
export const mensaje = async (mensaje, id, usuario) => {
  const usuarioInfo = await info(usuario)
  const fecha = new Date()
  await addDoc(collection(db, collectionChat), {
    usuario_id: id,
    nombre: usuarioInfo.name,
    mensaje,
    timestamp: fecha.toISOString().substring(0,19)
  });
}

// Query: libro's info
export const info_libro = async (uid) => {
  const docRef = doc(db, `libros/${uid}`)
  const query = await getDoc(docRef)
  const info = query.data()
  return info

}

// Prestar libro
export const prestar = async (id_libro, id_usuario, usuario) => {
  const usuarioInfo = await info(usuario)
  const libroInfo = await info_libro(id_libro)
  const libros = usuarioInfo.libros
  // cambio de disponibilidad del libro
  await updateDoc(doc(db, collectionBook, id_libro), {
    nombre: libroInfo.nombre,
    autor: libroInfo.autor,
    descripcion: libroInfo.descripcion,
    genero: libroInfo.genero,
    year: libroInfo.year,
    disponible: false,
    caratula: libroInfo.caratula,
    createAt: libroInfo.createAt,
    updateAt: libroInfo.updateAt
  });
  // asignar un libro en la lista de libros del usuario
  libros.push({ id: id_libro, nombre: libroInfo.nombre, disponible: false, caratula: libroInfo.caratula })
  await updateDoc(doc(db, collectionUser, id_usuario), {
    name: usuarioInfo.name,
    lastname: usuarioInfo.lastname,
    email: usuarioInfo.email,
    password: usuarioInfo.password,
    role: usuarioInfo.role,
    libros: libros
  });
}

// Devolver libro
export const devolver = async (id_libro, id_usuario, usuario) => {
  const usuarioInfo = await info(usuario)
  const libroInfo = await info_libro(id_libro)
  // cambio de disponibilidad del libro
  await updateDoc(doc(db, collectionBook, id_libro), {
    nombre: libroInfo.nombre,
    autor: libroInfo.autor,
    descripcion: libroInfo.descripcion,
    genero: libroInfo.genero,
    year: libroInfo.year,
    disponible: true,
    caratula: libroInfo.caratula,
    createAt: libroInfo.createAt,
    updateAt: Date.now()
  });
  const prestados = usuarioInfo.libros
  for (const key in prestados) {
    if (prestados[key].id === id_libro) {
      prestados.splice(key, 1);
      break
    }
  }
  // quitar libro en la lista de libros del usuario
  await updateDoc(doc(db, collectionUser, id_usuario), {
    name: usuarioInfo.name,
    lastname: usuarioInfo.lastname,
    email: usuarioInfo.email,
    password: usuarioInfo.password,
    role: usuarioInfo.role,
    libros: prestados
  });
}
// Función de comparación
export const comparar = (a, b) => {
  if (a.nombre < b.nombre) {
    return -1;
  } else if (a.nombre > b.nombre) {
    return 1;
  } else {
    return 0;
  }
};


