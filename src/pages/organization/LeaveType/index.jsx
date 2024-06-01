import {
  Card,
  Row,
  Col,
  Table,
  Button,
  message,
  Popconfirm,
  Breadcrumb,
} from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
//form
import AddLeaveType from "./AddLeaveType";
import UpdateLeaveTypeForm from "./UpdateLeaveType";
import ReadMore from "../../../components/ReadMore";
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
  //loading
  const [loading, setLoading] = useState(true);
  //end loading
  const Get_Leave_Type = () => {
    Fetch_Leave_Type()
      .then((res) => {
        setLeaveType(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
  }, [window.location.pathname]);
  //end useEffect
  const default_data = [
    {
      id: 0,
      leave_type_name: "Annul Leave",
      leave_type: "Annul leave",
      description: "Provide to permission 18 day in a year",
    },
    {
      id: 1,
      leave_type_name: "Sick Leave",
      leave_type: "Sick leave",
      description: "Sick leave provide to stop when you sick",
    },
    {
      id: 2,
      leave_type_name: "Unpaid Leave",
      leave_type: "Unpaid leave",
      description: "Unpaid leave will cut salary",
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("leave_type");
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
    localStorage.setItem("leave_type", JSON.stringify(updatedData));
  }, [window.location.pathname]);
  const data = leave_type;
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
      render: (description) => <ReadMore text={description} />,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
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
            onClick={() => on_Get_Data_Record(recorder)}
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
            title: "Leave Type",
          },
        ]}
      />
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
