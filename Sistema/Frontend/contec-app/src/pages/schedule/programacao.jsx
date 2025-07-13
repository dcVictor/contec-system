import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box } from "@mui/material";
import { useState, useEffect } from 'react';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../../styles/instalacoes.css";
import ListaProgramacao from "../../components/scheduleList/scheduleList";
import api from '../../services/api';

function Programacao() {
  const [contatosServicos, setServicos] = useState([]);

  // Carrega eventos do banco
  const carregarServicos = () => {
    api.get('/servico/getall')
      .then(res => {
        const eventosFormatados = res.data.map(item => ({
          id: item.codserv,
          title: item.tipserv,
          start: item.dtserv,
          end: item.dtserv,
          allDay: true,
        }));
        setServicos(eventosFormatados);
      })
      .catch(err => console.error('Erro ao buscar os serviços:', err));
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  // Adiciona evento e salva no banco
  const handleDateClick = async (selected) => {
    const title = prompt("Digite o título do serviço:");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      try {
        const response = await api.post('/servico/create', {
          tipserv: title,
          dtserv: selected.startStr,
        });

        const novoEvento = response.data;

        calendarApi.addEvent({
          id: novoEvento.codserv,
          title: novoEvento.tipserv,
          start: novoEvento.dtserv,
          end: novoEvento.dtserv,
          allDay: true,
        });

        carregarServicos();
      } catch (err) {
        console.error("Erro ao salvar o evento:", err);
      }
    }
  };

  // Remove evento do banco
  const handleEventClick = async (selected) => {
    if (window.confirm(`Tem certeza que quer deletar o evento '${selected.event.title}'?`)) {
      try {
        await api.delete(`/servico/delete/${selected.event.id}`);
        selected.event.remove();
        carregarServicos();
      } catch (err) {
        console.error("Erro ao deletar o evento:", err);
      }
    }
  };

  return (
    <Box className="calendar-container" m="20px" width="100%" overflow="hidden">
      <Box
        className="calendar-content-container"
        display="flex"
        justifyContent="space-between"
        width="100%"
        overflow="hidden"
      >
        <Box
          flex="0 0 250px"
          backgroundColor="#222222"
          p="10px"
          borderRadius="4px"
          minHeight="80vh"
          boxSizing="border-box"
        >
          <ListaProgramacao contatosServicos={contatosServicos} carregarServicos={carregarServicos} />
        </Box>

        <Box flex="1 1 auto" minHeight="80vh" ml="10px" overflow="hidden" color="#fff">
          <FullCalendar
            locale={ptBrLocale}
            height="80vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEventRows={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={contatosServicos}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Programacao;
