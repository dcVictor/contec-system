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
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';


function VisualizarPedidos( { pedidos, carregarPedidos }) {
    const [taAberto, portao] = useState(false);
    const [idUsuarioSelecionado, setIdUsuarioSelecionado] = useState(null);

    console.log(pedidos)







  const columns = [
    {field: "codped", headerName: "ID", flex: 0.3},


    {
      field: "nome", 
      headerName: "Cliente",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  
      {
      field: "cidade", 
      headerName: "Cidade",
      flex: 0.7,
    },
       {
      field: "estado", 
      headerName: "UF",
      flex: 0.1,
    },

      {
      field: "tipo_portao", 
      headerName: "Modelo do portão",
      flex: 0.8,
    },

       {
      field: "statped", 
      headerName: "Status do pedido",
      flex: 1,
      renderCell: ({ row }) =>{

        const cargo = row.statped;

        return (
          <Box width="80%" height="80%" marginTop="5px" p="5px" display="flex" alignItems="center" color="black" gap="5px" 
            backgroundColor={
              cargo === "admin"
               ? "#DAA520": "#DAA520"
               
            }
            borderRadius="10px"
          >
            {cargo === "Pendente" && <HourglassBottomOutlinedIcon /> }
            {cargo === "Em produção" && <FactoryOutlinedIcon /> }
            {cargo === "Concluído" && <InventoryOutlinedIcon /> }
            {cargo === "espera" && <HourglassBottomOutlinedIcon /> }
            {cargo === "pedido" && <FactoryOutlinedIcon /> }
            {cargo === "instalado" && <InventoryOutlinedIcon /> }
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>{cargo}</span>
          </Box>

          
        )
      }
    },
    {field: "comp", headerName: "Comprimento", flex: 0.5},
    {field: "altura", headerName: "Altura", flex: 0.5},
    {field: "dtpdd", headerName: "Data do pedido", flex: 0.9},
    {field: "valped", headerName: "Valor", flex: 0.5},
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
              

              <DataGrid rows={pedidos} columns={columns} localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              getRowId={(row) => row.codped}
              
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

export default VisualizarPedidos;
