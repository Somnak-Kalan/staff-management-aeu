import { Card, Breadcrumb, Row, Col, Spin, Progress } from "antd";
import { TeamOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Count_Amount_Staff } from "../../server/report/organization/staff";
import { Count_Amount_Department } from "../../server/report/organization/department";
import { Count_Amount_Position } from "../../server/report/organization/position";
import { Count_Amount_Subject } from "../../server/report/organization/subject";

const DashboardPages = () => {
  //variable
  const [amount_staff, setAmountStaff] = useState(0);
  const [amount_department, setAmountDepartment] = useState(0);
  const [amount_position, setAmountPosition] = useState(0);
  const [amount_subject, setAmountSubject] = useState(0);
  //end variable
  //function
  const Get_Amount_Staff = () => {
    Count_Amount_Staff().then((res) => {
      setAmountStaff(res);
    });
  };
  const Get_Amount_Department = () => {
    Count_Amount_Department().then((res) => {
      setAmountDepartment(res);
    });
  };
  const Get_Amount_Position = () => {
    Count_Amount_Position().then((res) => {
      setAmountPosition(res);
    });
  };
  const Get_Amount_Subject = () => {
    Count_Amount_Subject().then((res) => {
      setAmountSubject(res);
    });
  };
  //end function
  // useEffect
  useEffect(() => {
    Get_Amount_Staff();
    Get_Amount_Department();
    Get_Amount_Position();
    Get_Amount_Subject();
  }, []);
  //end useEffect
  return (
    <>
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
              title: "Dashboard",
            },
          ]}
        />
        <Row gutter={[8, 2]}>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card>
              <span>Employee</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {amount_staff ? amount_staff : <Spin />}
                </div>
                <TeamOutlined style={{ fontSize: "30px", color: "#0a4199" }} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card>
              <span>Departments</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {amount_department ? amount_department : <Spin />}
                </div>
                <TeamOutlined style={{ fontSize: "30px", color: "#0a4199" }} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card>
              <span>Positions</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {amount_position ? amount_position : <Spin />}
                </div>
                <TeamOutlined style={{ fontSize: "30px", color: "#0a4199" }} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card>
              <span>Subjects</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {amount_subject ? amount_subject : <Spin />}
                </div>
                <TeamOutlined style={{ fontSize: "30px", color: "#0a4199" }} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default DashboardPages;
