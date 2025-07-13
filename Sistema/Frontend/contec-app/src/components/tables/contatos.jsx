import { useEffect, useState } from 'react';
import React from 'react'
import '../../styles/usuarios.css'
import api from '../../services/api'
import { mockDataTeam } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { ptBR } from '@mui/x-data-grid/locales'; 
import AtualizarUsuario from '../updateUser/updateUser';


function ContatosClientes( { contatosClientes, carregarClientes }) {
    const [taAberto, portao] = useState(false);
    const [idUsuarioSelecionado, setIdUsuarioSelecionado] = useState(null);




  const columns = [


    {
      field: "nome", 
      headerName: "Nome",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
      {
      field: "email", 
      headerName: "Email para contato",
      flex: 0.6,
      cellClassName: "email-column--cell",
    },
      {
      field: "fone", 
      headerName: "Número de telefone",
      flex: 0.6,
    },
       {
      field: "lgdr", 
      headerName: "Logradouro",
      flex: 0.5,
    },
       {
      field: "numero", 
      headerName: "Nº",
      flex: 0.1,
    },
     {
      field: "bairro", 
      headerName: "Bairro",
      flex: 0.4,
    },


    {
      field: "cidade", 
      headerName: "Cidade",
      flex: 0.5,
    },
       {
      field: "estado", 
      headerName: "UF",
      flex: 0.1,
    },
     {
      field: "cep", 
      headerName: "CEP",
      flex: 0.3,
    },

      

//    {
//   field: "actions",
//   headerName: "Ações",
//   flex: 0.4,
//   sortable: false,
//   filterable: false,
//   disableColumnMenu: true,
//   renderCell: (params) => {
//     const handleEdit = () => {
//       console.log("Editar usuário:", params.row);
//       setIdUsuarioSelecionado(params.row.cpf);
//       portao(true)
//     };



//     return (
//       <Box display="flex" gap="10px" marginTop="13px">
//         <button
//           onClick={handleEdit}
//           style={{
//             background: "#DAA520",
//             color: "#1a1a1a",
//             border: "none",
//             padding: "4px 8px",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Editar
//         </button>
    
//       </Box>
//     );
//   }
// }
  ]





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
              

              <DataGrid rows={contatosClientes} columns={columns} localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              getRowId={(row) => row.nome}
              
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

export default ContatosClientes;
