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
import {
  Fetch_Subject,
  Delete_Subject,
} from "../../../server/organization/subjects";
import ReadMore from "../../../components/ReadMore";
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
  //loading
  const [loading, setLoading] = useState(true);
  //end loading
  //function
  const Get_Subjects = () => {
    Fetch_Subject()
      .then((res) => {
        setSubject(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
  //end useEffect'
  const default_data = [
    {
      id: 0,
      subject_name: "Public Administrative",
      university_name: "AEU",
      description: "FY101 ",
    },
    {
      id: 1,
      subject_name: "English Business 1A",
      university_name: "AEU",
      description: "ENB020301",
    },
    {
      id: 2,
      subject_name: "Effective Participation at Work",
      university_name: "AEU",
      description: "EPW021101",
    },
    {
      id: 3,
      subject_name: "General of Chemistry",
      university_name: "AEU",
      description: "GEC523101",
    },
    {
      id: 4,
      subject_name: "Office Application",
      university_name: "AEU",
      description: "GEC523101",
    },
    {
      id: 6,
      subject_name: " Khmer Study *	",
      university_name: "AEU",
      description: "khmer",
    },
    {
      id: 7,
      subject_name: "  Constitutional Law *	",
      university_name: "AEU",
      description: "law",
    },
    {
      id: 8,
      subject_name: "   Civil Law I		",
      university_name: "AEU",
      description: "law",
    },
    {
      id: 9,
      subject_name: "  Math Applied 	",
      university_name: "AEU",
      description: "math",
    },
    {
      id: 10,
      subject_name: "  Basic Marketing	 	",
      university_name: "AEU",
      description: "marketing",
    },
    {
      id: 11,
      subject_name: "  Basic Accounting		 	",
      university_name: "AEU",
      description: "accounting",
    },
    {
      id: 12,
      subject_name: "Organizational Behavior",
      university_name: "AEU",
      description: "behavior",
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("subject");
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
    localStorage.setItem("subject", JSON.stringify(updatedData));
  }, []);
  const data = subject;
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
      title: "Subject ",
      dataIndex: "subject_name",
      key: "subject_name",
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
      align: "center",
      width: 100,
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
            title: "Subject",
          },
        ]}
      />
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
