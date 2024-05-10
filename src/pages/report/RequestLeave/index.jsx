import { Card, Row, Col, Table, Button, message } from "antd";
import { useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
//form
import AddRequestLeave from "./AddRequestLeave";
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
      full_name: "somnak kalan",
      employee_no: "V-1",
      department: "Information Technology ",
      position: "Teaching",
      subject: "Javascript ",
      type: "Early ",
      from: "2-5-2024 ",
      to: "2-5-2024",
      day_leave: "1 ",
      reason: "Sick ",
      status: "pending",
    },
  ];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "No",
      width: 50,
      align: "center",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Employee ID",
      dataIndex: "employee_no",
      key: "employee_no",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Leave Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Day",
      dataIndex: "day_leave",
      key: "day_leave",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <span>
          <Button
            style={{
              margin: 0,
              color: "white",
              border: "none",
              background:
                record.status === "Pending"
                  ? "#add8e6"
                  : record.status === "Reject"
                  ? "#CD5C5C"
                  : "#32CD32",
            }}
          >
            {record.status}
          </Button>
        </span>
      ),
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
          title="Request Leave"
          extra={
            <Button type="primary" onClick={() => setAddOpen(true)}>
              <PlusCircleOutlined />
              Add Request Leave
            </Button>
          }
        >
          {/* add department */}
          <AddRequestLeave
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
