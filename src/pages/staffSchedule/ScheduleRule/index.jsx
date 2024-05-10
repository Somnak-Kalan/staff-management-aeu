import { Card, Row, Col, Table, Button, message } from "antd";
import { useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
//form
import AddRuleForm from "./AddRule";
//end form
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
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
  //end notification
  const data = [
    {
      rule_name: "late time",
      rule_type: "Late",
      duration_break_time: "15 min ",
    },
  ];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
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
    },
    {
      title: "Duration(min) / BreakTime",
      dataIndex: "duration_break_time",
      key: "duration_break_time",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, recoder) => (
        <>
          <span
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "15px" }} />
          </span>
          <span
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          >
            <FormOutlined style={{ color: "blue", fontSize: "15px" }} />
          </span>
        </>
      ),
    },
  ];
  return (
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
          {/* add department */}
          <AddRuleForm
            open={add_open}
            setOpen={setAddOpen}
            success={success}
            warning={warning}
          />
          {/* end add department */}
          <Table
            size="small"
            scroll={{ x: "max-content" }}
            columns={columns}
            dataSource={data}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Staff;
