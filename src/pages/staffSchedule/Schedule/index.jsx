import {
  Card,
  Row,
  Col,
  Table,
  Button,
  message,
  Breadcrumb,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
//form
import AddShiftForm from "./AddShift";
import UpdateShift from "./UpdateShift";
//end form
import { Fetch_Shift, Delete_Shift } from "../../../server/staffSchedule/shift";
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  const [shift, setShift] = useState([]);
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

  const Get_Shift = () => {
    Fetch_Shift().then((res) => {
      setShift(res);
      console.log(res);
    });
  };
  const on_Delete = (id) => {
    Delete_Shift(id).then(() => {
      success({ content: "Remove Success" });
      Get_Shift();
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  useEffect(() => {
    Get_Shift();
  }, []);
  //set default data
  const default_data = [
    {
      id: 0,
      shift_name: "Monday-Friday",
      // attendance:{}
      attendance_rule_ids: [1],
      attendance: {
        monday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        tuesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        wednesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        thursday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        friday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        tuesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        wednesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        thursday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        friday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        // saturday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // sunday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },
      },
    },
    {
      id: 1,
      shift_name: "Monday-Saturday",
      // attendance:{}
      attendance_rule_ids: [1],
      attendance: {
        monday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        tuesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        wednesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        thursday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        friday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        tuesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        wednesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        thursday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        friday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        saturday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        // sunday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },
      },
    },
    {
      id: 2,
      shift_name: "Monday-Wednesday",
      // attendance:{}
      attendance_rule_ids: [1],
      attendance: {
        monday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        tuesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        wednesday: {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },

        // thursday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // friday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // tuesday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // wednesday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // thursday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // friday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // saturday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },

        // sunday: {
        //   morning: { start: "8:00 AM", end: "12:00 PM" },
        //   afternoon: { start: "13:00 PM", end: "17:00 PM" },
        // },
      },
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("shift");
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
    localStorage.setItem("shift", JSON.stringify(updatedData));
  }, []);
  //set default data

  const data = shift;

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      with: 50,
      align: "center",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Schedule Name ",
      dataIndex: "shift_name",
      key: "shift_name",
    },
    {
      title: "Monday",
      dataIndex: "monday",
      key: "monday",
      render: (_, record) => {
        if (record.attendance.monday) {
          const { morning, afternoon } = record.attendance.monday;

          const isValidTime = (time) => time && time !== "Invalid Date";

          return (
            <>
              <div>
                {isValidTime(morning?.start) && isValidTime(morning?.end) ? (
                  <span>
                    {morning.start} - {morning.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <div>
                {isValidTime(afternoon?.start) &&
                isValidTime(afternoon?.end) ? (
                  <span>
                    {afternoon.start} - {afternoon.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          );
        } else {
          return null;
        }
      },
    },

    {
      title: "Tuesday",
      dataIndex: "tuesday",
      key: "tuesday",
      render: (_, record) => {
        if (record.attendance.tuesday) {
          const { morning, afternoon } = record.attendance.tuesday;

          const isValidTime = (time) => time && time !== "Invalid Date";

          return (
            <>
              <div>
                {isValidTime(morning?.start) && isValidTime(morning?.end) ? (
                  <span>
                    {morning.start} - {morning.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <div>
                {isValidTime(afternoon?.start) &&
                isValidTime(afternoon?.end) ? (
                  <span>
                    {afternoon.start} - {afternoon.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Wednesday",
      dataIndex: "wednesday",
      key: "wednesday",
      render: (_, record) => {
        if (record.attendance.wednesday) {
          const { morning, afternoon } = record.attendance.wednesday;

          const isValidTime = (time) => time && time !== "Invalid Date";

          return (
            <>
              <div>
                {isValidTime(morning?.start) && isValidTime(morning?.end) ? (
                  <span>
                    {morning.start} - {morning.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <div>
                {isValidTime(afternoon?.start) &&
                isValidTime(afternoon?.end) ? (
                  <span>
                    {afternoon.start} - {afternoon.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Thursday",
      dataIndex: "thursday",
      key: "thursday",
      render: (_, record) => {
        if (record.attendance.thursday) {
          const { morning, afternoon } = record.attendance.thursday;

          const isValidTime = (time) => time && time !== "Invalid Date";

          return (
            <>
              <div>
                {isValidTime(morning?.start) && isValidTime(morning?.end) ? (
                  <span>
                    {morning.start} - {morning.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <div>
                {isValidTime(afternoon?.start) &&
                isValidTime(afternoon?.end) ? (
                  <span>
                    {afternoon.start} - {afternoon.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Friday",
      dataIndex: "friday",
      key: "friday",
      render: (_, record) => {
        if (record.attendance.friday) {
          const { morning, afternoon } = record.attendance.friday;

          const isValidTime = (time) => time && time !== "Invalid Date";

          return (
            <>
              <div>
                {isValidTime(morning?.start) && isValidTime(morning?.end) ? (
                  <span>
                    {morning.start} - {morning.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <div>
                {isValidTime(afternoon?.start) &&
                isValidTime(afternoon?.end) ? (
                  <span>
                    {afternoon.start} - {afternoon.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Saturday",
      dataIndex: "saturday",
      key: "saturday",
      render: (_, record) => {
        if (record.attendance.saturday) {
          const { morning, afternoon } = record.attendance.saturday;

          const isValidTime = (time) => time && time !== "Invalid Date";

          return (
            <>
              <div>
                {isValidTime(morning?.start) && isValidTime(morning?.end) ? (
                  <span>
                    {morning.start} - {morning.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <div>
                {isValidTime(afternoon?.start) &&
                isValidTime(afternoon?.end) ? (
                  <span>
                    {afternoon.start} - {afternoon.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Sunday",
      dataIndex: "sunday",
      key: "sunday",
      render: (_, record) => {
        if (record.attendance.sunday) {
          const { morning, afternoon } = record.attendance.sunday;

          const isValidTime = (time) => time && time !== "Invalid Date";

          return (
            <>
              <div>
                {isValidTime(morning?.start) && isValidTime(morning?.end) ? (
                  <span>
                    {morning.start} - {morning.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <div>
                {isValidTime(afternoon?.start) &&
                isValidTime(afternoon?.end) ? (
                  <span>
                    {afternoon.start} - {afternoon.end}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          );
        } else {
          return null;
        }
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
              onConfirm={() => on_Delete(recorder.id)}
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
          {/* <span
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            onClick={() => on_Get_Data_Record(recorder)}
          >
            <FormOutlined style={{ color: "blue", fontSize: "15px" }} />
          </span> */}
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
            title: "Schedule",
          },
        ]}
      />
      <Row>
        <Col sm={24}>
          <Card
            title="Schedule"
            extra={
              <Button type="primary" onClick={() => setAddOpen(true)}>
                <PlusCircleOutlined />
                Add Schedule
              </Button>
            }
          >
            {/* add department */}
            <AddShiftForm
              open={add_open}
              setOpen={setAddOpen}
              success={success}
              warning={warning}
              Get_Shift={Get_Shift}
            />
            {/* end add department */}

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
    </>
  );
};

export default Staff;
