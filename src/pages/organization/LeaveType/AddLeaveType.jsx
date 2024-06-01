/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Modal, Select, Button } from "antd";
const { TextArea } = Input;
import { Add_Leave_Type } from "../../../server/organization/leavetype";
import { useState } from "react";
const App = (props) => {
  const { open, setOpen, success, warning, Get_Leave_Type } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  //form
  const onFinish = async () => {
    setLoading(true);
    await new Promise((set_second) => setTimeout(set_second, 1000));
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { leave_type_name, leave_type, description } = values;

      const doc = {
        leave_type_name: leave_type_name,
        leave_type: leave_type,
        description: description,
      };
      Add_Leave_Type(doc).then((res) => {
        Get_Leave_Type();
        setOpen(false);
        setLoading(false);
        form.resetFields();
        success({ content: "Add Success" });
      });
    } catch {
      console.log("test");
    }
  };

  //end upload image
  return (
    <Modal
      title="Add Leave Type"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      // width="65vw"
      footer={
        <div>
          <Button loading={loading} type="primary" onClick={() => onFinish()}>
            Save
          </Button>
        </div>
      }
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Leave Type Name"
              name="leave_type_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="leave type name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
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
                placeholder="select Leave type"
                allowClear // Add this line
                options={[
                  {
                    value: "Annual Leave",
                    label: "Annual Leave",
                  },
                  {
                    value: "Sick Leave",
                    label: "Sick Leave",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Description"
              name="description"
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
