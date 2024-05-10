/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Modal, Button } from "antd";
import { Add_Subject } from "../../../server/organization/subjects";
const { TextArea } = Input;
const AddSubject = (props) => {
  const { open, setOpen, success, warning, Get_Subjects } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  //form
  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { subject_name, description } = values;

      const doc = {
        subject_name: subject_name,
        description: description,
      };
      Add_Subject(doc).then((res) => {
        Get_Subjects();
        setOpen(false);
        success({ content: "Add Success" });
      });
    } catch {
      console.log("test");
    }
  };
  return (
    <Modal
      title="Add Staff"
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
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Subject"
              name="subject_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="subject" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24}>
            <Form.Item
              label="Description"
              name="description"
              labelCol={{ span: 24 }}
            >
              <TextArea rows={4} placeholder="description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddSubject;
