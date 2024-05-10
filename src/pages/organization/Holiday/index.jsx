import { Card, Row, Col, Table, Button, message, Popconfirm } from "antd";
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
} from "@ant-design/icons";
//form
import AddHoliday from "./AddHoliday";
import UpdateHoliday from "./UpdateHoliday";
import dayjs from "dayjs";
//end form
const Staff = () => {
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
  const [holiday, setHoliday] = useState([]);
  const [props_data, setPropsData] = useState();

  //end variable
  //function
  const Get_Holiday = () => {
    Fetch_Holiday().then((res) => {
      setHoliday(res);
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
  const data = holiday;
  const columns = [
    {
      title: "Id",
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
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Staff;
