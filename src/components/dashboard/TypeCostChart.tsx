import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card, Row, Col, Typography } from 'antd';
import type { ChartMeta } from 'chart.js';

const { Title } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

const value = Math.random() * 1000;

const data = {
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [value, value - 1000],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(243, 245, 247, 0.6)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(243, 245, 247, 1)'],
      borderWidth: 1,
    },
  ],
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

    const perc = Math.ceil((chart.data.datasets[0].data[0] / meta.total) * 100);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '1rem sans-serif';
    ctx.fillText(`飲食`, xCoor, yCoor - 10);
    ctx.fillText(`${perc}%`, xCoor, yCoor + 10);
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

const TypeCostChart = () => {
  return (
    <Card>
      <Row>
        <Col span={24}>
          <Title level={4} style={{ margin: 0, marginBottom: '10px' }}>
            各品類佔比
          </Title>
        </Col>
        <Col span={24} md={4}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
        <Col span={24} md={4}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
        <Col span={24} md={4}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
        <Col span={24} md={4}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
        <Col span={24} md={4}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
        <Col span={24} md={4}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
      </Row>
    </Card>
  );
};

export default TypeCostChart;
