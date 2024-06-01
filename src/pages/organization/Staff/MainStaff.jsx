// MainStaff.jsx
import { useEffect, useState } from "react";
import { Button, Modal, message, Steps, Form } from "antd";
import AddPersonalInfo from "./AddPersonalInfo";
import AddCompanyInfo from "./AddCompanyInfo";
import dayjs from "dayjs";
//staff
import { Add_Staff } from "../../../server/organization/staff";
import { Fetch_Department } from "../../../server/department";
import { Add_Company } from "../../../server/organization/company";
import { Fetch_Position_By_Department_Id } from "../../../server/options/position";
import { Fetch_Subject } from "../../../server/organization/subjects";
import { Fetch_Leave_Type } from "../../../server/organization/leavetype";
//end staff
const MainStaff = (props) => {
  const { open, setOpen, Get_Staff_Info, success, warning } = props;
  const [current, setCurrent] = useState(0);
  const [form_personal_info] = Form.useForm();
  const [form_company_info] = Form.useForm();
  const [get_personal_data, setGetPersonalData] = useState();
  const [get_company_data, setGetCompanyData] = useState();
  const [is_personal_add, setPersonalAdd] = useState(false);
  const [is_company_add, setCompanyAdd] = useState(false);
  const [department, setDepartment] = useState([]);
  const [leave_type, setLeaveType] = useState([]);
  const [position, setPosition] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);
  const Get_Department = () => {
    Fetch_Department().then((res) => {
      setDepartment(res);
    });
  };
  const Get_Position_By_Department_ID = (id) => {
    Fetch_Position_By_Department_Id(id).then((res) => {
      setPosition(res);
    });
  };
  const Get_Subject = () => {
    Fetch_Subject().then((res) => {
      setSubject(res);
    });
  };
  const Get_Leave_Type = () => {
    Fetch_Leave_Type().then((res) => {
      setLeaveType(res);
    });
  };
  useEffect(() => {
    Get_Department();
    Get_Subject();
    Get_Leave_Type();
  }, []);
  const next = async () => {
    try {
      await form_personal_info.validateFields();
      setCurrent(current + 1);
      Get_Department();
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const save = async () => {
    setLoading(true);

    await new Promise((set_second) => setTimeout(set_second, 1000));

    try {
      (await form_personal_info.validateFields()) &&
        (await form_company_info.validateFields());
      const personal_value = form_personal_info.getFieldValue();
      const company_value = form_company_info.getFieldsValue();
      //personal info
      const {
        first_name_kh,
        last_name_kh,
        first_name_latin,
        last_name_latin,
        dob,
        gender,
        marital_status,
        nation,
        phone,
        email,
        id_card,
        pob,
        province,
        district,
        commune,
        village,
      } = personal_value;
      const doc_personal = {
        first_name_kh: first_name_kh,
        last_name_kh: last_name_kh,
        first_name_latin: first_name_latin,
        last_name_latin: last_name_latin,
        dob: dob ? dayjs(dob, "YYYY-MM-DD").format("YYYY-MM-DD") : "",
        gender: gender,
        marital_status: marital_status,
        nation: nation,
        phone: phone,
        email: email,
        id_card: id_card,
        pob: pob,
        province: province,
        district: district,
        commune: commune,
        village: village,
      };
      Add_Staff(doc_personal).then((res) => {
        setPersonalAdd(true);
      });

      const {
        staff_id,
        bank_acc,
        join_date,
        department_id,
        position_id,
        subject_id,
        working_time,
        schedule,
        leave_type,
        probation_date,
        pass_probation_date,
      } = company_value;
      const doc_company = {
        staff_id: staff_id,
        bank_acc: bank_acc,
        join_date: join_date,
        department_id: department_id,
        position_id: position_id,
        subject_id: subject_id,
        leave_type: leave_type,
        working_time: working_time,
        schedule: schedule,
        probation_date: probation_date
          ? dayjs(probation_date, "YYYY-MM-DD").format("YYYY-MM-DD")
          : "",
        pass_probation_date: pass_probation_date
          ? dayjs(pass_probation_date, "YYYY-MM-DD").format("YYYY-MM-DD")
          : "",
      };
      Add_Company(doc_company).then((res) => {
        setCompanyAdd(true);
      });
      setLoading(false);
      setOpen(false);
      Get_Staff_Info();
      success({ content: "add success" });
      await new Promise((set_second) => setTimeout(set_second, 500));
      form_company_info.resetFields();
      form_personal_info.resetFields();
    } catch (error) {
      console.error("Validation Error:", error);
      warning({ content: "add fail" });
    }
  };

  const steps = [
    {
      title: "Personal Info",
      content: (
        <AddPersonalInfo
          form={form_personal_info}
          // setPersonalData={setGetPersonalData()}
        />
      ),
    },
    {
      title: "Company Info",
      content: (
        <AddCompanyInfo
          department={department}
          position={position}
          subject={subject}
          leave_type={leave_type}
          Get_Position_By_Department_ID={Get_Position_By_Department_ID}
          form={form_company_info}
          // setCompanyData={setGetCompanyData()}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  return (
    <>
      <Modal
        title="Add Staff"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width="65vw"
        footer={
          <div>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button loading={loading} type="primary" onClick={() => save()}>
                Save
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        }
      >
        <Steps current={current} items={items} />
        <div style={{ marginTop: 16 }}>{steps[current].content}</div>
      </Modal>
    </>
  );
};

export default MainStaff;
