import { useState } from 'react';
import '../../styles/usuarios.css'
import api from '../../services/api'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { ptBR } from '@mui/x-data-grid/locales'; 
import AtualizarUsuario from '../updateUser/updateUser';
import { useAuth } from '../../context/authContext';
import { Navigate } from 'react-router-dom';


function TabelaUsuarios( { usuarios, carregarUsuarios }) {
    const [taAberto, portao] = useState(false);
    const [idUsuarioSelecionado, setIdUsuarioSelecionado] = useState(null);
    const { usuario } = useAuth();

    if (usuario.cargo !== "adm" && usuario.cargo !== "Administrador") {
    return <Navigate to="/" replace />;
    }




  let columns = [
    {field: "codusuario", headerName: "ID"},

    {
      field: "nome", 
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
      {
      field: "email", 
      headerName: "Email",
      flex: 1,
      cellClassName: "email-column--cell",
    },
      {
      field: "telefone", 
      headerName: "Número de telefone",
      flex: 1,
    },

       {
      field: "cargo", 
      headerName: "Cargo",
      flex: 1,
      renderCell: ({ row }) =>{

        const cargo = row.cargo;

        return (
          <Box width="60%" height="80%" marginTop="5px" p="5px" display="flex" alignItems="center" color="black" gap="5px" 
            backgroundColor={
              cargo === "admin"
               ? "#DAA520": "#DAA520"
               
            }
            borderRadius="10px"
          >
            {cargo === "adm" && <AdminPanelSettingsOutlinedIcon /> }
            {cargo === "Administrador" && <AdminPanelSettingsOutlinedIcon /> }
            {cargo === "Vendedor" && <CurrencyBitcoinIcon /> }
            {cargo === "Instalador" && <ConstructionOutlinedIcon /> }
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>{cargo}</span>
          </Box>

          
        )
      }
    },
  ]

  if (usuario?.cargo === "adm" || usuario?.cargo === "Administrador" )
  columns.push({
  field: "actions",
  headerName: "Ações",
  flex: 1,
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  renderCell: (params) => {
    const handleEdit = () => {
      console.log("Editar usuário:", params.row);
      setIdUsuarioSelecionado(params.row.codusuario);
      portao(true)
    };

    const handleDelete = () => {
  const id = params.row.codusuario;
  if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
    api.delete(`/user/delete/${id}`)
      .then(() => {
         if (carregarUsuarios) carregarUsuarios();
      })
      .catch((err) => {
        console.error("Erro ao excluir usuário:", err);
        alert("Erro ao excluir usuário.");
      });
  }
}; 

    return (
      <Box display="flex" gap="10px" marginTop="13px">
        <button
          onClick={handleEdit}
          style={{
            background: "#DAA520",
            color: "#1a1a1a",
            border: "none",
            padding: "4px 8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          style={{
            background: "#8B0000",
            color: "white",
            border: "none",
            padding: "4px 8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Excluir
        </button>
      </Box>
    );
  }
}
)

  return (
          <Box m="20px">
            <Box m="40px 0 0 0" height="75vh"
          sx={{

   
   
                 "& .MuiDataGrid-root": {
             border: "none",
             fontFamily: "sans-serif",
           },
           "& .MuiDataGrid-cell": {
             borderBottom: "1px solid #333",
             color: "white",
           },
           "& .name-column--cell": {
             color: "#DAA520",
             fontWeight: "bold",
           },
           "& .MuiDataGrid-columnHeaders": {
             backgroundColor: "#DAA520",
             color: "#1a1a1a",
             fontWeight: "bold",
             fontSize: "14px",
             borderBottom: "none",
           },
           "& .MuiDataGrid-columnHeaderTitleContainer": {
             backgroundColor: "#DAA520",
           },
           "& .MuiDataGrid-virtualScroller": {
             backgroundColor: "#1a1a1a",
           },
           "& .MuiDataGrid-footerContainer": {
             backgroundColor: "#DAA520",
             borderTop: "none",
             color: "#1a1a1a",
           },
           "& .MuiDataGrid-columnSeparator": {
             display: "none !important",
           },
           "& .MuiCheckbox-root": {
             color: "#DAA520 !important",
           },
         
           // Correções de foco, seleção e hover
           "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover": {
             backgroundColor: "#333 !important",
           },
         
           "& .MuiDataGrid-cell--editing": {
             backgroundColor: "#444",
             color: "white",
           },
           "& .MuiDataGrid-row:hover": {
             backgroundColor: "#2a2a2a",
           },
               }}
             
      >
              <AtualizarUsuario open={taAberto} onFechado={() => portao(false)} id={idUsuarioSelecionado} carregarUsuarios={carregarUsuarios}/>

              <DataGrid rows={usuarios} columns={columns} localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              getRowId={(row) => row.codusuario}
              
               sx={{
                 backgroundColor: '#1a1a1a', // cor de fundo da tabela
                  color: '#ffffff',           // cor do texto padrão

            
                   "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                 },


              
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#2a2a2a', // cor ao passar o mouse na linha
                }
              }}/>
            </Box>

    </Box>
  );
}

export default TabelaUsuarios;
