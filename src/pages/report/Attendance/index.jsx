import { useOutletContext, useNavigate } from "react-router-dom";
//
// components
//
import {
  Card,
  Breadcrumb,
  Tabs,
  DatePicker,
  Row,
  Col,
  Space,
  Select,
} from "antd";
// icons
import { HomeOutlined } from "@ant-design/icons";
//
import { useState } from "react";
import AttendanceList from "./Attendance";
import AttendanceDetail from "./AttendanceDetail";
import dayjs from "dayjs";
//end pages
const { RangePicker } = DatePicker;

//
// change the component name here and export default at the below too
const SampleTitle = () => {
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState(0);
  const [current_year, setCurrentYear] = useState();
  const [current_month, setCurrentMonth] = useState();
  const [dateRange, setDateRange] = useState([]);
  const [select_current_month, setSelectCurrentMonth] = useState();
  const currentYear = dayjs().format("YYYY");
  const onChange = (key) => {
    setCurrentYear(undefined);
    setCurrentMonth(undefined);
    setActiveKey(0);
    const updatedData = items.filter((item) => item.key !== 1);
    setItems(updatedData);
  };

  function generateMonthList(year) {
    const months = [];

    for (let month = 1; month <= 12; month++) {
      months.push(dayjs(`${year}-${month}-01`).format("MMMM"));
    }

    return months;
  }

  // Example usage
  const months = generateMonthList(currentYear);

  const add = async () => {
    await new Promise((wait_as_second) => setTimeout(wait_as_second, 500));
    setActiveKey(1);
    setItems([
      ...items,
      {
        label: "Daily Attendance",
        children: (
          <AttendanceDetail
            emit_current_year={(value) => setCurrentYear(value)}
            emit_current_month={(value) => setCurrentMonth(value)}
          />
        ),
        key: 1,
      },
    ]);
  };

  const [items, setItems] = useState([
    {
      label: "Attendance List",
      children: (
        <>
          <AttendanceList propsEmitId={add} />
        </>
      ),

      key: 0,
    },
  ]);
  //----------onChange-----------------
  const onChange_Month = (el) => {
    setSelectCurrentMonth(el);
    setDateRange([
      dayjs(`${currentYear}-${el}-01`, "YYYY-MMMM-DD").isValid()
        ? dayjs(`${currentYear}-${el}-01`, "YYYY-MMMM-DD")
        : null,
      dayjs(`${currentYear}-${el}-01`, "YYYY-MMMM-DD").isValid()
        ? dayjs(`${currentYear}-${el}-01`, "YYYY-MMMM-DD").endOf("month")
        : null,
    ]);
  };
  //----------End onChange-------------

  return (
    <div>
      {/* fixed group button */}

      <Breadcrumb
        style={{
          position: "fixed",
          top: "80px",
          right: "16px",
        }}
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
            title: "attendance list",
          },
        ]}
      />
      {/* card */}
      <Card
        title={
          <>
            <div style={{ display: "flex" }}>
              <span>ATTENDANCE LIST</span>
            </div>
          </>
        }
      >
        <Tabs
          style={{ marginTop: "25px" }}
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          //   type="card"
          items={items}
        />
      </Card>
    </div>
  );
};
// change the component name here too
export default SampleTitle;
