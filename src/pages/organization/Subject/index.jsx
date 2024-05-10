import { Card, Row, Col, Table, Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
//form
import {
  Fetch_Subject,
  Delete_Subject,
} from "../../../server/organization/subjects";

import AddSubjectForm from "./AddSubject";
import UpdateSubjectForm from "./UpdateSubject";
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

const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  //variable
  const [subject, setSubject] = useState([]);
  const [props_data, setPropsData] = useState();

  //variable
  //function
  const Get_Subjects = () => {
    Fetch_Subject().then((res) => {
      setSubject(res);
    });
  };
  const on_Delete_Record = (id) => {
    Delete_Subject(id).then((res) => {
      success({ content: "Remove Success" });
      Get_Subjects();
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  //function
  //useEffect
  useEffect(() => {
    Get_Subjects();
  }, []);
  //end useEffect
  const data = subject;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Subject ",
      dataIndex: "subject_name",
      key: "subject_name",
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
          title="Subject"
          extra={
            <Button type="primary" onClick={() => setAddOpen(true)}>
              <PlusCircleOutlined />
              Add Subject
            </Button>
          }
        >
          {/* add subject */}
          <AddSubjectForm
            open={add_open}
            setOpen={setAddOpen}
            success={success}
            warning={warning}
            Get_Subjects={Get_Subjects}
          />
          {/* end add subject */}
          <UpdateSubjectForm
            open={update_open}
            setOpen={setUpdateOpen}
            success={success}
            warning={warning}
            Get_Subjects={Get_Subjects}
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
