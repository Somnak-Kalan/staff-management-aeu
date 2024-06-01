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
  Fetch_Holiday,
  Delete_Holiday,
} from "../../../server/organization/holiday";

import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
//form
import AddHoliday from "./AddHoliday";
import UpdateHoliday from "./UpdateHoliday";
import dayjs from "dayjs";
//end form
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [update_open, setUpdateOpen] = useState(false);
  //loading
  const [loading, setLoading] = useState(true);
  //end loading
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
  const [holiday, setHoliday] = useState([]);
  const [props_data, setPropsData] = useState();

  //end variable
  //function
  const Get_Holiday = () => {
    Fetch_Holiday()
      .then((res) => {
        setHoliday(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const on_Delete_Record = (id) => {
    Delete_Holiday(id).then((res) => {
      success({ content: "Remove Success" });
      Get_Holiday();
    });
  };
  const on_Get_Data_Record = async (data) => {
    await setUpdateOpen(true);
    await setPropsData(data);
  };
  //end function
  //useEffect
  useEffect(() => {
    Get_Holiday();
  }, []);
  //end useEffect
  const default_data = [
    {
      id: 0,
      holiday_kh: "ទិវារដ្ឋធម្មនុញ្ញ",
      holiday_en: "Constitutional Day",
      from_date: "24-09-2024",
      to_date: "24-09-2024",
    },
    {
      id: 1,
      holiday_kh: "បុណ្យភ្ជុំបិណ្ឌ",
      holiday_en: "Pchum Ben Festival",
      from_date: "01-10-2024",
      to_date: "03-10-2024",
    },
    {
      id: 3,
      holiday_kh: "ទិវារំលឹកគុណព្រះបិតា",
      holiday_en: "Commemoration Day of King's Father",
      from_date: "15-10-2024",
      to_date: "15-10-2024",
    },
    {
      id: 4,
      holiday_kh: "ព្រះរាជពិធីឡើងគ្រងរាជ្យ",
      holiday_en: "King's Coronation Day",
      from_date: "29-10-2024",
      to_date: "29-10-2024",
    },
    {
      id: 5,
      holiday_kh: "ថ្ងៃបុណ្យ​ឯករាជ្យជាតិ",
      holiday_en: "Independence Day",
      from_date: "09-11-2024",
      to_date: "09-11-2024",
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("holiday");
    existingData = existingData ? JSON.parse(existingData) : [];

    const notExisting = default_data.filter((el) => {
      return !existingData.some((existing) => existing.id === el.id);
    });
    console.log(notExisting, "test");
    const updatedData = [...existingData];
    if (notExisting.length > 0) {
      Array.isArray(notExisting) &&
        notExisting.map((el) => {
          updatedData.push(el);
        });
    }
    localStorage.setItem("holiday", JSON.stringify(updatedData));
  }, [window.location.pathname]);
  const data = holiday;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: 50,
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Holiday(Khmer)",
      dataIndex: "holiday_kh",
      key: "holiday_kh",
    },
    {
      title: "Holiday(English)",
      dataIndex: "holiday_en",
      key: "holiday_en",
    },
    {
      title: "From",
      dataIndex: "from_date",
      key: "from_date",
      render: (_, record) => (
        <>
          {dayjs(record ? record.from_date : "", "DD-MM-YYYY").format(
            "DD-MM-YYYY"
          )}
        </>
      ),
    },

    {
      title: "To",
      dataIndex: "to_date",
      key: "to_date",
      render: (_, record) => (
        <>
          {dayjs(record ? record.to_date : "", "DD-MM-YYYY").format(
            "DD-MM-YYYY"
          )}
        </>
      ),
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
            title: "Holiday",
          },
        ]}
      />
      <Row>
        <Col sm={24}>
          <Card
            title="Holiday"
            extra={
              <Button type="primary" onClick={() => setAddOpen(true)}>
                <PlusCircleOutlined />
                Add Holiday
              </Button>
            }
          >
            {/* add subject */}
            <AddHoliday
              success={success}
              warning={warning}
              open={add_open}
              setOpen={setAddOpen}
              Get_Holiday={Get_Holiday}
            />
            {/* end add subject */}
            <UpdateHoliday
              success={success}
              warning={warning}
              open={update_open}
              setOpen={setUpdateOpen}
              Get_Holiday={Get_Holiday}
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
