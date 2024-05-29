import { Card, Row, Col, Table, Button, message, Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  HomeOutlined,
} from "@ant-design/icons";
//form
import AddRequestLeave from "./AddRequestLeave";
//end form
import { Fetch_Leave_Type } from "../../../server/report/requestLeave/requestLeave";
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [request_leave, setRequestLeave] = useState([]);
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
  const Get_Request_Leave = () => {
    Fetch_Leave_Type().then((res) => {
      console.log(res, " leave type");
      setRequestLeave(res);
    });
  };
  useEffect(() => {
    Get_Request_Leave();
  }, []);
  //end notification
  const data = request_leave || [];
  // const data = [
  //   {
  //     full_name: "somnak kalan",
  //     employee_no: "V-1",
  //     department: "Information Technology ",
  //     position: "Teaching",
  //     subject: "Javascript ",
  //     type: "Early ",
  //     from: "2-5-2024 ",
  //     to: "2-5-2024",
  //     day_leave: "1 ",
  //     reason: "Sick ",
  //     status: "pending",
  //   },
  // ];
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
      dataIndex: "staff_name",
      key: "staff_name",
    },
    {
      title: "Staff Code",
      dataIndex: "staff_code",
      key: "staff_code",
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Position",
      dataIndex: "position_name",
      key: "position_name",
    },
    {
      title: "subject",
      dataIndex: "subject_name",
      key: "subject_name",
    },
    {
      title: "Leave Type",
      dataIndex: "leave_type_name",
      key: "leave_type_name",
    },
    {
      title: "From",
      dataIndex: "from_date",
      key: "from_date",
    },
    {
      title: "To",
      dataIndex: "to_date",
      key: "to_date",
    },
    {
      title: "Day",
      dataIndex: "total_day",
      key: "total_day",
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
            title: "Request Leave",
          },
        ]}
      />
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
              Get_Request_Leave={Get_Request_Leave}
            />
            {/* end add department */}
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
