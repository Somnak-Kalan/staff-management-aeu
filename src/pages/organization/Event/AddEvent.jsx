/* eslint-disable react/prop-types */
import { Form, Input, Row, Col, Modal, DatePicker, Button, Radio } from "antd";
const { TextArea } = Input;
import { Add_Event } from "../../../server/organization/events";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const App = (props) => {
  const { open, setOpen, success, warning, Get_Event } = props;
  const [form] = Form.useForm();
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  const [option, setOption] = useState("full_day"); // 'full', 'morning', 'afternoon'
  const [amount_day, setAmountDay] = useState();
  const [loading, setLoading] = useState(false);
  //form
  const onFinish = async () => {
    setLoading(true);
    await new Promise((set_second) => setTimeout(set_second, 1000));
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const { event_name, amount_day, from_date, to_date, description } =
        values;

      const doc = {
        option: option,
        event_name: event_name,
        amount_day: amount_day,
        from_date: dayjs(from_date, "DD-MM-YYYY").format("DD-MM-YYYY"),
        to_date: dayjs(to_date, "DD-MM-YYYY").format("DD-MM-YYYY"),
        description: description,
      };
      Add_Event(doc).then((res) => {
        Get_Event();
        setOpen(false);
        setLoading(false);
        form.resetFields();
        success({ content: "Add Success" });
      });
    } catch {
      console.log("test");
    }
  };
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);

  const getDayDiff = () => {
    if (start_date && end_date) {
      const diff_in_day = end_date.diff(start_date, "day", true);

      let total_day = 0;
      if (option === "morning" || option === "afternoon") {
        //half day
        total_day = diff_in_day + 0.5;
      } else {
        //full day
        total_day = diff_in_day + 1;
      }
      setAmountDay(total_day);
      form.setFieldValue("amount_day", total_day);
    }
    return 0;
  };

  const on_Change_From_Date = (startDate) => {
    setStartDate(startDate);
    setAmountDay(0);
  };

  const on_Change_To_Date = (endDate) => {
    setEndDate(endDate);
    setAmountDay(0);
  };
  const Handle_Change_Day = (e) => {
    const value = e.target.value;
    setOption(value);
  };
  //end upload image
  useEffect(() => {
    if (start_date !== null) {
      getDayDiff();
    }
  }, [start_date]);
  useEffect(() => {
    if (end_date !== null) {
      getDayDiff();
    }
  }, [end_date]);
  useEffect(() => {
    getDayDiff();
  }, [option]);

  return (
    <Modal
      title="Add Leave Type"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div>
          <Button loading={loading} type="primary" onClick={() => onFinish()}>
            Save
          </Button>
        </div>
      }
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Event Name"
              name="event_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <Input placeholder="event name" />
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
                onChange={on_Change_From_Date}
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
                onChange={on_Change_To_Date}
                style={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
                format="YYYY-MM-DD"
                className="w-full"
                placeholder="to date"
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={8}
            className="xs:my-2 sm:my-2 xl:my-0  mx-[2px]"
          >
            <Form.Item
              labelCol={{ span: 24 }}
              className="m-0 p-0 "
              name="type"
              style={{
                border: "solid 1px rgb(217, 217, 217)",
                borderRadius: "5px",
                paddingLeft: "10px",
              }}
            >
              {" "}
              <Radio.Group onChange={Handle_Change_Day} value={option}>
                <Radio value="morning">Morning (half)</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={9}
            className="xs:my-2 sm:my-2  xl:my-0 mx-[2px]"
          >
            <Form.Item
              labelCol={{ span: 24 }}
              style={{
                border: "solid 1px rgb(217, 217, 217)",
                borderRadius: "5px",
                paddingLeft: "10px",
              }}
              className="m-0 p-0 "
              name="type"
            >
              {" "}
              <Radio.Group onChange={Handle_Change_Day} value={option}>
                <Radio value="afternoon">Afternoon (half)</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={7}
            className="xs:my-2 sm:my-2 xl:my-0 mx-[2px]"
            // style={{
            //   border: "solid 1px rgb(217, 217, 217)",
            //   borderRadius: "5px",
            // }}
          >
            <Form.Item
              labelCol={{ span: 24 }}
              style={{
                border: "solid 1px rgb(217, 217, 217)",
                borderRadius: "5px",
                paddingLeft: "10px",
              }}
              className="m-0 p-0 "
              name="type"
            >
              {" "}
              <Radio.Group onChange={Handle_Change_Day} value={option}>
                <Radio value="full_day">Full day</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              style={{
                border: "solid 1px rgb(217, 217, 217)",
                borderRadius: "5px",
                paddingLeft: "10px",
              }}
            >
              Total :{" "}
              <span style={{ color: "blue" }}>
                {amount_day ? amount_day : 0}
              </span>{" "}
              day
            </Form.Item>
            <Form.Item name="amount_day" hidden labelCol={{ span: 24 }}>
              <Input readOnly placeholder="amount day" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Reason"
              name="description"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "field require!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default App;
