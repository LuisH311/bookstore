import * as React from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import { mensaje } from "../../Firebase/Api/api";
import { useChat } from "./useChat";
export function ChatUser() {
  const [message, setMessage] = React.useState("")
  const { chat } = useChat()


  const navigate = useNavigate();
  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      const user = auth.currentUser;
      await mensaje(message, user.uid, user)
    } catch (error) {
      swal({
        title: "Error",
        text: `Try again`,
        icon: "error",
      });
    }

  }
  return (
    <div className="container-costado1">
      <div className="costado1">
        <h1 className="titulo-chat"> BookStore: Chat General (USER)</h1>
        <div className="screen">
          {chat.map((item, id) => (
            <div className="message" key={id}>
              <ul style={{ listStyle: "none" }}>
                <li>{item.nombre}:</li>
                <li>{item.mensaje}</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="Botones-chat">
        <form>
          <input
            type="text"
            placeholder="Escribir Mensaje"
            className="texto1"
            onChange={(e) => setMessage(e.target.value)}
            />
          <button type="submit" className="boton1" onClick={sendMessage}>
            Enviar
          </button>
          <button type="submit" className="boton2" onClick={() => navigate('/HomeUser')}>
            Back
          </button>
        </form>
        </div>
        <ul></ul>
      </div>
    </div>
  );
}

export default ChatUser;
