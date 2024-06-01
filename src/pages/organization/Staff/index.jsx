import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Popconfirm,
  Breadcrumb,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  HomeOutlined,
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
  //loading
  const [loading, setLoading] = useState(true);
  //end loading
  const Get_Staff_Info = () => {
    Fetch_Staff()
      .then((res) => {
        setStaff(res);
        console.log(res, "test res");
        setLoading(false);
      })
      .catch(() => {
        // setLoading(false);
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
  const default_data = [
    {
      //personal information
      id: 0,
      first_name_kh: "កាឡាន​",
      last_name_kh: "សំណាក់",
      first_name_latin: "Somnak",
      last_name_latin: "Kalan",
      dob: "07-09-2003",
      gender: "",
      marital_status: "Single",
      nation: "Khmer",
      phone: "071 5350 660",
      email: "kalansomnak12@gmail.com",
      id_card: "24500299",
      pob: "kachout village, nhang commune, andong meas district , ratanakiri province.",
      province: "Phnom Penh",
      district: "Meanchay",
      commune: "O b'ek keom",
      village: "Choumk Meas",
      //end personal information
      //company information

      //end company information
    },
    {
      //personal information
      id: 1,
      first_name_kh: "អឿន",
      last_name_kh: "ចាន់ សុខ",
      first_name_latin: "Chansok",
      last_name_latin: "Oeun",
      dob: "07-09-2003",
      gender: "",
      marital_status: "Single",
      nation: "Khmer",
      phone: "071 5350 660",
      email: "kalansomnak12@gmail.com",
      id_card: "24500299",
      pob: "kachout village, nhang commune, andong meas district , ratanakiri province.",
      province: "Phnom Penh",
      district: "Meanchay",
      commune: "O b'ek keom",
      village: "Choumk Meas",
      //end personal information
      //company information

      //end company information
    },
    {
      //personal information
      id: 2,
      first_name_kh: "ផាត",
      last_name_kh: "ឃី",
      first_name_latin: "Khy",
      last_name_latin: "Phat",
      dob: "07-09-2003",
      gender: "",
      marital_status: "Single",
      nation: "Khmer",
      phone: "071 5350 660",
      email: "kalansomnak12@gmail.com",
      id_card: "24500299",
      pob: "kachout village, nhang commune, andong meas district , ratanakiri province.",
      province: "Phnom Penh",
      district: "Meanchay",
      commune: "O b'ek keom",
      village: "Choumk Meas",
      //end personal information
      //company information

      //end company information
    },
    {
      //personal information
      id: 3,
      first_name_kh: "ហួន",
      last_name_kh: "បូរីរតនា",
      first_name_latin: "Boreyrothana",
      last_name_latin: "Oun",
      dob: "07-09-2003",
      gender: "",
      marital_status: "Single",
      nation: "Khmer",
      phone: "071 5350 660",
      email: "kalansomnak12@gmail.com",
      id_card: "24500299",
      pob: "kachout village, nhang commune, andong meas district , ratanakiri province.",
      province: "Phnom Penh",
      district: "Meanchay",
      commune: "O b'ek keom",
      village: "Choumk Meas",
      //end personal information
      //company information

      //end company information
    },
    {
      //personal information
      id: 4,
      first_name_kh: "ឃឹម",
      last_name_kh: "ស្រីហុន",
      first_name_latin: "Sreyhon",
      last_name_latin: "Khim",
      dob: "07-09-2003",
      gender: "",
      marital_status: "Single",
      nation: "Khmer",
      phone: "071 5350 660",
      email: "kalansomnak12@gmail.com",
      id_card: "24500299",
      pob: "kachout village, nhang commune, andong meas district , ratanakiri province.",
      province: "Phnom Penh",
      district: "Meanchay",
      commune: "O b'ek keom",
      village: "Choumk Meas",
      //end personal information
      //company information

      //end company information
    },
    {
      //personal information
      id: 5,
      first_name_kh: "ឆេង",
      last_name_kh: "ហ៊ុយមាន",
      first_name_latin: "Huymean",
      last_name_latin: "Chheng",
      dob: "07-09-2003",
      gender: "",
      marital_status: "Single",
      nation: "Khmer",
      phone: "071 5350 660",
      email: "kalansomnak12@gmail.com",
      id_card: "24500299",
      pob: "kachout village, nhang commune, andong meas district , ratanakiri province.",
      province: "Phnom Penh",
      district: "Meanchay",
      commune: "O b'ek keom",
      village: "Choumk Meas",
      //end personal information
      //company information

      //end company information
    },
  ];
  const company_data = [
    {
      id: 0,
      employee_id: 0,
      company_kh: "សាកលវិឡាល័យ អាស៊ីអឺរុប​ ",
      company_en: "Asia Europe University",
      from_date: "10-5-2014",
      to_date: "10-7-2014",
      staff_id: "AEU-01",
      bank_acc: "ACLIDA",
      join_date: "10-7-2024",
      department_id: 0,
      position_id: 0,
      subject_id: 0,
      leave_type: 0,
      working_time: "Full-Time",
      schedule: "",
      probation_date: "10-5-2014",
      pass_probation_date: "10-7-2014",
    },
    {
      id: 1,
      employee_id: 1,
      company_kh: "សាកលវិឡាល័យ អាស៊ីអឺរុប​ ",
      company_en: "Asia Europe University",
      from_date: "10-5-2014",
      to_date: "10-7-2014",
      staff_id: "AEU-02",
      bank_acc: "ACLIDA",
      join_date: "10-7-2024",
      department_id: 1,
      position_id: 1,
      subject_id: 1,
      leave_type: 1,
      working_time: "Full-Time",
      schedule: "",
      probation_date: "10-5-2014",
      pass_probation_date: "10-7-2014",
    },
    {
      id: 2,
      employee_id: 2,
      company_kh: "សាកលវិឡាល័យ អាស៊ីអឺរុប​ ",
      company_en: "Asia Europe University",
      from_date: "10-5-2014",
      to_date: "10-7-2014",
      staff_id: "AEU-03",
      bank_acc: "ACLIDA",
      join_date: "10-7-2024",
      department_id: 2,
      position_id: 2,
      subject_id: 2,
      leave_type: 2,
      working_time: "Full-Time",
      schedule: "",
      probation_date: "10-5-2014",
      pass_probation_date: "10-7-2014",
    },
    {
      id: 3,
      employee_id: 3,
      company_kh: "សាកលវិឡាល័យ អាស៊ីអឺរុប​ ",
      company_en: "Asia Europe University",
      from_date: "10-5-2014",
      to_date: "10-7-2014",
      staff_id: "AEU-04",
      bank_acc: "ACLIDA",
      join_date: "10-7-2024",
      department_id: 3,
      position_id: 3,
      subject_id: 3,
      leave_type: 0,
      working_time: "Full-Time",
      schedule: "",
      probation_date: "10-5-2014",
      pass_probation_date: "10-7-2014",
    },
    {
      id: 4,
      employee_id: 4,
      company_kh: "សាកលវិឡាល័យ អាស៊ីអឺរុប​ ",
      company_en: "Asia Europe University",
      from_date: "10-5-2014",
      to_date: "10-7-2014",
      staff_id: "AEU-05",
      bank_acc: "ACLIDA",
      join_date: "10-7-2024",
      department_id: 4,
      position_id: 4,
      subject_id: 4,
      leave_type: 1,
      working_time: "Full-Time",
      schedule: "",
      probation_date: "10-5-2014",
      pass_probation_date: "10-7-2014",
    },
    {
      id: 5,
      employee_id: 5,
      company_kh: "សាកលវិឡាល័យ អាស៊ីអឺរុប​ ",
      company_en: "Asia Europe University",
      from_date: "10-5-2014",
      to_date: "10-7-2014",
      staff_id: "AEU-06",
      bank_acc: "ACLIDA",
      join_date: "10-7-2024",
      department_id: 5,
      position_id: 5,
      subject_id: 5,
      leave_type: 2,
      working_time: "Full-Time",
      schedule: "",
      probation_date: "10-5-2014",
      pass_probation_date: "10-7-2014",
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("staff");
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
    localStorage.setItem("staff", JSON.stringify(updatedData));
    //company info
    let existing_company = localStorage.getItem("company");
    existing_company = existing_company ? JSON.parse(existing_company) : [];

    const com_not_existing = company_data.filter((el) => {
      return !existing_company.some(
        (existing_com) => existing_com.id === el.id
      );
    });
    const update_com_existing = [...existing_company];
    if (com_not_existing.length > 0) {
      Array.isArray(com_not_existing) &&
        com_not_existing.map((el) => {
          update_com_existing.push(el);
        });
    }
    localStorage.setItem("company", JSON.stringify(update_com_existing));
  }, [window.location.pathname]);
  const data = staff ? staff : [];
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
        recorder.first_name_kh || recorder.last_name_kh
          ? recorder.first_name_kh + " " + recorder.last_name_kh
          : "" + recorder.last_name_kh
          ? recorder.last_name_kh
          : "",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, recorder) =>
        recorder.first_name_latin || recorder.last_name_latin
          ? recorder.first_name_latin + " " + recorder.last_name_latin
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
        recorder?.company ? recorder.company.join_date : "",
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
      align: "center",
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
            title: "Staff",
          },
        ]}
      />
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
              bordered
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Staff;
