import { useState, useEffect } from "react";
import { Form, Input, Row, Col, Modal, Select, Button, TimePicker } from "antd";

const App = (props) => {
  const { open, setOpen, success, warning } = props;
  const [form] = Form.useForm();
  const [rule_type, setRuleType] = useState();
  const [isBreakTime, setIsBreakTime] = useState(false);

  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const {
        rule_name,
        // break_time,
        // duration,
        rule_type,
        duration_break_time,
      } = values;

      const doc = {
        rule_name: rule_name,
        rule_type: rule_type,
        duration_break_time: duration_break_time
          ? {
              start: dayjs(duration_break_time[0], "HH:mm").format("HH:mm"),
              end: dayjs(duration_break_time[1], "HH:mm").format("HH:mm"),
            }
          : duration_break_time,
        // duration: type !== "break_time" ? duration : 0,
        // break_time: break_time
        //   ? {
        //       start: dayjs(break_time[0], "HH:mm").format("HH:mm"),
        //       end: dayjs(break_time[1], "HH:mm").format("HH:mm"),
        //     }
        //   : {},
      };
      console.log(doc, "test add");
      // Add_Department(doc).then((res) => {
      //   Get_Department();
      //   setOpen(false);
      //   success({ content: "Add Success" });
      // });
    } catch {
      console.log("error");
    }
  };

  const onChange_Rule_Time = async (value) => {
    await setRuleType(value);
    setIsBreakTime(value === "break_time");
  };

  useEffect(() => {
    form.setFieldsValue({ duration_break_time: undefined }); // Reset the field value when rule_type changes
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
