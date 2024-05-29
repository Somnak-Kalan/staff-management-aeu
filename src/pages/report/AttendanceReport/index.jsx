import { useOutletContext, useNavigate } from "react-router-dom";
import { Card, Breadcrumb, Button, Popover, Col, Row, Radio } from "antd";
import {
  HomeOutlined,
  CheckSquareOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";

dayjs.locale("en");

const AttendanceReports = () => {
  //
  const new_attendance = [{}];
  //
  const currentDate = dayjs();
  const [currentMonth, setCurrentMonth] = useState(currentDate.format("MMMM"));
  const currentYear = currentDate.format("YYYY");
  const [select_month, setSelectedMonth] = useState(null);
  function generateMonthList(year) {
    const months = [];
    for (let month = 1; month <= 12; month++) {
      months.push({
        label: dayjs(`${year}-${month}-01`).format("MMM"),
        value: dayjs(`${year}-${month}-01`).format("MMMM"),
      });
    }

    return months;
  }

  // Example usage
  const month_list = generateMonthList(currentYear);
  const generateColumns = (current_year, current_month) => {
    const startDate = dayjs(`${current_year}-${current_month}`);
    const endDate = startDate.endOf("month");

    const columns = [
      { date: "full_name", label: "Full Name" },
      { date: "id", label: "ID" },
      { date: "date_join", label: "Date Join" },
    ];
    let current = startDate.clone();

    while (current.isBefore(endDate) || current.isSame(endDate, "day")) {
      columns.push({
        date: current.format("D"),
        label: current.format("Do"),
        day: current.format("ddd"),
        month: current.format("MMMM"),
      });
      current = current.add(1, "day");
    }

    return columns;
  };

  const columns = generateColumns(currentYear, currentMonth);

  const data = [
    {
      id: { value: "AEU-1", label: "AEU-1" },
      full_name: { value: "Somnak Kalan", label: "Somnak Kalan" },
      date_join: { value: "20/21/19", label: "20/21/19" },

      6: { value: "al", label: "AL" },
      8: { value: "h", label: "H" },
      12: { value: "l", label: "L" },
      19: { value: "a", label: "A" },
    },
    {
      id: { value: "AEU-2", label: "AEU-2" },
      full_name: { value: "Chansok Oeun	", label: "Chansok Oeun	" },
      date_join: { value: "20/21/19", label: "20/21/19" },
      6: { value: "al", label: "AL" },
      8: { value: "h", label: "H" },
      12: { value: "l", label: "L" },
      19: { value: "a", label: "A" },
    },
    {
      id: { value: "AEU-3", label: "AEU-3" },
      full_name: { value: "Khy Phat", label: "Khy Phat	" },
      date_join: { value: "20/21/19", label: "20/21/19" },
      6: { value: "al", label: "AL" },
      8: { value: "h", label: "H" },
      12: { value: "l", label: "L" },
      19: { value: "a", label: "A" },
    },
    {
      id: { value: "AEU-4", label: "AEU-4" },
      full_name: { value: "Boreyrothana Oun	", label: "Boreyrothana Oun	" },
      date_join: { value: "20/21/19", label: "20/21/19" },
      6: { value: "al", label: "AL" },
      8: { value: "h", label: "H" },
      12: { value: "l", label: "L" },
      19: { value: "a", label: "A" },
    },
    {
      id: { value: "AEU-5", label: "AEU-5" },
      full_name: { value: "Sreyhon Khim	", label: "Sreyhon Khim	" },
      date_join: { value: "20/21/19", label: "20/21/19" },
      6: { value: "al", label: "AL" },
      8: { value: "h", label: "H" },
      12: { value: "l", label: "L" },
      19: { value: "a", label: "A" },
    },
    {
      id: { value: "AEU-6", label: "AEU-6" },
      full_name: { value: "Huymean Chheng	", label: "SHuymean Chheng	" },
      date_join: { value: "20/21/19", label: "20/21/19" },
      6: { value: "al", label: "AL" },
      8: { value: "h", label: "H" },
      12: { value: "l", label: "L" },
      19: { value: "a", label: "A" },
    },
  ];

  const remarks = [
    {
      value: "a",
      label: "Absent",
    },
    {
      value: "p",
      label: "Permission",
    },
    {
      value: "al",
      label: "Annual Leave",
    },
    {
      value: "t/s",
      label: "Take Leave/Scan",
    },
  ];
  //----------onChange-----------------
  const onChange_Month = (el) => {
    setSelectedMonth(el);
    setCurrentMonth(el);
  };
  //----------End onChange-------------
  const [check_radio_value, setSetCheckRadioValue] = useState();
  const on_Check_Radio_Value = (index, data) => {
    setSetCheckRadioValue(index);
  };
  //next and previous//
  const [pageNumber, setPageNumber] = useState(1); // Added state for page number

  const handleClickNext = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleClickPrevious = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const startIndex = (pageNumber - 1) * 10;
  const endIndex = startIndex + 10;

  //end next and previous//
  return (
    <div>
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
            title: "attendance report ",
          },
        ]}
      />
      <Card
        title="ATTENDANCE REPORT"
        extra={
          <>
            <Popover
              placement="left"
              title={
                <>
                  Remark
                  <hr style={{ borderTop: "solid 0.5px #FFFFFF" }} />
                </>
              }
              content={
                <>
                  {Array.isArray(remarks) &&
                    remarks.map((el) => (
                      <>
                        <Row>
                          <Col sm={5}>
                            <strong>{el.value.toUpperCase()}</strong>
                          </Col>
                          <Col sm={1}>:</Col>
                          <Col>{el.label}</Col>
                        </Row>
                      </>
                    ))}
                </>
              }
            >
              <Button>Remark</Button>
            </Popover>
          </>
        }
      >
        <div className=" text-white " style={{ overflowX: "auto" }}>
          <span
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "5px",
              paddingBottom: "5px",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
            {currentYear}
          </span>

          <div style={{ marginBottom: "20px", marginTop: "10px" }}>
            {month_list.map((el, index) => (
              <span
                key={index}
                style={{
                  background:
                    el.value === select_month
                      ? "green"
                      : select_month !== null
                      ? ""
                      : el.value === dayjs().format("MMMM")
                      ? "green"
                      : "",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingTop: "5px",
                  paddingBottom: "5px",

                  cursor: "pointer",

                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
                onClick={() => onChange_Month(el.value)}
                className="text-sm mr-1 cursor-pointer bg-blue-500 px-10 py-2 rounded"
              >
                {el.label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr
                style={{
                  border: "1px solid #dddddd",
                  background: "#333a40",
                  color: "white",
                }}
              >
                <th style={{ border: "1px solid white" }}>No</th>
                {columns.map((column, index) => (
                  <>
                    <th
                      key={index}
                      style={{
                        border: "1px solid white",
                        textAlign: "center",
                        width:
                          index === 1 ? "70px" : index === 2 ? "210px" : "50px",
                        paddingLeft:
                          index === 0 || index === 1 || index === 2
                            ? "50px"
                            : "10px",
                        paddingRight:
                          index === 0 || index === 1 || index === 2
                            ? "50px"
                            : "10px",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        background:
                          dayjs().format("Do") === column.label ? "blue" : "",
                      }}
                      className="border border-gray-400 px-2"
                      colSpan={index === 0 ? 3 : 1}
                    >
                      {index === 0 || index === 1 || index === 2 ? (
                        <p style={{ width: "100px" }}>{column.label}</p>
                      ) : (
                        <span>{column.label}</span>
                      )}
                    </th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ border: "1px solid #dddddd" }}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      borderLeft:
                        colIndex === 1
                          ? "solid 1px white"
                          : "1px solid #dddddd",
                      borderRight:
                        colIndex === 1 || colIndex === 0
                          ? "solid 1px white"
                          : "1px solid #dddddd",
                      textAlign: "center",
                    }}
                    colSpan={colIndex === 1 ? 4 : 1}
                  >
                    {colIndex === 1 ? "Day" : colIndex === 1 ? "" : column.day}
                  </td>
                ))}
              </tr>
              {data.slice(startIndex, endIndex).map((row_data, row_index) => (
                <tr key={row_index} style={{ border: "1px solid #dddddd" }}>
                  {/* Existing code */}

                  <td
                    style={{
                      border: "1px solid #dddddd",
                      paddingLeft: "14px",
                      paddingRight: "14px",
                      textAlign: "center",
                    }}
                  >
                    {row_index + 1}
                  </td>

                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        border: "1px solid rgb(240, 240, 240)",
                        textAlign: "center",
                        color:
                          row_data[column.date]?.value === "al" ||
                          row_data[column.date]?.value === "h"
                            ? "black"
                            : row_data[column.date]?.value === "l"
                            ? "black"
                            : row_data[column.date]?.value === "a"
                            ? "red"
                            : "",
                        background:
                          row_data[column.date]?.value === "a"
                            ? "white"
                            : colIndex !== 0 &&
                              colIndex !== 1 &&
                              colIndex !== 2 &&
                              column.date <= currentDate.format("D") &&
                              row_data[column.date]?.value !== "a" &&
                              row_data[column.date]?.value !== "l" &&
                              row_data[column.date]?.value !== "h" &&
                              row_data[column.date]?.value !== "al"
                            ? "white"
                            : "",
                      }}
                      colSpan={colIndex === 0 ? 3 : 1}
                    >
                      {row_data[column.date] ? (
                        row_data[column.date]?.label
                      ) : column.date <= currentDate.format("D") &&
                        row_data[column.date]?.value !== "a" &&
                        row_data[column.date]?.value !== "l" &&
                        row_data[column.date]?.value !== "h" &&
                        row_data[column.date]?.value !== "al" ? (
                        <CheckSquareOutlined />
                      ) : (
                        ""
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "end", marginTop: "20px" }}>
          <Button
            style={{ border: "none", marginRight: "5px" }}
            onClick={handleClickPrevious}
            disabled={pageNumber === 1}
          >
            <LeftOutlined />
          </Button>
          <span
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              border: "solid #1677ff 1px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "5px",
            }}
          >
            {pageNumber}
          </span>
          <Button
            style={{ border: "none", outline: "none" }}
            onClick={handleClickNext}
          >
            <RightOutlined />
          </Button>
        </div>{" "}
      </Card>
    </div>
  );
};

export default AttendanceReports;
