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
import AddEvent from "./AddEvent";
import UpdateEventForm from "./UpdateEvent";
//end form
import { Fetch_Event, Delete_Event } from "../../../server/organization/events";
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
const EventPage = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [props_data, setPropsData] = useState();
  //loading
  const [loading, setLoading] = useState(true);
  //end loading
  //function
  const Get_Event = () => {
    Fetch_Event()
      .then((res) => {
        setEvents(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const on_Delete_Record = (id) => {
    Delete_Event(id).then((res) => {
      success({ content: "Remove Success" });
      Get_Event();
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  //end function
  //useEffect
  useEffect(() => {
    Get_Event();
  }, []);
  //end useEffect
  const default_data = [
    {
      id: 0,
      event_name: "Student Delegates ",
      amount_day: "1",
      option: "",
      from_date: "22-09-2013",
      to_date: "22-09-2013",
      description:
        "On September 27th, 2013, during the evening farewell meal with the Asia Euro University management team",
    },
    {
      id: 1,
      event_name: "Workshop on Curriculum Development ",
      amount_day: "1",
      option: "",
      from_date: "15-3-2017",
      to_date: "15-3-2017",
      description:
        "On 15 March 2017 at Cambodian Higher Education of Cambodia (CHEA) cooperation with University of the Thai Chamber of Commerce help workshop on Curriculum Development to all members of CHEA",
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("event");
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
    localStorage.setItem("event", JSON.stringify(updatedData));
  }, []);
  const data = events;
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
      title: "Event Name",
      dataIndex: "event_name",
      key: "event_name",
    },
    {
      title: "description",
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
      title: "From",
      dataIndex: "from_date",
      key: "from_date",
    },
    {
      title: "To",
      dataIndex: "to_date",
      key: "to_date",
    },

    {
      title: "Amount Day",
      dataIndex: "amount_day",
      key: "amount_day",
      render: (_, recorder) =>
        recorder ? recorder.amount_day + " day" : 0 + " day ",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
            title: "Event",
          },
        ]}
      />
      <Row>
        <Col sm={24}>
          <Card
            title="Events"
            extra={
              <Button type="primary" onClick={() => setAddOpen(true)}>
                <PlusCircleOutlined />
                Add Event
              </Button>
            }
          >
            {/* add subject */}
            <AddEvent
              success={success}
              warning={warning}
              open={add_open}
              setOpen={setAddOpen}
              Get_Event={Get_Event}
            />
            {/* end add subject */}
            <UpdateEventForm
              success={success}
              warning={warning}
              open={update_open}
              setOpen={setUpdateOpen}
              Get_Event={Get_Event}
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

export default EventPage;
