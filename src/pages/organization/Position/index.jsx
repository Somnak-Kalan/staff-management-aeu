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
  //loading
  const [loading, setLoading] = useState(true);
  //end loading
  //function
  const Get_Position = () => {
    Fetch_Position()
      .then((res) => {
        setPosition(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
  const default_data = [
    {
      id: 0,
      position_name: "Teaching",
      department_id: 0,
      description: "Teach follow program",
    },
    {
      id: 1,
      position_name: "Accounting",
      department_id: 1,
      description: "description",
    },
    {
      id: 2,
      position_name: "HR",
      department_id: 2,
      description: "description",
    },
    {
      id: 3,
      position_name: "Finance",
      department_id: 3,
      description: "description",
    },
    {
      id: 4,
      position_name: "Computer Science  ",
      department_id: 4,
      description:
        "Computer science is the study of the use of computers to process information.",
    },
    {
      id: 5,
      position_name: "Computer Network Technology  ",
      department_id: 5,
      description:
        "The Department of Information Technology provides entry-level skills and career education to meet the demand for well-trained technicians in the computer electronics and networking industries.",
    },
    {
      id: 6,
      position_name: "Electronic and Electricity Engineering  ",
      department_id: 5,
      description:
        "The Department of Architecture and Engineering is a new academic field which actively implements elements of social sciences and humanities",
    },
    {
      id: 7,
      position_name: "Information Technology",
      department_id: 5,
      description:
        "Computer science is the study of the use of computers to process information.",
    },
    {
      id: 8,
      position_name: "Public Law",
      department_id: 6,
      description:
        "This concentration is available within the political science major for students with particular career and/or advanced degree interests in this field.",
    },
    {
      id: 9,
      position_name: "Public Administration",
      department_id: 6,
      description: "Introduction (Political Science)",
    },
    {
      id: 10,
      position_name: "Public Administration",
      department_id: 6,
      description:
        "This concentration is available within the political science major for students with particular career and/or advanced degree interests in this field. ",
    },
    {
      id: 11,
      position_name: "Political Science",
      department_id: 6,
      description: "Introduction (Political Science)",
    },
    {
      id: 12,
      position_name: "Law",
      department_id: 6,
      description:
        "This concentration is available within the political science major for students with particular career and/or advanced degree interests in this field.",
    },
    {
      id: 13,
      position_name: "Community Development",
      department_id: 7,
      description:
        "Economics of development as a field embraces both citizen activists and professionals in planned efforts to identify, enhance",
    },
    {
      id: 14,
      position_name: "Finance and Banking",
      department_id: 7,
      description:
        "International Trade & Finance is a specialized course of study of the international dimensions of Economics.",
    },
    {
      id: 15,
      position_name: "Economics",
      department_id: 7,
      description:
        "At its most fundamental level, economics is the study of how scarce resources are allocated.",
    },
    {
      id: 16,
      position_name: "International Business",
      department_id: 7,
      description:
        "The term international business refers to any business that operates across international borders.",
    },
    {
      id: 17,
      position_name: "English",
      department_id: 7,
      description:
        "The Arts and Humanities are at the heart of a real education. ",
    },
    {
      id: 18,
      position_name: "Chinese Literature",
      department_id: 7,
      description: "Bachelor of Arts in Chinese Literature",
    },
    {
      id: 19,
      position_name: "International Relations",
      department_id: 7,
      description: "BACHELOR OF ARTS IN INTERNATIONAL RELATIONS",
    },
    {
      id: 20,
      position_name: "Other Activities",
      department_id: 7,
      description: "BACHELOR OF ARTS IN INTERNATIONAL RELATIONS",
    },
    {
      id: 21,
      position_name: "Management",
      department_id: 8,
      description:
        "The Faculty has a strong will to push students to achieving their goal as the best qualified human resources both in the business and tourism areas.",
    },
    {
      id: 22,
      position_name: "Marketing",
      department_id: 8,
      description:
        " The major in marketing is designed to provide students with the conceptual background and practical skills necessary to address issues such as what new products a firm should introduce;",
    },
    {
      id: 23,
      position_name: "Accounting",
      department_id: 8,
      description:
        "The College of Management offers a full range of accounting courses, at both the undergraduate and graduate levels, covering topics in introductory",
    },
    {
      id: 24,
      position_name: "Hotel and Tourism Management",
      department_id: 8,
      description:
        "Students choosing the undergraduate major in Hospitality and Tourism Management are first admitted to the pre-HTM major for their first two years of university work.",
    },
    {
      id: 25,
      position_name: "Human Recourse Management",
      department_id: 8,
      description:
        "The curriculum in this major is design to provide students the course focusing on the Fundamental of Staff Motivation,",
    },
    {
      id: 26,
      position_name: "Information Management System",
      department_id: 8,
      description:
        "The curriculum of Media Management is focused on how to manage the media network effectively",
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("position");
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
    localStorage.setItem("position", JSON.stringify(updatedData));
  }, [window.location.pathname]);
  const data = position;
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
      width: 50,
      align: "center",
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
            title: "Position",
          },
        ]}
      />
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
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Position;
