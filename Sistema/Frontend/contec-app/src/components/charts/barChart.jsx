import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import api from "../../services/api.js";

function BarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await api.get("/pedido/getpedidospormes");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    fetchDados();
  }, []);

  return (
    <Box m="20px" height="400px" width="100%">
      <ResponsiveBar
        data={data}
        keys={['Pedidos']}
        indexBy="Serviços"
        enableLabel={false}
        colors={['rgb(117, 87, 10)']}
        labelSkipWidth={12}
        labelSkipHeight={12}
        theme={{
          axis: {
            domain: { line: { stroke: "#fff" } },
            legend: { text: { fill: "#fff" } },
            ticks: {
              line: { stroke: "#fff", strokeWidth: 1 },
              text: { fill: "#fff" }
            }
          },
          legends: { text: { fill: "#fff" } }
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 16,
            symbolSize: 18,
            effects: [{ on: 'hover', style: { itemOpacity: 1 } }]
          }
        ]}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Mês',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Número de Vendas/Serviços',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    </Box>
  );
}

export default BarChart;
