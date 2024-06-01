import {
  Card,
  Row,
  Col,
  Table,
  Button,
  message,
  Breadcrumb,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
//form
import AddRuleForm from "./AddRule";
import UpdateRule from "./UpdateRule";
//end form
const capitalizeText = (text) => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
import {
  Fetch_Schedule_Rule,
  Delete_Schedule_Rule,
} from "../../../server/staffSchedule/scheduleRule";
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  const [schedule_rule, setScheduleRule] = useState([]);
  const [props_data, setPropsData] = useState();
  //notification
  const success = ({ content }) => {
    message.success({
      content: content,
    });
  };
  const warning = ({ content }) => {
    message.warning({
      content: content,
    });
  };
  const Get_Schedule_Rule = () => {
    Fetch_Schedule_Rule().then((res) => {
      console.log(res);
      setScheduleRule(res);
    });
  };
  const On_Delete = (id) => {
    Delete_Schedule_Rule(id).then((res) => {
      success({ content: "Remove Success" });
      Get_Schedule_Rule();
    });
  };
  const on_Get_Data_Record = (data) => {
    setPropsData(data);
    setUpdateOpen(true);
  };
  useEffect(() => {
    Get_Schedule_Rule();
  }, []);
  //end notification
  const default_data = [
    {
      id: 0,
      rule_name: "Late",
      rule_type: "late",
      duration: 15,
      break_time: "",
    },
    {
      id: 1,
      rule_name: "Early",
      rule_type: "early",
      duration: 15,
      break_time: "",
    },
    {
      id: 2,
      rule_name: "Break Time",
      rule_type: "break_time",
      duration: "",
      break_time: { start: "12:00 PM", end: "01:00 PM" },
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("schedule_rule");
    existingData = existingData ? JSON.parse(existingData) : [];

    const notExisting = default_data.filter((el) => {
      return !existingData.some((existing) => existing.id === el.id);
    });
    const updatedData = [...existingData];
    if (notExisting.length > 0) {
      Array.isArray(notExisting) &&
        notExisting.map((el) => {
          updatedData.push(el);
        });
    }
    localStorage.setItem("schedule_rule", JSON.stringify(updatedData));
  }, [window.location.pathname]);
  //
  const data = schedule_rule;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 50,
      align: "center",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Rule Name",
      dataIndex: "rule_name",
      key: "rule_name",
    },
    {
      title: "Type",
      dataIndex: "rule_type",
      key: "rule_type",
      render: (text) => {
        // Convert 'break_time' to 'Break Time'
        if (text === "break_time") {
          return "Break Time";
        }
        // You can add more conditions if needed
        return capitalizeText(text);
      },
    },
    {
      title: "Duration(min) / BreakTime",
      dataIndex: "duration_break_time",
      key: "duration_break_time",
      render: (_, text) => (
        <>
          {text.duration
            ? text.duration + " min"
            : text.break_time
            ? text.break_time.start + " - " + text.break_time.end
            : ""}
        </>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, recorder) => (
        <>
          <span
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          >
            <Popconfirm
              title="Remove the task"
              description="Are you sure to remove this record?"
              onConfirm={() => On_Delete(recorder.id)}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <DeleteOutlined style={{ color: "red", fontSize: "15px" }} />
            </Popconfirm>
          </span>
          <span
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            onClick={() => on_Get_Data_Record(recorder)}
          >
            <FormOutlined style={{ color: "blue", fontSize: "15px" }} />
          </span>
        </>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{ position: "fixed", top: "80px", left: "250px" }}
        items={[
          {
            title: (
              <HomeOutlined
                onClick={() => {
                  navigate("/");
                }}
              />
            ),
          },
          {
            title: "Schedule Rule",
          },
        ]}
      />
      <Row>
        <Col sm={24}>
          <Card
            title="Schedule Rule"
            extra={
              <Button type="primary" onClick={() => setAddOpen(true)}>
                <PlusCircleOutlined />
                Add Schedule Rule
              </Button>
            }
          >
            {/* add rule */}
            <AddRuleForm
              open={add_open}
              setOpen={setAddOpen}
              success={success}
              warning={warning}
              Get_Schedule_Rule={Get_Schedule_Rule}
            />
            {/* end add rule */}
            {/* update rule  */}
            <UpdateRule
              open={update_open}
              setOpen={setUpdateOpen}
              success={success}
              props_data={props_data}
              warning={warning}
              Get_Schedule_Rule={Get_Schedule_Rule}
            />
            {/* end update rule */}
            <Table
              size="small"
              scroll={{ x: "max-content" }}
              columns={columns}
              bordered
              dataSource={data}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Staff;
