import { Card, Row, Col, Table, Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
//form
import AddDepartmentForm from "./AddDepartment";
import UpdateDepartmentForm from "./UpdateDepartment";
//end form
import {
  Fetch_Department,
  Delete_Department,
} from "../../../server/department";
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  const [table_loading, setTableLoading] = useState(true);
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
  //variable
  const [department_list, setDepartment] = useState([]);
  //end variable
  //function
  const Get_Department = () => {
    Fetch_Department().then((res) => {
      setDepartment(res);
      setTableLoading(false);
    });
  };
  const on_Delete_Department = (id) => {
    Delete_Department(id).then((res) => {
      success({ content: "Remove Success" });
      Get_Department();
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  //end function

  useEffect(() => {
    Get_Department();
  }, []);

  //end notification
  const data = department_list;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "University",
      dataIndex: "university_name",
      key: "university_name",
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
              onConfirm={() => on_Delete_Department(recorder.id)}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <DeleteOutlined style={{ color: "red", fontSize: "15px" }} />
            </Popconfirm>
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
          title="Department"
          extra={
            <Button type="primary" onClick={() => setAddOpen(true)}>
              <PlusCircleOutlined />
              Add Department
            </Button>
          }
        >
          {/* add department */}
          <AddDepartmentForm
            open={add_open}
            setOpen={setAddOpen}
            success={success}
            warning={warning}
            Get_Department={Get_Department}
          />

          {/* end add department */}
          <UpdateDepartmentForm
            open={update_open}
            setOpen={setUpdateOpen}
            success={success}
            warning={warning}
            Get_Department={Get_Department}
            props_data={props_data}
          />
          {/* update department */}

          {/* end update department */}
          <Table
            size="small"
            scroll={{ x: "max-content" }}
            columns={columns}
            bordered
            loading={table_loading}
            dataSource={data}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Staff;
