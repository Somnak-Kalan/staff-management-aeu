import { Card, Modal, Tabs, Button, Form, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import ApplyShiftToDept from "./ApplyShiftToDept";
import ApplyShiftToEmployee from "./ApplyShiftToEmployee";
import { Fetch_Department_Option } from "../../../server/options/department";
import { Fetch_Shift_Opt } from "../../../server/options/shift";
import { useEffect, useState } from "react";
const ApplyShift = (props) => {
  const { open, setOpen, Get_Shift } = props;
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  const [ee_form] = Form.useForm();
  const [dept_form] = Form.useForm();
  //variable
  const [department_otp, setDepartmentOpt] = useState([]);
  const [shift, setShift] = useState([]);
  const [employee, setEmployee] = useState([]);

  //end variable
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
  const Get_Department_Option = () => {
    Fetch_Department_Option().then((res) => {
      setDepartmentOpt(res);
    });
  };
  const Get_Shift_Opt = () => {
    Fetch_Shift_Opt().then((res) => {
      setShift(res);
    });
  };
  useEffect(() => {
    Get_Department_Option();
  }, []);

  //end notification
  /*-----------------Function Modal--------------------*/

  const items = [
    {
      key: "1",
      label: "Apply Shift  to Department",
      children: (
        <ApplyShiftToDept
          form={dept_form}
          setOpen={setOpen}
          success={success}
          warning={warning}
          shift={shift}
          setShift={setShift}
          Get_Shift_Opt={Get_Shift_Opt}
          department_otp={department_otp}
          Get_Shift={Get_Shift}
        />
      ),
    },
    {
      key: "2",
      label: "Apply And Add New Shift  to employee",
      children: (
        <ApplyShiftToEmployee
          form={ee_form}
          setOpen={setOpen}
          success={success}
          warning={warning}
          Get_Shift={Get_Shift}
          department_otp={department_otp}
          shift={shift}
          setShift={setShift}
          Get_Shift_Opt={Get_Shift_Opt}
        />
      ),
    },
  ];

  return (
    <>
      {/* end button */}
      <Modal
        open={open}
        okText="Apply Schedule"
        onCancelText="Cancel"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"48vw"}
        closable={true}
      >
        <div>
          {/* ------------------------------ */}
          {/* ------your code here---------- *}
              {/* ------------------------------ */}
          <Tabs
            defaultActiveKey="1"
            items={items}
            // style={{ width: '650px' }}
          />

          {/* ------------------------------ */}
          {/* ------end your code here---------- */}
          {/* ------------------------------ */}
        </div>
      </Modal>
    </>
  );
};
export default ApplyShift;
