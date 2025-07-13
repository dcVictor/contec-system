    import { ResponsivePie } from '@nivo/pie';
    import { mockPieData as data} from "../../data/mockData";
import { Box } from '@mui/material';

    function PieChart() {
    return (
<Box
  sx={{
   
    minHeight: 300,
    minWidth: 0,
    overflow: 'visible',
    paddingBottom: '5px'
  }}
>
  <ResponsivePie
    data={data}
    margin={{ top: 50, right: 100, bottom: 60, left: 100 }}
    innerRadius={0.5}
    padAngle={0.6}
    cornerRadius={2}
    activeOuterRadiusOffset={4}
    colors={['rgb(117, 87, 10)', '#DAA520', 'rgb(236, 193, 84)']}
    arcLinkLabelsTextColor="#fff"
    arcLinkLabelsColor="#fff"
    enableArcLabels={false}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 175,
        itemHeight: 18,
        itemSpacing: 30,
        symbolShape: 'circle',
      },
    ]}
    theme={{
      legends: {
        text: {
          fill: '#fff',
        },
      },
    }}
  />
</Box>
    );
    }

    export default PieChart;
