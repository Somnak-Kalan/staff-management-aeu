/* eslint-disable react/prop-types */
import { Form, Select, Input, Row, Col, Modal, Button, DatePicker } from "antd";
const { TextArea } = Input;
const App = (props) => {
  const { open, setOpen, success, warning } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  //form
  const onFinish = async (values) => {
    try {
      await form.validateFields();
      setOpen(false);
      success({ content: "Add Success" });
    } catch {
      warning({ content: "Add Success" });
    }
  };
  //form

  //end upload image
  return (
    <Modal
      title="Add Request Leave"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width="50vw"
      footer={
        <div>
          <Button type="primary" onClick={() => onFinish()}>
            Save
          </Button>
        </div>
      }
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24} xl={12}>
            <Form.Item
              label="Staff Id"
              name="staff_id"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="staff id" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={18} lg={12} xl={12}>
            <Form.Item
              label="Department"
              name="department"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Select
                placeholder="select department"
                allowClear
                options={[
                  {
                    value: "Information Technology",
                    label: "Information Technology",
                  },
                  {
                    value: "Account",
                    label: "Account",
                  },
                ]}
              />{" "}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18} lg={12} xl={12}>
            <Form.Item
              label="Position"
              name="position"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Select
                placeholder="select position"
                allowClear
                options={[
                  {
                    value: "Teaching",
                    label: "Teaching",
                  },
                  {
                    value: "web developer",
                    label: "web developer",
                  },
                ]}
              />{" "}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18} lg={12} xl={12}>
            <Form.Item
              label="Subject"
              name="Subject"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Select
                placeholder="select subject"
                allowClear
                options={[
                  {
                    value: "C++",
                    label: "C++",
                  },
                  {
                    value: "Javascript",
                    label: "Javascript",
                  },
                ]}
              />{" "}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18} lg={12} xl={12}>
            <Form.Item
              label="Staff"
              name="staff"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Select
                placeholder="select subject"
                allowClear
                options={[
                  {
                    value: "somnak kalan",
                    label: "somnk kalan",
                  },
                ]}
              />{" "}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18} lg={12} xl={12}>
            <Form.Item
              label="Leave Type"
              name="leave_type"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Select
                placeholder="select leave type"
                allowClear
                options={[
                  {
                    value: "late",
                    label: "Late",
                  },
                ]}
              />{" "}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18} lg={12} xl={6}>
            <Form.Item
              label="From"
              name="from_date"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
                format="YYYY-MM-DD"
                className="w-full"
                placeholder="from date"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18} lg={12} xl={6}>
            <Form.Item
              label="To"
              name="to_date"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
                format="YYYY-MM-DD"
                className="w-full"
                placeholder="from date"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={18} lg={12} xl={6}>
            <Form.Item
              label="Total Day"
              name="total_day"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="total day" readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Total Day"
              name="total_day"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default App;
