/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Modal, DatePicker, Button } from "antd";
import { Add_Holiday } from "../../../server/organization/holiday";
import dayjs from "dayjs";

const App = (props) => {
  const { open, setOpen, success, warning, Get_Holiday } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  //form
  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { holiday_kh, holiday_en, from_date, to_date } = values;

      const doc = {
        holiday_kh: holiday_kh,
        holiday_en: holiday_en,
        from_date: dayjs(from_date, "DD-MM-YYYY").format("DD-MM-YYYY"),
        to_date: dayjs(to_date, "DD-MM-YYYY").format("DD-MM-YYYY"),
      };
      Add_Holiday(doc).then((res) => {
        Get_Holiday();
        setOpen(false);
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
              label="Holiday(Khmer)"
              name="holiday_kh"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="holiday(khmer)" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Holiday(English)"
              name="holiday_en"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="holiday(english)" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
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
          <Col xs={24} sm={12}>
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
                placeholder="to date"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default App;
