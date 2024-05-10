/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const App = (props) => {
  //form
  const {
    form,
    department,
    Get_Position_By_Department_ID,
    position,
    subject,
    leave_type,
  } = props;
  // const onFinish = (values) => {
  //   const {
  //     staff_id,
  //     bank_acc,
  //     join_date,
  //     department_id,
  //     position_id,
  //     subject_id,
  //     working_time,
  //     schedule,
  //     leave_type,
  //     probation_date,
  //     pass_probation_date,
  //   } = values;
  //   const doc = {
  //     staff_id: staff_id,
  //     bank_acc: bank_acc,
  //     join_date: join_date,
  //     department_id: department_id,
  //     position_id: position_id,
  //     subject_id: subject_id,
  //     leave_type: leave_type,
  //     working_time: working_time,
  //     schedule: schedule,
  //     probation_date: probation_date
  //       ? dayjs(probation_date, "YYYY-MM-DD").format("YYYY-MM-DD")
  //       : "",
  //     pass_probation_date: pass_probation_date
  //       ? dayjs(pass_probation_date, "YYYY-MM-DD").format("YYYY-MM-DD")
  //       : "",
  //   };
  //   setCompanyData(doc);
  //   console.log(doc, "hello compa form");
  // };
  // //form
  const on_Change_Department = (value) => {
    Get_Position_By_Department_ID(value);
  };
  //end upload image
  return (
    <Form form={form} autoComplete="off">
      <Row gutter={[8, 2]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
            <Input placeholder="staff id card" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Bank Acc"
            name="bank_acc"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="bank acc" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Join Date"
            name="join_date"
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
              placeholder="join date"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Department"
            name="department_id"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "field require" }]}
          >
            <Select
              placeholder="select department"
              allowClear
              onChange={on_Change_Department}
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
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Position"
            name="position_id"
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
              options={
                Array.isArray(position) &&
                position.map((el) => ({
                  label: el.position_name,
                  value: el.id,
                }))
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Subject"
            name="subject_id"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require ! ",
              },
            ]}
          >
            <Select
              placeholder="select subject"
              allowClear
              options={
                Array.isArray(subject) &&
                subject.map((el) => ({
                  label: el.subject_name,
                  value: el.id,
                }))
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Working Time"
            name="working_time"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select working time"
              allowClear
              options={[
                {
                  value: "Full Time",
                  label: "Full Time",
                },
                {
                  value: "Freelance",
                  label: "Freelance",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item label="Schedule" name="schedule" labelCol={{ span: 24 }}>
            <Select
              placeholder="select schedule"
              allowClear
              options={[
                {
                  value: "Monday Friday",
                  label: "Monday Friday",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Leave Type"
            name="leave_type"
            labelCol={{ span: 24 }}
          >
            <Select
              placeholder="select leave type"
              allowClear
              options={
                Array.isArray(leave_type) &&
                leave_type.map((el) => ({
                  label: el.leave_type_name,
                  value: el.id,
                }))
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Probation Date"
            name="probation_date"
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
              placeholder="probation date"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Pass Probation"
            name="pass_probation_date"
            labelCol={{ span: 24 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
              format="YYYY-MM-DD"
              className="w-full"
              placeholder="pass probation"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default App;
