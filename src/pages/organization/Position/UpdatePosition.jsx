/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Modal, Select, Button } from "antd";
import { Update_Position } from "../../../server/position/position";
import { useEffect } from "react";

const UpdatePosition = (props) => {
  const {
    open,
    setOpen,
    success,
    warning,
    department,
    Get_Position,
    props_data,
  } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  //form
  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { id, position_name, department_id, description } = values;

      const doc = {
        id: id,
        position_name: position_name,
        department_id: department_id,
        description: description,
      };
      Update_Position(doc).then((res) => {
        Get_Position();
        setOpen(false);
        success({ content: "Add Success" });
      });
    } catch {
      console.log("test");
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      ...props_data,
      props_data,
    });
  }, [form, props_data]);
  //end upload image
  return (
    <Modal
      title="Add Position"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      // width="65vw"
      footer={
        <div>
          <Button type="primary" onClick={() => onFinish()}>
            Save
          </Button>
        </div>
      }
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item hidden name="id">
          <input type="text" />
        </Form.Item>
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Position"
              name="position_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="position" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Department Name"
              name="department_id"
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
                allowClear // Add this line
                options={
                  Array.isArray(department) &&
                  department.map((el) => ({
                    label: el.department_name,
                    value: el.id,
                  }))
                }
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
              <Input placeholder="description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdatePosition;
