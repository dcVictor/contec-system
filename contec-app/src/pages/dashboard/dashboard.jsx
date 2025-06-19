import React, { useState } from "react";
import MenuLateral from "../../components/menuLateral/menuLateral";
import Header from "../../components/header";
import Clientes from "./clientes";
import Relatorios from "./relatorios";
import Orcamentos from "./orcamentos";
import Instalacoes from "./instalacoes";
import Manutencoes from "./manutencoes";
import Pedidos from "./pedidos";
import { Outlet } from "react-router-dom";

function Dashboard() {
    const [clientesAberto, setClientesAberto] = useState(false);
    const [relatoriosAberto, setRelatoriosAberto] = useState(false);
    const [pedidosAberto, setPedidosAberto] = useState(false);
    const [orcamentosAberto, setOrcamentosAberto] = useState(false);
    const [manutencoesAberto, setManutencoesAberto] = useState(false);
    const [instalacoesAberto, setInstalacoesAberto] = useState(false);



  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content-container">
        <MenuLateral
          setClientes={setClientesAberto}
          setRelatorios={setRelatoriosAberto}
          setPedidos={setPedidosAberto}
          setInstalacoes={setInstalacoesAberto}
          setManutencoes={setManutencoesAberto}
          setOrcamentos={setOrcamentosAberto}
        />

        {clientesAberto && (
          <Clientes
            open={clientesAberto}
            onFechado={() => setClientesAberto(false)}
          />
        )}

        {relatoriosAberto && (
          <Relatorios
            open={relatoriosAberto}
            onFechado={() => setRelatoriosAberto(false)}
          />
        )}

          {pedidosAberto && (
          <Pedidos
            open={pedidosAberto}
            onFechado={() => setPedidosAberto(false)}
          />
        )}

         {instalacoesAberto && (
          <Instalacoes
            open={instalacoesAberto}
            onFechado={() => setInstalacoesAberto(false)}
          />
        )}

         {orcamentosAberto && (
          <Orcamentos
            open={orcamentosAberto}
            onFechado={() => setOrcamentosAberto(false)}
          />
        )}

         {manutencoesAberto && (
          <Manutencoes
            open={manutencoesAberto}
            onFechado={() => setManutencoesAberto(false)}
          />
        )}


        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
