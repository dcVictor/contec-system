import { ResponsiveBar } from "@nivo/bar";
import { mockBarData as dataBar } from "../../data/mockData";
import { Box } from "@mui/material";

function BarChart() {
  return (
     <Box m="20px" height="400px" width="100%"> {/* Ajuste a altura e largura conforme necessário */}
      <ResponsiveBar
        data={dataBar}
        keys={['Seccionados', 'Enrolar', 'Manutenções']} 
        indexBy="Serviços"
        enableLabel={false}
        colors={[ 'rgb(117, 87, 10)', '#DAA520', 'rgb(236, 193, 84)']}
        labelSkipWidth={12}
        labelSkipHeight={12}
        theme={{ 
          axis: {
            domain: {
              line: {
                stroke: "#fff"
              }
            },
            legend: {
              text: {
                fill: "#fff"
              }
            },
            ticks: {
              line: {
                stroke: "#fff",
                strokeWidth: 1
              },
              text: {
                fill: "#fff"
              }
            }
          },
          legends: {
            text: {
              fill: "#fff"
            }
          }
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
            symbolSize: 18, // Tamanho do símbolo para a legenda
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Mês', // Legenda do eixo X
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Número de Vendas/Serviços', // Legenda do eixo Y
          legendPosition: 'middle',
          legendOffset: -40
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    </Box>
  )
}

export default BarChart;