import { Row, Col, Select, Form, Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { Apply_To_Dept } from "../../../server/staffSchedule/apply_shift";

const ApplyShiftToDept = (props) => {
  const {
    setOpen,
    success,
    warning,
    form,
    onCheckFinish,
    department_otp,
    Get_Shift_Opt,
    Get_Shift,
    shift,
    setShift,
  } = props;
  const [department_id, setDepartment_id] = useState();
  const on_Change_Department = (value) => {
    Get_Shift_Opt();
    setDepartment_id(value);
  };
  const onFinish = async (values) => {
    const { department_id, shift_id } = values;
    const doc = {
      department_id: department_id,
      shift_id: shift_id,
    };
    Apply_To_Dept(doc)
      .then(() => {
        success({ content: "add success" });
        Get_Shift();
        setOpen(false);
      })
      .catch(() => {
        warning({ content: "add fail" });
        setOpen(true);
      });
  };
  useEffect(() => {
    if (department_id === undefined) {
      form.setFieldValue("shift_id", null);
    }
  }, [department_id]);
  //form
  return (
    <Form form={form} onFinish={onFinish} autoComplete="off">
      <Row gutter={[8, 2]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} className="">
          <Form.Item
            label="Department"
            labelCol={{ span: 24 }}
            name="department_id"
            className="m-0 p-0"
            rules={[{ required: true, message: "field require" }]}
          >
            <Select
              placeholder="select department"
              onChange={on_Change_Department}
              allowClear
              options={department_otp}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} className="">
          <Form.Item
            label="Schedule"
            labelCol={{ span: 24 }}
            name="shift_id"
            className="m-0 p-0"
            rules={[{ required: true, message: "field require" }]}
          >
            <Select placeholder="select schedule" allowClear options={shift} />
          </Form.Item>
        </Col>
      </Row>

      <div>
        <Flex justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Flex>
      </div>
    </Form>
  );
};
export default ApplyShiftToDept;
