import { Card, Breadcrumb, Row, Col, Spin, Progress } from "antd";
import { TeamOutlined } from "@ant-design/icons";
const DashboardPages = () => {
  return (
    <>
      <div>
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
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>100</div>
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
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>5</div>
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
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>20</div>
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
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>10</div>
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
