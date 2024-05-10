import { Card, Row, Col, Table, Button, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
//form
import MainStaff from "./MainStaff";
import { Fetch_Staff, Delete_Staff } from "../../../server/organization/staff";
import { Delete_Company } from "../../../server/organization/company";
import dayjs from "dayjs";
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
//end form
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  //variable
  const [staff, setStaff] = useState([]);
  //end variable
  const Get_Staff_Info = () => {
    Fetch_Staff().then((res) => {
      setStaff(res);
    });
  };
  const on_Delete_Record = async (id) => {
    Delete_Staff(id);
    Delete_Company(id);
    await new Promise((set_second) => setTimeout(set_second, 1000));
    Get_Staff_Info();
    success({ content: "Remove Success" });
  };
  //useEffect
  useEffect(() => {
    Get_Staff_Info();
  }, []);
  //end useEffect
  const data = staff ? staff : [];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Staff ID",
      dataIndex: "staff_id",
      key: "staff_id",
      render: (_, recorder) =>
        recorder?.company ? recorder.company.staff_id : "",
    },
    {
      title: "Khmer Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, recorder) =>
        recorder.first_name_kh
          ? recorder.first_name_kh
          : "" + recorder.last_name_kh
          ? recorder.last_name_kh
          : "",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, recorder) =>
        recorder.first_name_latin
          ? recorder.first_name_latin
          : "" + recorder.last_name_latin
          ? recorder.last_name_latin
          : "",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, recorder) =>
        recorder?.company ? recorder.departments?.department_name : "",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (_, recorder) =>
        recorder?.company ? recorder.position?.position_name : "",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (_, recorder) =>
        recorder?.company ? recorder.subject?.subject_name : "",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Identity Card",
      dataIndex: "id_card",
      key: "id_card",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Working Time",
      dataIndex: "working_time",
      key: "working_time",
      render: (_, recorder) =>
        recorder?.company ? recorder.company.working_time : "",
    },
    {
      title: "Probation Date",
      dataIndex: "probation_date",
      key: "probation_date",
      render: (_, recorder) =>
        recorder?.company ? recorder.company.probation_date : "",
    },
    {
      title: "Pass Probation",
      dataIndex: "pass_probation",
      key: "pass_probation",
      render: (_, recorder) =>
        recorder?.company ? recorder.company.pass_probation_date : "",
    },
    {
      title: "Join Date",
      dataIndex: "join_date",
      key: "join_date",
      render: (_, recorder) =>
        recorder?.company
          ? dayjs(recorder.company.join_date, "YYYY-MM-DD").format("YYYY-MM-DD")
          : "",
    },
    {
      title: "Bank Acc",
      dataIndex: "bank_acc",
      key: "bank_acc",
      render: (_, recorder) =>
        recorder?.company ? recorder.company.bank_acc : "",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, recorder) => (
        <>
          <span
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          >
            <Popconfirm
              title="Remove the task"
              description="Are you sure to remove this record?"
              onConfirm={() => on_Delete_Record(recorder.id)}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <DeleteOutlined style={{ color: "red", fontSize: "15px" }} />
            </Popconfirm>{" "}
          </span>
          <span
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            // onClick={() => on_Get_Data_Record(recorder)}
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
          title="Staff"
          extra={
            <Button type="primary" onClick={() => setAddOpen(true)}>
              <PlusCircleOutlined />
              Add Staff
            </Button>
          }
        >
          {/* add staff */}
          <MainStaff
            Get_Staff_Info={Get_Staff_Info}
            success={success}
            warning={warning}
            open={add_open}
            setOpen={setAddOpen}
          />
          {/* end add staff */}
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
