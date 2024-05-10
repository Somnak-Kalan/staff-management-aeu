import { useOutletContext, useNavigate } from "react-router-dom";
//
// components
//
// icons
//
//
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { Table } from "antd";

// change the component name here and export default at the below too
const SampleTitle = (props) => {
  const { emit_current_year, emit_current_month } = props;
  const navigate = useNavigate();
  const { id } = useParams();

  const [daily_attendance, setDailyAttendance] = useState([]);
  const Get_Daily_Attendance = () => {
    setDailyAttendance([
      ...daily_attendance,
      {
        key: 0,
        id: 0,
        day: "Mon",
        date: "28/03/2024",
        title: "Public holiday",
        check_in: null,
        chock_out: null,
        note: null,
      },
      {
        key: 1,
        id: 1,
        day: "Tue",
        date: "29/03/2024",
        title: "Attend",
        check_in: "8:44 AM",
        chock_out: "5:00 PM",
        note: "Check I'm Sorry I'm Late",
      },
      {
        key: 3,
        id: 3,
        day: "Wed",
        date: "30/03/2024",
        title: "Attend",
        check_in: "8:59 AM",
        chock_out: "5:00 PM",
        note: null,
      },
      {
        key: 4,
        id: 4,
        day: "Thu",
        date: "31/03/2024",
        title: "Attend",
        check_in: "8:00 AM",
        chock_out: "5:00",
        note: null,
      },
      {
        key: 5,
        id: 5,
        day: "Fri",
        date: "01/04/2024",
        title: "Attend",
        check_in: null,
        chock_out: null,
        note: "Busy At Home",
      },
      {
        key: 6,
        id: 6,
        day: "Sat",
        date: "02/04/2024",
        title: "AL",
        check_in: null,
        chock_out: null,
        note: null,
      },
      {
        key: 7,
        id: 7,
        day: "Sun",
        date: "03/04/2024",
        title: "Public holiday",
        check_in: null,
        chock_out: null,
        note: null,
      },
    ]);
  };
  useEffect(() => {
    Get_Daily_Attendance();
  }, []);
  const data = daily_attendance;
  console.log(data, " test now please");
  const columns = [
    {
      index: 0,
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center", // Center-align the content
    },
    {
      index: 1,
      title: "Day",
      dataIndex: "day",
      key: "day",
      align: "center", // Center-align the content
    },
    {
      index: 2,
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center", // Center-align the content
    },
    {
      index: 3,
      title: "Check In",
      dataIndex: "check_in",
      key: "check_in",
      align: "center", // Center-align the content
    },
    {
      index: 4,
      title: "Check Out",
      dataIndex: "check_out",
      key: "check_out",
      align: "center", // Center-align the content
    },
    {
      index: 5,
      title: "Note",
      dataIndex: "note",
      key: "note",
      align: "center", // Center-align the content
    },
  ];
  return (
    <>
      {/* code here */}
      <Table
        size="small"
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
// change the component name here too
export default SampleTitle;
