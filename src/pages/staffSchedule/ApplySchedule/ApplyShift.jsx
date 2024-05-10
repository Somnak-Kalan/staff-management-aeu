import { Card, Modal, Tabs, Button, Form, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import ApplyShiftToDept from "./ApplyShiftToDept";
import ApplyShiftToEmployee from "./ApplyShiftToEmployee";
const ApplyShift = (props) => {
  const { open, setOpen } = props;
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  const [form_dept] = Form.useForm();
  const [form_ee] = Form.useForm();
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
  const onFinish = async (form) => {
    try {
      (await form_dept.validateFields()) || (await form_ee.validateFields());
      success({ content: "Add Success" });
    } catch {
      warning({ content: "Add fail" });
    }
  };
  //end notification
  /*-----------------Function Modal--------------------*/

  const items = [
    {
      key: "1",
      label: "Apply Shift  to Department",
      children: (
        <ApplyShiftToDept
          form={form_dept}
          setOpen={setOpen}
          success={success}
          warning={warning}
        />
      ),
    },
    {
      key: "2",
      label: "Apply And Add New Shift  to employee",
      children: (
        <ApplyShiftToEmployee
          form={form_ee}
          setOpen={setOpen}
          success={success}
          warning={warning}
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
        footer={
          <div>
            <Button type="primary" onClick={() => onFinish()}>
              Save
            </Button>
          </div>
        }
        width={"48vw"}
        closable={false}
      >
        <Card
          title="Apply Schedule "
          extra={
            <CloseCircleOutlined
              onClick={() => on_close_modal()}
              className="cursor-pointer"
              style={{ fontSize: "20px", color: "red" }}
            />
          }
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
        </Card>
      </Modal>
    </>
  );
};
export default ApplyShift;
