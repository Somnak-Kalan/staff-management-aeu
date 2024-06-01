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
import UpdateRequestLeave from "./UpdateRequestLeave";
//end form
import { Fetch_Leave_Type } from "../../../server/report/requestLeave/requestLeave";
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  const [request_leave, setRequestLeave] = useState([]);
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
  const Get_Request_Leave = () => {
    Fetch_Leave_Type().then((res) => {
      console.log(res, " leave type");
      setRequestLeave(res);
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  useEffect(() => {
    Get_Request_Leave();
  }, [window.location.pathname]);
  //
  const default_data = [
    {
      day_option: "full",
      department_id: 0,
      reason: "Sick",
      from_date: "2024-05-30",
      leave_type: 0,
      position_id: 0,
      staff_code: "AEU-01",
      staff_id: 0,
      subject_id: 0,
      to_date: "2024-05-30",
      total_day: "1",
      status: "Accept",
    },
    {
      day_option: "Morning",
      department_id: 1,
      reason: "Sick",
      from_date: "2024-05-30",
      leave_type: 1,
      position_id: 1,
      staff_code: "AEU-02",
      staff_id: 1,
      subject_id: 1,
      to_date: "2024-05-30",
      total_day: "0.5",
      status: "Accept",
    },
    {
      day_option: "full",
      department_id: 2,
      reason: "Sick",
      from_date: "2024-05-30",
      leave_type: 2,
      position_id: 2,
      staff_code: "AEU-03",
      staff_id: 2,
      subject_id: 2,
      to_date: "2024-05-30",
      total_day: "1",
      status: "Pending",
    },
    {
      day_option: "full",
      department_id: 3,
      reason: "Sick",
      from_date: "2024-05-30",
      leave_type: 1,
      position_id: 3,
      staff_code: "AEU-03",
      staff_id: 3,
      subject_id: 3,
      to_date: "2024-05-30",
      total_day: "1",
      status: "Reject",
    },
    {
      day_option: "full",
      department_id: 4,
      reason: "Sick",
      from_date: "2024-05-30",
      leave_type: 0,
      position_id: 4,
      staff_code: "AEU-03",
      staff_id: 4,
      subject_id: 4,
      to_date: "2024-05-30",
      total_day: "1",
      status: "Reject",
    },
    {
      day_option: "full",
      department_id: 5,
      reason: "Sick",
      from_date: "2024-05-30",
      leave_type: 1,
      position_id: 5,
      staff_code: "AEU-03",
      staff_id: 5,
      subject_id: 6,
      to_date: "2024-05-30",
      total_day: "1",
      status: "Reject",
    },
  ];

  useEffect(() => {
    let existingData = localStorage.getItem("request_leave");
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
    localStorage.setItem("request_leave", JSON.stringify(updatedData));
  }, [window.location.pathname]);
  //end notification
  const data = request_leave || [];
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
      // render: (_, recorder) => (
      //   <>
      //     <span
      //       onClick={() => on_Get_Data_Record(recorder)}
      //       style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
      //     >
      //       <FormOutlined style={{ color: "blue", fontSize: "15px" }} />
      //     </span>
      //   </>
      // ),
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
            {/* update  */}
            <UpdateRequestLeave
              open={update_open}
              setOpen={setUpdateOpen}
              success={success}
              warning={warning}
              Get_Request_Leave={Get_Request_Leave}
              props_data={props_data}
            />
            {/* end update  */}
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
