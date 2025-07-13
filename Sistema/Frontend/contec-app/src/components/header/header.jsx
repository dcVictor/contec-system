import "../../styles/header.css";
import { useAuth } from "../../context/authContext";

function Header() {
  const { usuario } = useAuth();

  return (
    <header>
      <div className="logo-wrapper">
        <div className="logo-square"></div>
        <div className="logo-text">CONTEC</div>
      </div>
      <div className="user-info">
        <div className="user-name" id="userName">
          {usuario?.nome || "Usuário não autenticado"}
        </div>
        <div className="user-group" id="userGroup">
          {usuario?.cargo || "-"}
        </div>
      </div>
    </header>
  );
}

export default Header;
