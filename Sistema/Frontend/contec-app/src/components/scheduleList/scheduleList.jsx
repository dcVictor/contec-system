import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import React, { useState } from "react";

function ListaProgramacao({ contatosServicos, carregarServicos }) {

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '300px',     // Limita a largura para não forçar overflow
        padding: 1,
        boxSizing: 'border-box',
   
        
      }}
    >
      <Typography variant="h5" sx={{ color: "#fff", wordWrap: 'break-word' }}>
        Programação
      </Typography>
      <Box
         sx={{
        maxHeight: "70vh", // define altura máxima
        overflowY: "auto",   // ativa scroll apenas se necessário
        pr: 1 }}    >
        
    
      <List disablePadding>
        {contatosServicos.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              backgroundColor: "#DAA520",
              margin: "10px 0",
              borderRadius: "4px",
              overflow: "hidden",
              wordWrap: "break-word"  // Garante quebra de texto
            }}
          >
            <ListItemText
              primary={event.title}
              secondary={event.start}
         
              sx={{
                '& .MuiListItemText-primary': {
                  whiteSpace: 'normal'  // Evita uma linha só
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
    </Box>
  );
}

export default ListaProgramacao;
