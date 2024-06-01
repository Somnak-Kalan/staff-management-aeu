/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Modal, Button } from "antd";
import { Update_Department } from "../../../server/department";
import { useEffect, useState } from "react";
const UpdateDepartment = (props) => {
  const { open, setOpen, success, warning, Get_Department, props_data } = props;
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
      const { id, department_name, university_name, description } = values;

      const doc = {
        id: id,
        department_name: department_name,
        university_name: university_name,
        description: description,
      };
      Update_Department(doc).then((res) => {
        Get_Department();
        setOpen(false);
        setLoading(false);
        success({ content: "Add Success" });
      });
    } catch {
      console.log("test");
      warning({ content: "add fail" });
    }
  };
  //form
  useEffect(() => {
    form.setFieldsValue({
      ...props_data,
      props_data,
    });
  }, [form, props_data]);
  //end upload image
  const onFinishFailed = () => {
    console.log("tese");
  };
  return (
    <Modal
      title="Update Department"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      // width="65vw"
      footer={
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          onClick={() => onFinish()}
        >
          Save
        </Button>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item hidden name="id">
          <input type="text" />
        </Form.Item>
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

export default UpdateDepartment;
