import { useOutletContext, useNavigate } from "react-router-dom";
//
// components
//
import { Button, Table } from "antd";
// icons//
//
import { useEffect, useState } from "react";

const SampleTitle = (props) => {
  const { propsEmitId } = props;
  const navigate = useNavigate();
  //table column and data of company
  const [attendance_list, setAttendanceList] = useState([]);

  const [propData, setPropData] = useState();
  const emitDataRowSelection = (emitData) => {
    setPropData(emitData);
  };

  const Get_Attendance_List = () => {
    setAttendanceList([
      ...attendance_list,
      {
        username: "Sin Sovanlyda",
        employee_id: "VTS-0377",
        department: "Information Technology",
        position: "FCL HR ADMIN",
        count_work_day: "22",
        late: "late",
        day_off: "0",
        al: "1",
        unpaid_leave: "1",
      },
    ]);
  };
  const handleCellClick = (record) => {
    // Open a new page when a cell in the "Address" column is clicked
  };
  useEffect(() => {
    Get_Attendance_List();
  }, []);

  const onEmitRecord = (record) => {
    propsEmitId(record);
  };

  const data = attendance_list;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "No",
      width: 50,
      align: "center",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
      render: (text) => (
        <span style={{ whiteSpace: "pre" }}>
          {String(text).replace(/./g, "•")}
        </span>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "username",
      key: "username",
      width: 250,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Count as WorkDay",
      dataIndex: "count_work_day",
      key: "count_work_day",
    },
    {
      title: "Late",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "DayOff",
      dataIndex: "day_off",
      key: "day_off",
    },
    {
      title: "AL",
      dataIndex: "al",
      key: "al",
    },
    {
      title: "Unpaid Leave",
      dataIndex: "unpaid_leave",
      key: "unpaid_leave",
    },
  ];
  return (
    <>
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
