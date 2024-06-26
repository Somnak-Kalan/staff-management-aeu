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
import dayjs from "dayjs";
import { useState } from "react";
import { Add_Shift } from "../../../server/staffSchedule/shift";
const CreateForm = (props) => {
  const { open, setOpen, success, warning, Get_Shift } = props;
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  const [form] = Form.useForm();
  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldValue();
      const {
        attendance_rule_id,
        shift_name,
        monday_morning,
        monday_afternoon,
        tuesday_morning,
        tuesday_afternoon,
        wednesday_morning,
        wednesday_afternoon,
        thursday_morning,
        thursday_afternoon,
        friday_morning,
        friday_afternoon,
        saturday_morning,
        saturday_afternoon,
        sunday_morning,
        sunday_afternoon,
      } = values;
      const attendance_rule_ids = Array.isArray(attendance_rule_id)
        ? attendance_rule_id
        : [attendance_rule_id];

      const doc = {
        shift_name: shift_name,
        attendance_rule_ids: attendance_rule_ids,
        attendance: {
          monday: {
            morning: {
              start: dayjs(
                monday_morning ? monday_morning[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                monday_morning ? monday_morning[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
            afternoon: {
              start: dayjs(
                monday_afternoon ? monday_afternoon[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                monday_afternoon ? monday_afternoon[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
          },

          tuesday: {
            morning: {
              start: dayjs(
                tuesday_morning ? tuesday_morning[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                tuesday_morning ? tuesday_morning[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
            afternoon: {
              start: dayjs(
                tuesday_afternoon ? tuesday_afternoon[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                tuesday_afternoon ? tuesday_afternoon[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
          },
          wednesday: {
            morning: {
              start: dayjs(
                wednesday_morning ? wednesday_morning[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                wednesday_morning ? wednesday_morning[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
            afternoon: {
              start: dayjs(
                wednesday_afternoon ? wednesday_afternoon[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                wednesday_afternoon ? wednesday_afternoon[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
          },
          thursday: {
            morning: {
              start: dayjs(
                thursday_morning ? thursday_morning[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                thursday_morning ? thursday_morning[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
            afternoon: {
              start: dayjs(
                thursday_afternoon ? thursday_afternoon[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                thursday_afternoon ? thursday_afternoon[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
          },
          friday: {
            morning: {
              start: dayjs(
                friday_morning ? friday_morning[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                friday_morning ? friday_morning[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
            afternoon: {
              start: dayjs(
                friday_afternoon ? friday_afternoon[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                friday_afternoon ? friday_afternoon[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
          },
          saturday: {
            morning: {
              start: dayjs(
                saturday_morning ? saturday_morning[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                saturday_morning ? saturday_morning[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
            afternoon: {
              start: dayjs(
                saturday_afternoon ? saturday_afternoon[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                saturday_afternoon ? saturday_afternoon[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
          },
          sunday: {
            morning: {
              start: dayjs(
                sunday_morning ? sunday_morning[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                sunday_morning ? sunday_morning[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
            afternoon: {
              start: dayjs(
                sunday_afternoon ? sunday_afternoon[0] : null,
                "HH:mm"
              ).format("HH:mm A"),
              end: dayjs(
                sunday_afternoon ? sunday_afternoon[1] : null,
                "HH:mm"
              ).format("HH:mm A"),
            },
          },
        },
      };
      Add_Shift(doc).then(() => {
        success({ content: "Add Success" });
        Get_Shift();
        setOpen(false);
        form.resetFields();
      });
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
