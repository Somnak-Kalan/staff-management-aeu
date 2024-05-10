import { Row, Col, Select, Form } from "antd";

const ApplyShiftToDept = (props) => {
  const { setOpen, success, warning, form, onCheckFinish } = props;

  //form
  return (
    <Form form={form} autoComplete="off">
      <Row gutter={[8, 2]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} className="">
          <Form.Item
            label="Department"
            labelCol={{ span: 24 }}
            name="attendance_rule_id"
            className="m-0 p-0"
            rules={[{ required: true, message: "field require" }]}
          >
            <Select
              placeholder="select department"
              allowClear
              options={[
                {
                  value: "iT",
                  label: "iT",
                },
                {
                  value: "Accounting",
                  label: "Accounting",
                },
              ]}
            />{" "}
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} className="">
          <Form.Item
            label="Schedule"
            labelCol={{ span: 24 }}
            name="attendance_rule_id"
            className="m-0 p-0"
            rules={[{ required: true, message: "field require" }]}
          >
            <Select
              placeholder="select schedule"
              allowClear
              options={[
                {
                  value: "Monday-Friday",
                  label: "Monday-Friday",
                },
                {
                  value: "Monday-Saturday(Half)",
                  label: "Monday-Saturday(Half)",
                },
              ]}
            />{" "}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default ApplyShiftToDept;
