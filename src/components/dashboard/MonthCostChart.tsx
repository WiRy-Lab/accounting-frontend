import { Card, Flex, message, Space, Statistic, Typography } from 'antd';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title as ChartTitle,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import $api from '@/plugins/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

const { Title } = Typography;

type Props = {
  dateRange: {
    from: string;
    end: string;
  };
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

const MonthCostChart = ({ dateRange: { from, end } }: Props) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.charts.rangeCost(from, end);

      if (result.status !== 200) {
        messageApi.open({
          type: 'error',
          content: '時間範圍過短或區間沒有資料!',
        });

        return;
      }

      const resultData = result.data;

      setChartData({
        labels: [...resultData.labels],
        datasets: [
          {
            label: '收入',
            data: [...resultData.income],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: '支出',
            data: [...resultData.outcome],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    };

    fetchData();
  }, [from, end, messageApi]);

  return (
    <>
      {contextHolder}
      <Card style={{ height: '100%' }}>
        <Space
          direction="vertical"
          size={16}
          style={{ display: 'flex', width: '100%' }}
        >
          <Flex gap="large" align="center" justify="space-between">
            <Title level={3} style={{ margin: 0 }}>
              區間內消費曲線
            </Title>
            <Flex gap="large">
              <Statistic
                title="區間收入 (TWD)"
                prefix="$"
                value={chartData.datasets[0]?.data.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                )}
                valueStyle={{
                  color: '#3f8600',
                }}
              />
              <Statistic
                title="區間支出 (TWD)"
                prefix="$"
                value={chartData.datasets[1]?.data.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                )}
                valueStyle={{
                  color: '#cf1322',
                }}
              />
            </Flex>
          </Flex>

          <Line options={options} data={chartData} />
        </Space>
      </Card>
    </>
  );
};

export default MonthCostChart;
