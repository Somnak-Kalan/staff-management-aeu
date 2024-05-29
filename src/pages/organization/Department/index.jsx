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
  const default_data = [
    {
      id: 0,
      department_name: "Accounting",
      university_name: "AEU University",
      description: "Manage calculate spend.",
    },
    {
      id: 1,
      department_name: "Information Technology",
      university_name: "AEU University",
      description: "Support and Manage system",
    },
    {
      id: 2,
      department_name: "Finance",
      university_name: "AEU University",
      description: "Manage whole school spend in & out",
    },
    {
      id: 3,
      department_name: "Education",
      university_name: "AEU University",
      description: "Teaching student",
    },
    {
      id: 4,
      department_name: "Human Resource",
      university_name: "AEU University",
      description: "Manage student, manage staff",
    },
    {
      id: 5,
      department_name: "Science and Technology",
      university_name: "AEU University",
      description:
        "Nowadays, technology becomes highly modernized, but it seems to be slow if it will be compared in future",
    },
    {
      id: 6,
      department_name: "Law and Political Science",
      university_name: "AEU University",
      description:
        "To display the quality and value of competitive education in order to achieve a great success in a job for triumphant students after their graduation.",
    },
    {
      id: 7,
      department_name: "Social Sciences and Economics",
      university_name: "AEU University",
      description:
        "The Faculty of Social Sciences and Economics comprises of the following Schools which are based at the Canterbury campus: Anthropology and Conservation, Economics, Business, Law, Politics and International Relations, Psychology, and Social Policy, Sociology and Social Research",
    },
    {
      id: 8,
      department_name: "Arts, Humanities and Languages",
      university_name: "AEU University",
      description:
        "The Arts and Humanities are at the heart of a real education",
    },
    {
      id: 9,
      department_name: "Business Administration and Tourism",
      university_name: "AEU University",
      description:
        "The Faculty has a strong will to push students to achieving their goal as the best qualified human resources both in the business and tourism areas",
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("department");
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
    localStorage.setItem("department", JSON.stringify(updatedData));
  }, []);
  //end notification
  const data = department_list;
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
      title: "Department/ Faculties",
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
      render: (text) => {
        if (text.length > 70) {
          return text.substring(0, 70) + "...";
        }
        return text;
      },
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
            title: "Department",
          },
        ]}
      />
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
    </>
  );
};

export default Staff;
