import { useEffect, useState } from "react";
import {
  Form,
  Select,
  Input,
  Row,
  Col,
  Modal,
  Radio,
  DatePicker,
  Button,
  Flex,
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;

const isServer = typeof window === "undefined";

let Filter_Staff,
  Filter_Department_By_ID,
  Fetch_Staff_Otp_Follow_Department,
  Filter_Position_By_ID,
  Filter_Subject_By_ID,
  Fetch_Company_By_Department_Id,
  Fetch_Leave_Type_Option,
  Add_Request_Leave;

if (isServer) {
  Filter_Staff = require("../../../server/filters/staff").Filter_Staff;
  Filter_Department_By_ID =
    require("../../../server/options/departmentId").Filter_Department_By_ID;
  Fetch_Staff_Otp_Follow_Department =
    require("../../../server/options/employee").Fetch_Staff_Otp_Follow_Department;
  Filter_Position_By_ID =
    require("../../../server/options/positionid").Filter_Position_By_ID;
  Filter_Subject_By_ID =
    require("../../../server/options/subject").Filter_Subject_By_ID;
  Fetch_Company_By_Department_Id =
    require("../../../server/options/company").Fetch_Company_By_Department_Id;
  Fetch_Leave_Type_Option =
    require("../../../server/options/LeaveType").Fetch_Leave_Type_Option;
  Add_Request_Leave =
    require("../../../server/report/requestLeave/requestLeave").Add_Request_Leave;
}

const App = (props) => {
  const { open, setOpen, success, warning, Get_Request_Leave } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  // Variable states
  const [company, setCompany] = useState([]);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [subject, setSubject] = useState([]);
  const [staff, setStaff] = useState([]);
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [dayOption, setDayOption] = useState("full");
  const [leave_type, setLeaveType] = useState([]);
  const [loading, setLoading] = useState(false);

  const Get_Leave_Type_Option = () => {
    if (isServer) {
      Fetch_Leave_Type_Option().then((res) => {
        setLeaveType(res);
      });
    }
  };

  useEffect(() => {
    Get_Leave_Type_Option();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    await new Promise((set_second) => setTimeout(set_second, 1000));

    const {
      day_option,
      department_id,
      reason,
      from_date,
      leave_type,
      position_id,
      staff_code,
      staff_id,
      subject_id,
      to_date,
      total_day,
    } = values;

    const doc = {
      day_option,
      department_id,
      reason,
      leave_type,
      position_id,
      staff_code,
      staff_id,
      subject_id,
      from_date: dayjs(from_date, "HH:mm").format("HH:mm A"),
      to_date: dayjs(to_date, "HH:mm").format("HH:mm A"),
      total_day,
    };

    if (isServer) {
      Add_Request_Leave(doc)
        .then(() => {
          setOpen(false);
          Get_Request_Leave();
          setLoading(false);
          form.resetFields();
          success({ content: "add success" });
        })
        .catch(() => {
          warning({ content: "add fail" });
        });
    }
  };

  const on_Change_Staff = (event) => {
    const staff_code_value = event.target.value.toUpperCase();
    if (isServer) {
      Filter_Staff(staff_code_value)
        .then((res) => {
          if (!res) {
            throw new Error("Staff not found");
          }
          return Promise.all([
            Fetch_Company_By_Department_Id(res.departments?.id),
            Fetch_Staff_Otp_Follow_Department(res?.id),
            Filter_Department_By_ID(res.departments?.id),
            Filter_Position_By_ID(res.position?.id),
            Filter_Subject_By_ID(res.subject?.id),
          ]).then(
            ([
              res_company,
              res_staff,
              res_department,
              res_position,
              res_subject,
            ]) => {
              setCompany(res_company);
              setStaff(res_staff);
              setDepartment(res_department);
              setPosition(res_position);
              setSubject(res_subject);

              form.setFieldValue("department_id", res.departments?.id);
              form.setFieldValue("position_id", res.position?.id);
              form.setFieldValue("subject_id", res.subject?.id);
              form.setFieldValue("staff_id", res.id);
            }
          );
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const calculateTotalDays = (from, to, option) => {
    if (from && to) {
      let diff = dayjs(to).diff(dayjs(from), "day") + 1;
      if (option === "morning" || option === "afternoon") {
        diff = 0.5; // Half-day options
      }
      form.setFieldsValue({ total_day: diff });
    } else {
      form.setFieldsValue({ total_day: "" });
    }
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
    calculateTotalDays(date, toDate, dayOption);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
    calculateTotalDays(fromDate, date, dayOption);
  };

  const handleDayOptionChange = (e) => {
    const option = e.target.value;
    setDayOption(option);
    calculateTotalDays(fromDate, toDate, option);
  };

  return (
    <Modal
      title="Add Request Leave"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width="50vw"
      footer=""
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24} xl={12}>
            <Form.Item
              label="Staff Id"
              name="staff_code"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input onChange={on_Change_Staff} placeholder="staff Code" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} xl={12}>
            <Form.Item
              label="Department"
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
                allowClear
                options={department}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={12}>
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
                options={position}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={12}>
            <Form.Item
              label="Subject"
              name="subject_id"
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
                options={subject}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} xl={12}>
            <Form.Item
              label="From Date"
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
                format={"DD-MM-YYYY"}
                onChange={handleFromDateChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={12}>
            <Form.Item
              label="To Date"
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
                format={"DD-MM-YYYY"}
                onChange={handleToDateChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={24}>
            <Form.Item
              label="Day Option"
              name="day_option"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Radio.Group onChange={handleDayOptionChange}>
                <Radio value="full">Full Day</Radio>
                <Radio value="morning">Morning</Radio>
                <Radio value="afternoon">Afternoon</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={24}>
            <Form.Item
              label="Reason"
              name="reason"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <TextArea placeholder="Leave Reason" rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={24}>
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
              <Input placeholder="total day" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} xl={24}>
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
                options={leave_type}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default App;
