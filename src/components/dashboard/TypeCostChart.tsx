import { Card, Col, Row, Typography } from 'antd';
import type { ChartMeta } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import type { TypeCost, TypeCostList } from '@/dto/ChartDTO';
import $api from '@/plugins/api';

const { Title } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

// const value = Math.random() * 1000;

// const data = {
//   labels: [],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [value, value - 1000],
//       backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(243, 245, 247, 0.6)'],
//       borderColor: ['rgba(255, 99, 132, 1)', 'rgba(243, 245, 247, 1)'],
//       borderWidth: 1,
//     },
//   ],
// };

const randomColor = () => {
  const r = Math.floor(Math.random() * 255);

  const g = Math.floor(Math.random() * 255);

  const b = Math.floor(Math.random() * 255);

  return [`rgba(${r}, ${g}, ${b}, 0.6)`, `rgba(${r}, ${g}, ${b}, 1)`];
};

const innerLabel = {
  id: 'innerLabel',
  afterDatasetDraw(
    chart: ChartJS<'doughnut', number[], unknown>,
    args: { index: number; meta: ChartMeta & { total: number } }
  ) {
    const { ctx } = chart;

    const { meta } = args;

    const xCoor = meta.data[0].x;

    const yCoor = meta.data[0].y;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '1rem sans-serif';
    ctx.fillText(chart.data.datasets[0].label ?? '', xCoor, yCoor - 10);
    ctx.fillText(`${chart.data.datasets[0].data[0]}%`, xCoor, yCoor + 10);
    ctx.restore();
  },
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
};

type Props = {
  dateRange: {
    from: string;
    end: string;
  };
};

type DoughnutData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

const TypeCostChart = ({ dateRange: { from, end } }: Props) => {
  const [chartData, setChartData] = useState<DoughnutData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.charts.typeCost(from, end);

      const resultData: TypeCostList = result.data;

      const processData: DoughnutData[] = [];

      resultData?.data.forEach((item: TypeCost) => {
        const [backgroundColor, borderColor] = randomColor();

        processData.push({
          labels: [],
          datasets: [
            {
              label: item.name,
              data: [...item.data],
              backgroundColor: [backgroundColor, 'rgba(243, 245, 247, 0.6)'],
              borderColor: [borderColor, 'rgba(243, 245, 247, 1)'],
              borderWidth: 1,
            },
          ],
        });
      });
      setChartData(processData);
    };

    fetchData();
  }, [from, end]);

  return (
    <Card>
      <Row>
        <Col span={24}>
          <Title level={4} style={{ margin: 0, marginBottom: '10px' }}>
            各品類佔比
          </Title>
        </Col>
        {chartData.map((item: DoughnutData) => (
          <Col
            span={24}
            md={3}
            key={item.datasets[0].label}
            style={{ marginBottom: '20px' }}
          >
            <Doughnut data={item} options={options} plugins={[innerLabel]} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default TypeCostChart;
