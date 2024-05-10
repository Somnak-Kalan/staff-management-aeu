import { Card, Row, Col, Table, Button, message } from "antd";
import { useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
//form
import ApplyShift from "./ApplyShift";
//end form
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);

  const data = [
    {
      amount_staff: "10",
      schedule_name: "Monday-Friday",
      department_name: "Information Technology",
      description: "Education ",
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
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Schedule",
      dataIndex: "schedule_name",
      key: "schedule_name",
    },
    {
      title: "Staff",
      dataIndex: "amount_staff",
      key: "amount_staff",
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
          title="Apply Schedule"
          extra={
            <Button type="primary" onClick={() => setAddOpen(true)}>
              <PlusCircleOutlined />
              Apply Schedule
            </Button>
          }
        >
          {/* add department */}
          <ApplyShift open={add_open} setOpen={setAddOpen} />
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
