import { Card, Col, DatePicker, message, Row, Typography } from 'antd';
import type { ChartMeta } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import type { TargetChartData } from '@/dto/ChartDTO';
import $api from '@/plugins/api';

const { Title } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

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
    ctx.fillText(`$${chart.data.datasets[0].data[0]}`, xCoor, yCoor + 10);
    ctx.restore();
  },
};

const options = {
  responsive: true,
  // aspectRatio: 1.4,
  // maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
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

const Target = () => {
  const [year, setYear] = React.useState<number>(dayjs().year());

  const [month, setMonth] = React.useState<number>(dayjs().month() + 1);

  const [chartData, setChartData] = React.useState<DoughnutData[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const [targetAmount, setTargetAmount] = React.useState<{
    target_income: number;
    target_outcome: number;
  }>({
    target_income: 0,
    target_outcome: 0,
  });

  const handleMonthChange = (date: dayjs.Dayjs | null) => {
    if (date !== null) {
      setYear(date.year());
      setMonth(date.month() + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await $api.charts.target({ year, month });

      if (res.status !== 200) {
        messageApi.open({
          type: 'error',
          content: '獲取資料失敗',
        });

        return;
      }

      const resultData: TargetChartData = res.data;

      const processData: DoughnutData[] = [];

      processData.push({
        labels: [],
        datasets: [
          {
            label: '收入',
            data: [...resultData.income],
            backgroundColor: [
              'rgba(0, 238, 118, 0.2)',
              'rgba(243, 245, 247, 0.6)',
            ],
            borderColor: ['rgba(0, 238, 118, 1)', 'rgba(243, 245, 247, 1)'],
            borderWidth: 1,
          },
        ],
      });
      processData.push({
        labels: [],
        datasets: [
          {
            label: '支出',
            data: [...resultData.outcome],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(243, 245, 247, 0.6)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(243, 245, 247, 1)'],
            borderWidth: 1,
          },
        ],
      });

      setChartData(processData);
      setTargetAmount({
        target_income: resultData.target_income,
        target_outcome: resultData.target_outcome,
      });
    };

    fetchData();
  }, [year, month, messageApi]);

  return (
    <>
      {contextHolder}
      <Card style={{ height: '100%' }}>
        <Title level={4} style={{ marginTop: '0' }}>
          當月達成目標
        </Title>
        <DatePicker
          picker="month"
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={handleMonthChange}
          defaultValue={dayjs()}
        />
        <Row justify="space-around" align="middle">
          {chartData.map((item: DoughnutData) => (
            <Col span={24} md={8} key={item.datasets[0].label}>
              <Doughnut data={item} options={options} plugins={[innerLabel]} />
            </Col>
          ))}
          <Col span={24} md={8} key="target-text">
            <div style={{ marginLeft: '10px' }}>
              <span>收入目標金額: </span>
              <span style={{ color: '#52c41a', marginLeft: '5px' }}>
                <br />
                {targetAmount.target_income
                  ? `$${targetAmount.target_income ?? 0}`
                  : '未設定'}
              </span>
              <div style={{ marginTop: '20px' }}>
                <span>支出目標限額: </span>
                <span style={{ color: '#ff4d4f', marginLeft: '5px' }}>
                  <br />
                  {targetAmount.target_outcome
                    ? `$${targetAmount.target_outcome ?? 0}`
                    : '未設定'}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Target;
