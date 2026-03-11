import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack, Snackbar, Alert, FormControlLabel, Switch } from "@mui/material"; 
import api from '../../services/api'; 

function CatracasMonitoramento() {
  const cameraUrl = "http://192.168.20.13:8889/cam1";
  
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [manterAberto, setManterAberto] = useState(false); // Estado do modo automático

  // Função base para abrir a porta
  const abrirPorta = async (idCatraca) => {
    try {
      setError(null);
      await api.post('/api/abrir-porta', { idCatraca });
      // Só mostramos o Snackbar se NÃO estiver no modo "Manter Aberto" para não poluir a tela
      if (!manterAberto) setOpen(true); 
    } catch (error) {
      setError(error.message);
      setOpen(true);
      setManterAberto(false); // Desativa o automático se der erro crítico
    }
  };

  // Lógica do Intervalo para o modo "Manter Aberto"
  useEffect(() => {
    let intervalo = null;

    if (manterAberto) {
      // Primeira execução imediata
      abrirPorta('catraca5');
      
      // Define a repetição a cada 3 segundos
      intervalo = setInterval(() => {
        abrirPorta('catraca5');
      }, 3000);
    }

    // Cleanup: Limpa o intervalo se o usuário desativar ou sair da tela
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [manterAberto]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden' }}>
      
      {/* 1. LADO ESQUERDO: Vídeo da Câmera */}
      <Box sx={{ flex: 1, position: 'relative', backgroundColor: '#111' }}>
        <iframe 
          src={`${cameraUrl}?autoplay=true&muted=true`}
          style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
          title="Monitoramento Intelbras"
        />
        {/* Badge Visual de modo automático */}
        {manterAberto && (
          <Box sx={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(255,0,0,0.7)', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', animation: 'pulse 1.5s infinite' }}>
            ● MODO MANTER ABERTO ATIVO
          </Box>
        )}
      </Box>

      {/* 2. LADO DIREITO: Painel de Controle */}
      <Box sx={{ width: '350px', backgroundColor: '#1a1a1a', borderLeft: '2px solid #333', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={4} sx={{ width: '100%' }}>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>PORTARIA</Typography>
            <Typography variant="subtitle1" sx={{ color: '#aaa', textTransform: 'uppercase' }}>Catraca Entrada - Matriz</Typography>
          </Box>

          <Box sx={{ borderBottom: '1px solid #333', width: '100%' }} />

          <Stack spacing={2} alignItems="center">
            <Button 
              variant="contained" 
              disabled={manterAberto} 
              onClick={() => abrirPorta('catraca5')}
              sx={{ 
                height: '120px', 
                width: '100%',
                fontSize: '1.4rem', 
                color: '#fff',
                backgroundColor: manterAberto ? '#afacacef' : '#1976d2',
                fontWeight: 'bold',
                borderRadius: '12px',
                transition: 'all 0.2s'
                
              }}
            >
              {manterAberto ? 'PORTA ABERTA' : 'LIBERAR ENTRADA'}
            </Button>

            {/* Opção Manter Aberto */}
            <FormControlLabel
              control={
                <Switch 
                  checked={manterAberto} 
                  onChange={(e) => setManterAberto(e.target.checked)} 
                  color="error"
                />
              }
              label={
                <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                  MANTER ABERTO
                </Typography>
              }
              sx={{ 
                backgroundColor: manterAberto ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
                padding: '5px 15px',
                borderRadius: '8px',
                width: '100%',
                justifyContent: 'center',
                margin: 0
              }}
            />
          </Stack>

          <Typography variant="caption" sx={{ color: '#666', textAlign: 'center' }}>
            Sistema de Segurança - Zagonel
          </Typography>
        </Stack>
      </Box>

      {/* NOTIFICAÇÃO */}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"} variant="filled" sx={{ width: '100%' }}>
          {error ? `Erro: ${error}` : "Catraca Liberada!"}
        </Alert>
      </Snackbar>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
}

export default CatracasMonitoramento;