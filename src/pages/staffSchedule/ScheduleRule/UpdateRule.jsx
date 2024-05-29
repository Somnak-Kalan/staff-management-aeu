import { useState, useEffect } from "react";
import { Form, Input, Row, Col, Modal, Select, Button, TimePicker } from "antd";
import dayjs from "dayjs";
import { Update_Schedule_Rule } from "../../../server/staffSchedule/scheduleRule";
const App = (props) => {
  const { open, setOpen, success, warning, Get_Schedule_Rule, props_data } =
    props;
  const [form] = Form.useForm();
  const [rule_type, setRuleType] = useState();
  const [isBreakTime, setIsBreakTime] = useState(false);

  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { id, rule_name, break_time, duration, rule_type } = values;
      console.log(values, "update");
      const doc = {
        id: id,
        rule_name: rule_name,
        rule_type: rule_type,

        duration: rule_type !== "break_time" ? duration : 0,
        break_time: break_time
          ? {
              start: dayjs(break_time[0], "HH:mm").format("HH:mm A"),
              end: dayjs(break_time[1], "HH:mm").format("HH:mm A"),
            }
          : "",
      };
      Update_Schedule_Rule(doc).then(() => {
        setOpen(false);
        Get_Schedule_Rule();
        success({ content: "Add Success" });
      });
    } catch {
      warning({ content: "Add Fail" });
    }
  };

  const onChange_Rule_Time = async (value) => {
    await setRuleType(value);
    setIsBreakTime(value === "break_time");
  };

  useEffect(() => {
    form.setFieldsValue({ duration_break_time: undefined }); // Reset the field value when rule_type changes
  }, [rule_type]);
  useEffect(() => {
    form.setFieldsValue({
      ...props_data,
      break_time: props_data
        ? [
            dayjs(props_data.break_time.start, "HH:mm"),
            dayjs(props_data.break_time.end, "HH:mm"),
          ]
        : "",
    });
    setRuleType(props_data?.rule_type);
  }, [form, props_data]);
  useEffect(() => {
    if (rule_type === "break_time") {
      setIsBreakTime(true);
    } else {
      setIsBreakTime(false);
    }
  }, [rule_type]);
  return (
    <Modal
      title="Add Schedule Rule"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
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
          <Form.Item hidden name="id">
            <input type="text" />
          </Form.Item>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Rule Name"
              name="rule_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="rule name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Rule Type"
              name="rule_type"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Select
                placeholder="select rule type"
                onChange={onChange_Rule_Time}
                allowClear
                options={[
                  {
                    value: "Late",
                    label: "Late",
                  },
                  {
                    value: "Early",
                    label: "Early",
                  },
                  {
                    value: "break_time",
                    label: "Break Time",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            {isBreakTime ? (
              <Form.Item
                label="Duration(min)/Break Time"
                name="break_time"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "field require!",
                  },
                ]}
              >
                <TimePicker.RangePicker
                  style={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                  format="HH:mm"
                />
              </Form.Item>
            ) : (
              <Form.Item
                label="Duration(min)/Break Time"
                name="duration"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "field require!",
                  },
                ]}
              >
                <Input placeholder="duration(min)" />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default App;
