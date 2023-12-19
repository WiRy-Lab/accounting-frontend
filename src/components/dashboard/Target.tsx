import { Card, Col, DatePicker, Row, Typography } from 'antd';
import type { ChartMeta } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

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

const Target = () => {
  return (
    <Card>
      <Title level={4} style={{ marginTop: '0' }}>
        當月達成目標
      </Title>
      <DatePicker
        picker="month"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Row>
        <Col span={24} md={12}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
        <Col span={24} md={12}>
          <Doughnut data={data} options={options} plugins={[innerLabel]} />
        </Col>
      </Row>
    </Card>
  );
};

export default Target;
