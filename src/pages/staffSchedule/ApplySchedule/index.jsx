import { Card, Row, Col, Table, Button, message, Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  HomeOutlined,
} from "@ant-design/icons";
//form
import { Fetch_Apply_Shift } from "../../../server/staffSchedule/apply_shift";
import ApplyShift from "./ApplyShift";
//end form
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
  const [list_data_shift, setListDataShift] = useState([]);
  const Get_Shift = () => {
    Fetch_Apply_Shift().then((res) => {
      setListDataShift(res);
    });
  };
  useEffect(() => {
    Get_Shift();
  }, []);
  const default_dept = [
    {
      id: 0,
      department_id: 0,
      shift_id: 0,
    },
    {
      id: 1,
      department_id: 1,
      shift_id: 1,
    },
    {
      id: 2,
      department_id: 2,
      shift_id: 0,
    },
    {
      id: 3,
      department_id: 3,
      shift_id: 1,
    },
  ];
  const default_ee = [
    {
      id: 0,
      department_id: 0,
      shift_id: 0,
      staff_id: 0,
    },
    {
      id: 1,
      department_id: 1,
      shift_id: 1,
      staff_id: 1,
    },
    {
      id: 2,
      department_id: 2,
      shift_id: 0,
      staff_id: 2,
    },
    {
      id: 3,
      department_id: 3,
      shift_id: 1,
      staff_id: 3,
    },
  ];
  useEffect(() => {
    let existingData = localStorage.getItem("apply_to_dept");
    existingData = existingData ? JSON.parse(existingData) : [];

    const notExisting = default_dept.filter((el) => {
      return !existingData.some((existing) => existing.id === el.id);
    });
    const updatedData = [...existingData];
    if (notExisting.length > 0) {
      Array.isArray(notExisting) &&
        notExisting.map((el) => {
          updatedData.push(el);
        });
    }
    localStorage.setItem("apply_to_dept", JSON.stringify(updatedData));

    let existingData_ee = localStorage.getItem("apply_to_ee");
    existingData_ee = existingData_ee ? JSON.parse(existingData_ee) : [];

    const notExisting_ee = default_dept.filter((el) => {
      return !existingData_ee.some((existing) => existing.id === el.id);
    });
    const updatedData_ee = [...existingData_ee];
    if (notExisting_ee.length > 0) {
      Array.isArray(notExisting_ee) &&
        notExisting_ee.map((el) => {
          updatedData_ee.push(el);
        });
    }
    localStorage.setItem("apply_to_ee", JSON.stringify(updatedData_ee));
  }, []);
  const data = list_data_shift;
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
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Schedule",
      dataIndex: "shift_name",
      key: "shift_name",
    },
    {
      title: "Staff",
      dataIndex: "amount_staff",
      key: "amount_staff",
      render: (_, render) => render?.staff?.length,
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
            title: "Apply Schedule",
          },
        ]}
      />
      <Row>
        <Col sm={24}>
          <Card
            title="Apply Schedule"
            extra={
              <Button type="primary" onClick={() => setAddOpen(true)}>
                <PlusCircleOutlined />
                Apply Schedule
              </Button>
            }
          >
            {/* add department */}
            <ApplyShift
              Get_Shift={Get_Shift}
              open={add_open}
              setOpen={setAddOpen}
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
