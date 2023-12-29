import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, message, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';

import $api from '@/plugins/api';

type Props = {
  dateRange: {
    from: string;
    end: string;
  };
};

type FetchData = {
  from: string;
  end: string;
  prev_from: string;
  prev_end: string;
  income_change: number;
  outcome_change: number;
};

const SpendCost = ({ dateRange: { from, end } }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState<FetchData>({
    from: '',
    end: '',
    prev_from: '',
    prev_end: '',
    income_change: 0,
    outcome_change: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.charts.compareCost(from, end);

      if (result.status !== 200) {
        messageApi.open({
          type: 'error',
          content: '資料獲取失敗！',
        });

        return;
      }
      setData(result.data);
    };

    fetchData();
  }, [from, end, messageApi]);

  return (
    <>
      {contextHolder}
      <Card bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="區間收入成長率"
              value={data?.income_change <= -100.0 ? '∞' : data?.income_change}
              precision={2}
              valueStyle={{
                color: data?.income_change < 0 ? '#3f8600' : '#cf1322',
              }}
              prefix={
                data?.income_change < 0 ? (
                  <ArrowDownOutlined />
                ) : (
                  <ArrowUpOutlined />
                )
              }
              suffix="%"
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="區間支出成長率"
              value={
                data?.outcome_change <= -100.0 ? '∞' : data?.outcome_change
              }
              precision={2}
              valueStyle={{
                color: data?.outcome_change < 0 ? '#3f8600' : '#cf1322',
              }}
              prefix={
                data?.outcome_change < 0 ? (
                  <ArrowDownOutlined />
                ) : (
                  <ArrowUpOutlined />
                )
              }
              suffix="%"
            />
          </Col>
          <Col span={24}>
            <div style={{ marginTop: '10px', color: '#8c8c8c' }}>
              <span>比較區間: </span>
              <span style={{ marginLeft: '5px' }}>
                {data.prev_from} ~ {data.prev_end}
              </span>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SpendCost;
