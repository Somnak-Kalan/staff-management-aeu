import { Card, Row, Col, Table, Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
//form
import AddLeaveType from "./AddLeaveType";
import UpdateLeaveTypeForm from "./UpdateLeaveType";
//end form
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
import {
  Fetch_Leave_Type,
  Delete_Leave_Type,
} from "../../../server/organization/leavetype";

const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  //variable
  const [leave_type, setLeaveType] = useState([]);
  const [props_data, setPropsData] = useState();

  //variable
  const Get_Leave_Type = () => {
    Fetch_Leave_Type().then((res) => {
      setLeaveType(res);
    });
  };
  const on_Delete_Record = (id) => {
    Delete_Leave_Type(id).then((res) => {
      success({ content: "remove success" });
      Get_Leave_Type();
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  //useEffect
  useEffect(() => {
    Get_Leave_Type();
  }, []);
  //end useEffect
  const data = leave_type;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Leave Type Name ",
      dataIndex: "leave_type_name",
      key: "leave_type_name",
    },
    {
      title: "Function ",
      dataIndex: "leave_type",
      key: "leave_type",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            onClick={() => on_Get_Data_Record(recorder)}
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
          title="Leave Type"
          extra={
            <Button type="primary" onClick={() => setAddOpen(true)}>
              <PlusCircleOutlined />
              Add Leave Type
            </Button>
          }
        >
          {/* add subject */}
          <AddLeaveType
            success={success}
            warning={warning}
            open={add_open}
            setOpen={setAddOpen}
            Get_Leave_Type={Get_Leave_Type}
          />
          {/* end add subject */}
          <UpdateLeaveTypeForm
            success={success}
            warning={warning}
            open={update_open}
            setOpen={setUpdateOpen}
            Get_Leave_Type={Get_Leave_Type}
            props_data={props_data}
          />
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
