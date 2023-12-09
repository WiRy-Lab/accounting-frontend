import React from 'react';
import { DatePicker, Card, Typography } from 'antd';

const { Title } = Typography;

const Filter = () => {
  return (
    <Card>
      <Title level={4} style={{ marginTop: '0' }}>
        篩選區間
      </Title>
      <DatePicker.RangePicker style={{ width: '100%' }} />
    </Card>
  );
};

export default Filter;
