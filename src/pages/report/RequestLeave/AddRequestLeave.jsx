/* eslint-disable react/prop-types */
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
const { TextArea } = Input;
import { Filter_Staff } from "../../../server/filters/staff";
import { Filter_Department_By_ID } from "../../../server/options/departmentId";
import { Fetch_Staff_Otp_Follow_Department } from "../../../server/options/employee";
import { Filter_Position_By_ID } from "../../../server/options/positionid";
import { Filter_Subject_By_ID } from "../../../server/options/subject";
import { Fetch_Company_By_Department_Id } from "../../../server/options/company";
import { Fetch_Leave_Type_Option } from "../../../server/options/LeaveType";
//form add leave type
import { Add_Request_Leave } from "../../../server/report/requestLeave/requestLeave";
//end form add leave type
import { useEffect, useState } from "react";
import dayjs from "dayjs";
const App = (props) => {
  const { open, setOpen, success, warning, Get_Request_Leave } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  //variable
  const [company, setCompany] = useState([]);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [subject, setSubject] = useState([]);
  const [staff, setStaff] = useState([]);
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [dayOption, setDayOption] = useState("full");
  const [leave_type, setLeaveType] = useState([]);

  //end variable
  const Get_Leave_Type_Option = () => {
    Fetch_Leave_Type_Option().then((res) => {
      console.log(res);
      setLeaveType(res);
    });
  };
  useEffect(() => {
    Get_Leave_Type_Option();
  }, []);
  //form
  const onFinish = async (values) => {
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
    Add_Request_Leave(doc)
      .then(() => {
        setOpen(false);
        Get_Request_Leave();
        success({ content: "add success" });
      })
      .error(() => {
        warning({ content: "add fail" });
      });
  };
  //form
  const on_Change_Staff = (event) => {
    const staff_code = event.target.value.toUpperCase();

    Filter_Staff(staff_code)
      .then((res) => {
        if (!res) {
          throw new Error("Staff not found");
        }

        // Fetch related data based on staff details
        return Promise.all([
          Fetch_Company_By_Department_Id(res.departments.id),
          Fetch_Staff_Otp_Follow_Department(res.id),
          Filter_Department_By_ID(res.departments.id),
          Filter_Position_By_ID(res.position.id),
          Filter_Subject_By_ID(res.subject.id),
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

            // Set form values
            form.setFieldValue("department_id", res.departments?.id);
            form.setFieldValue("position_id", res.position?.id);
            form.setFieldValue("subject_id", res.subject?.id);
            form.setFieldValue("staff_id", res.id);

            console.log(res.departments?.id, "test");
          }
        );
      })
      .catch((error) => {
        console.error(error.message);
      });
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

  //end upload image
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
              label="Staff"
              name="staff_id"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Select placeholder="select subject" allowClear options={staff} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={12}>
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
          <Col xs={24} sm={24} xl={12}>
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
                onChange={handleFromDateChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={12}>
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
                placeholder="from date"
                onChange={handleToDateChange}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} xl={12}>
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
              <Input placeholder="total day" readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} xl={12}>
            <Form.Item
              label="Day Option"
              name="day_option"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Field required!",
                },
              ]}
            >
              <Radio.Group onChange={handleDayOptionChange} value={dayOption}>
                <Radio value="morning">Morning</Radio>
                <Radio value="afternoon">Afternoon</Radio>
                <Radio value="full">Full Day</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item label="Reason" name="reason" labelCol={{ span: 24 }}>
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          {/* <Col xs={24} sm={24}> */}

          {/* </Col> */}
        </Row>
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default App;
