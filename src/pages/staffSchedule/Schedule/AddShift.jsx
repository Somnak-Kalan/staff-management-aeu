import {
  TimePicker,
  //   DatePicker,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Select,
  Modal,
  Button,
} from "antd";
import { useState } from "react";
const CreateForm = (props) => {
  const { open, setOpen, success, warning } = props;
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      await form.validateFields();
      setOpen(false);
      success({ content: "Add Success" });
    } catch {
      warning({ content: "Add Fail" });
    }
  };
  const list_attendance_rule = [
    {
      id: 1,
      attendance_rule_name: "15 min",
    },
  ];
  const [checkDay, setCheckDay] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const forms = [
    {
      label: "Monday",
      name: "monday",
      morning: "monday_morning",
      afternoon: "monday_afternoon",
    },
    {
      label: "Tuesday",
      name: "tuesday",
      morning: "tuesday_morning",
      afternoon: "tuesday_afternoon",
    },
    {
      label: "Wednesday",
      name: "wednesday",
      morning: "wednesday_morning",
      afternoon: "wednesday_afternoon",
    },
    {
      label: "Thursday",
      name: "thursday",
      morning: "thursday_morning",
      afternoon: "thursday_afternoon",
    },
    {
      label: "Friday",
      name: "friday",
      morning: "friday_morning",
      afternoon: "friday_afternoon",
    },
    {
      label: "Saturday",
      name: "saturday",
      morning: "saturday_morning",
      afternoon: "saturday_afternoon",
    },
    {
      label: "Sunday",
      name: "sunday",
      morning: "sunday_morning",
      afternoon: "sunday_afternoon",
    },
  ];

  return (
    <>
      <Modal
        title="Add Staff"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width="48vw"
        footer={
          <div>
            <Button type="primary" onClick={() => onFinish()}>
              Save
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <div className="">
              <Row className="mb-5" gutter={[8, 2]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="">
                  <Form.Item
                    name="shift_name"
                    label="Shift Name"
                    labelCol={{ span: 24 }}
                    className="m-0 p-0"
                    rules={[
                      {
                        required: true,
                        message: "Field is required",
                      },
                    ]}
                  >
                    <Input placeholder="Shift Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="">
                  <Form.Item
                    label="Attendance Rule"
                    labelCol={{ span: 24 }}
                    name="attendance_rule_id"
                    className="m-0 p-0"
                    rules={[{ required: true, message: "field require" }]}
                  >
                    <Select
                      mode="multiple"
                      // style={{
                      //   width: '300px',
                      // }}
                      placeholder="select one country"
                      optionLabelProp="label"
                      options={list_attendance_rule.map((option) => ({
                        label: option?.attendance_rule_name,
                        value: option.id,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {forms.map((element, index) => (
                <div key={index}>
                  <Row className="" key={index}>
                    <Col xs={8} lg={4} xl={4}>
                      <label htmlFor="">{element.label}</label>
                    </Col>
                    <Col xs={4} lg={1} xl={1}>
                      :
                    </Col>
                    <Col lg={1} xl={1}>
                      <Form.Item
                        name={element.name}
                        valuePropName="checked"
                        className="mb-4"
                      >
                        <Checkbox
                          className="mb-2"
                          checked={checkDay[element.name]}
                          onChange={(e) => {
                            setCheckDay((pre) => {
                              pre[element.name] = e.target.checked;
                              return { ...pre };
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    {/* TimePicker RangePicker */}
                    <Col xs={24} sm={24} lg={18} xl={18}>
                      {checkDay[element.name] ? (
                        <>
                          <Row gutter={[8, 2]} style={{ display: "flex" }}>
                            <Col xs={24} sm={24} xl={12} className="">
                              {/* <span>Morning</span> */}

                              <Form.Item
                                label="Morning"
                                labelCol={{ span: 24 }}
                                className="m-0 p-0"
                                name={element.morning}
                                rules={[
                                  {
                                    required:
                                      element.name === "saturday" ||
                                      element.name === "sunday"
                                        ? false
                                        : true,
                                    message: "field require",
                                  },
                                ]}
                              >
                                <TimePicker.RangePicker
                                  style={{ width: "100%" }}
                                  inputStyle={{ width: "100%" }}
                                  format="HH:mm "
                                  className=" sm:w-full "
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} xl={12} className="">
                              {/* <span>Afternoon</span> */}
                              <Form.Item
                                label="Afternoon"
                                labelCol={{ span: 24 }}
                                className="m-0 p-0"
                                name={element.afternoon}
                                rules={[
                                  {
                                    required:
                                      element.name === "saturday" ||
                                      element.name === "sunday"
                                        ? false
                                        : true,
                                    message: "field require",
                                  },
                                ]}
                              >
                                <TimePicker.RangePicker
                                  style={{ width: "100%" }}
                                  inputStyle={{ width: "100%" }}
                                  format="HH:mm "
                                  className=" sm:w-full "
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          <Row gutter={[8, 2]} className="flex">
                            <Col xs={24} sm={24} xl={12} className="">
                              {/* <span>Morning</span> */}
                              <Form.Item
                                label="Morning"
                                labelCol={{ span: 24 }}
                                className="m-0 p-0"
                                rules={[
                                  {
                                    required:
                                      element.name === "saturday" ||
                                      element.name === "sunday"
                                        ? false
                                        : true,
                                    message: "field require",
                                  },
                                ]}
                              >
                                <TimePicker.RangePicker
                                  style={{ width: "100%" }}
                                  inputStyle={{ width: "100%" }}
                                  format="HH:mm"
                                  disabled
                                  className=" sm:w-full "
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} xl={12} className=" ">
                              {/* <span>Afternoon</span> */}
                              <Form.Item
                                label="Afternoon"
                                labelCol={{ span: 24 }}
                                className="m-0 p-0"
                                rules={[
                                  {
                                    required:
                                      element.name === "saturday" ||
                                      element.name === "sunday"
                                        ? false
                                        : true,
                                    message: "field require",
                                  },
                                ]}
                              >
                                <TimePicker.RangePicker
                                  style={{ width: "100%" }}
                                  inputStyle={{ width: "100%" }}
                                  format="HH:mm"
                                  disabled
                                  className=" sm:w-full "
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default CreateForm;
