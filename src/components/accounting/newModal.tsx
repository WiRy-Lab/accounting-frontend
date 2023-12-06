import { Modal, Form, Input, DatePicker, Select } from 'antd';

const { TextArea } = Input;

enum AccountType {
  'income',
  'outcome',
}

interface FormData {
  title: string;
  type: AccountType;
  cost: number;
  date: Date;
  description: string;
}

type Props = {
  isOpen: boolean;
  closeCallBack: () => void;
};

const AccountNewModal = ({ isOpen, closeCallBack }: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="新增記帳"
      open={isOpen}
      onOk={closeCallBack}
      onCancel={closeCallBack}
      style={{ top: 20 }}
    >
      <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
        <Form.Item label="日期" required tooltip="This is a required field">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="內容" required tooltip="This is a required field">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="類型" required tooltip="This is a required field">
          <Select>
            <Select.Option value="income">收入</Select.Option>
            <Select.Option value="outcome">支出</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="金額" required tooltip="This is a required field">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="描述" required tooltip="This is a required field">
          <TextArea rows={5} placeholder="input placeholder" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountNewModal;
