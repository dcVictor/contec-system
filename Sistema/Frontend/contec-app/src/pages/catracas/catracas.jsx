import React from 'react';
// Stack é usado para organizar os botões lado a lado
import { Box, Button, Grid } from "@mui/material"; 


// Importe sua instância principal do Axios que aponta para o seu backend (http://localhost:3002)
import api from '../../services/api'; 
// (Assumindo que você tem um 'services/api.js' que exporta o axios)


// ----------------------------------------------------------------------------------
// Componente React: Catracas (Versão Backend)
// ----------------------------------------------------------------------------------
function Catracas() {

  /**
   * Função que será chamada quando um botão for clicado.
   * Ela agora é muito mais simples: apenas diz ao backend QUAL catraca abrir.
   * @param {string} idCatraca - O identificador da catraca (ex: 'catraca1', 'catraca2')
   */
  const abrirPorta = async (idCatraca) => {
    try {
      console.log(`Enviando solicitação para o backend abrir a ${idCatraca}...`);

      // 1. Faz a chamada POST para o seu backend (server.js)
      const response = await api.post('/api/abrir-porta', { 
        idCatraca: idCatraca 
      });

      // 2. O backend cuida de toda a lógica Digest e retorna o sucesso
      console.log('Resposta do backend:', response.data.message);
      alert(`Comando enviado com sucesso para ${idCatraca}!`);

    } catch (error) {
      // 3. Captura erros (se o backend falhar ou a catraca não for encontrada)
      const errorMsg = error.response?.data?.message || error.message;
      console.error(`Falha ao enviar comando para ${idCatraca}:`, errorMsg);
      alert(`Falha ao abrir a porta: ${errorMsg}`);
    }
  };

  // Renderiza o conteúdo visual do componente
return (
    <Box sx={{ padding: 3 }}>
      <h1>Controle de Catracas</h1>
      
      {/* Usamos Grid 'container' para envolver os botões.
        'spacing={2}' adiciona espaçamento entre eles.
      */}
      <Grid container spacing={2}>
        
        {/* Botão 1: 
          'item' indica que é um item do grid.
          'xs={6}' diz para ocupar 6 das 12 colunas (metade da tela), 
          forçando 2 botões por linha.
        */}
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => abrirPorta('catraca1')}
            sx={{ width: '100%' }} // Faz o botão preencher o espaço
          >
            Abrir Catraca 1 (192.168.14.7)
          </Button>
        </Grid>

        {/* Botão 2: Ocupa os outros 6 espaços da linha */}
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => abrirPorta('catraca2')}
            sx={{ width: '100%' }}
          >
            Abrir Catraca 2 (192.168.14.5)
          </Button>
        </Grid>

        {/* Botão 3: Pula para a próxima linha */}
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => abrirPorta('catraca3')}
            sx={{ width: '100%' }}
          >
            Abrir Catraca 3 (192.168.14.3)
          </Button>
        </Grid>
        
        {/* Botão 4: */}
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => abrirPorta('catraca4')}
            sx={{ width: '100%' }}
          >
            Abrir Catraca 4 (192.168.14.6)
          </Button>
        </Grid>

        {/* Botão 5: */}
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => abrirPorta('catraca5')}
            sx={{ width: '100%' }}
          >
            Abrir Catraca (192.168.16.55)
          </Button>
        </Grid>

        {/* Botão 6: */}
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => abrirPorta('catraca6')}
            sx={{ width: '100%' }}
          >
            Abrir Catraca (192.168.16.54)
          </Button>

        </Grid>
         {/* Botão 7: */}
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => abrirPorta('catraca7')}
            sx={{ width: '100%' }}
          >
            Abrir teste (192.168.9.150)
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Catracas;

