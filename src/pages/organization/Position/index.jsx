import { Card, Row, Col, Table, Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
//form
import AddPositionForm from "./AddPosition";
import UpdatePositionForm from "./UpdatePosition";
//end form
import { Fetch_Department } from "../../../server/department";
import {
  Fetch_Position,
  Delete_Position,
} from "../../../server/position/position";
const Position = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
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
  //variable
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [props_data, setPropsData] = useState();

  //end variable
  //function
  const Get_Position = () => {
    Fetch_Position().then((res) => {
      setPosition(res);
    });
  };
  const on_Delete_Position = (id) => {
    Delete_Position(id).then((res) => {
      success({ content: "Remove Success" });
      Get_Position();
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  //end function
  //department
  const Get_Department = () => {
    Fetch_Department().then((res) => {
      setDepartment(res);
    });
  };
  //end department
  useEffect(() => {
    if (add_open === true) {
      Get_Department();
    }
  }, [add_open]);
  useEffect(() => {
    if (update_open === true) {
      Get_Department();
    }
  }, [update_open]);
  useEffect(() => {
    Get_Position();
  }, []);
  const data = position;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Position ",
      dataIndex: "position_name",
      key: "position_name",
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
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
              onConfirm={() => on_Delete_Position(recorder.id)}
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
          title="Position"
          extra={
            <Button type="primary" onClick={() => setAddOpen(true)}>
              <PlusCircleOutlined />
              Add Position
            </Button>
          }
        >
          {/* add department */}
          <AddPositionForm
            success={success}
            warning={warning}
            open={add_open}
            setOpen={setAddOpen}
            department={department}
            Get_Position={Get_Position}
          />
          {/* end add department */}
          <UpdatePositionForm
            success={success}
            warning={warning}
            open={update_open}
            setOpen={setUpdateOpen}
            props_data={props_data}
            Get_Position={Get_Position}
            department={department}
          />
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
  );
};

export default Position;
