/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Modal, Button } from "antd";
import { Add_Department } from "../../../server/department";
const AddDepartment = (props) => {
  const { open, setOpen, success, warning, Get_Department } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  //form
  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { department_name, university_name, description } = values;

      const doc = {
        department_name: department_name,
        university_name: university_name,
        description: description,
      };
      Add_Department(doc).then((res) => {
        Get_Department();
        setOpen(false);
        success({ content: "Add Success" });
      });
    } catch {
      console.log("test");
    }
  };
  //form

  //end upload image
  return (
    <Modal
      title="Add Department"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      // width="65vw"
      footer={
        <Button type="primary" htmlType="submit" onClick={() => onFinish()}>
          Save
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Department"
              name="department_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="department" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              label="University"
              name="university_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="university" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Description"
              name="description"
              labelCol={{ span: 24 }}
            >
              <Input placeholder="description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddDepartment;
