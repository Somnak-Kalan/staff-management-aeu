import { Card, Row, Col, Table, Button, message } from "antd";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
//form
import AddShiftForm from "./AddShift";
//end form
const Staff = () => {
  const [add_open, setAddOpen] = useState(false);
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
  //end notification
  const data = [
    {
      schedule_name: "Monday-Friday",
      monday: [
        {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },
      ],
      tuesday: [
        {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },
      ],
      wednesday: [
        {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },
      ],
      thursday: [
        {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },
      ],
      friday: [
        {
          morning: { start: "8:00 AM", end: "12:00 PM" },
          afternoon: { start: "13:00 PM", end: "17:00 PM" },
        },
      ],
    },
    // {
    //   tuesday: [
    //     {
    //       morning: { start: "8:00 AM", end: "12:00 PM" },
    //       afternoon: { start: "13:00 PM", end: "17:00 PM" },
    //     },
    //   ],
    // },
    // {
    //   wednesday: [
    //     {
    //       morning: { start: "8:00 AM", end: "12:00 PM" },
    //       afternoon: { start: "13:00 PM", end: "17:00 PM" },
    //     },
    //   ],
    // },
    // {
    //   thursday: [
    //     {
    //       morning: { start: "8:00 AM", end: "12:00 PM" },
    //       afternoon: { start: "13:00 PM", end: "17:00 PM" },
    //     },
    //   ],
    // },
    // {
    //   friday: [
    //     {
    //       morning: { start: "8:00 AM", end: "12:00 PM" },
    //       afternoon: { start: "13:00 PM", end: "17:00 PM" },
    //     },
    //   ],
    // },
    // {
    //   saturday: [
    //     {
    //       morning: { start: "8:00 AM", end: "12:00 PM" },
    //       afternoon: { start: "13:00 PM", end: "17:00 PM" },
    //     },
    //   ],
    // },
    // {
    //   sunday: [
    //     {
    //       morning: { start: "8:00 AM", end: "12:00 PM" },
    //       afternoon: { start: "13:00 PM", end: "17:00 PM" },
    //     },
    //   ],
    // },
  ];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, recorder, index) => index + 1,
    },
    {
      title: "Schedule Name ",
      dataIndex: "schedule_name",
      key: "schedule_name",
    },
    {
      title: "Monday",
      dataIndex: "monday",
      key: "monday",
      render: (_, record) => {
        if (record.monday && record.monday.length > 0) {
          const { morning, afternoon } = record.monday[0];
          return (
            <>
              <div>
                <span>
                  {morning?.start} - {morning?.end}
                </span>
              </div>
              <div>
                <span>
                  {afternoon?.start} - {afternoon?.end}
                </span>
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
        if (record.tuesday && record.tuesday.length > 0) {
          const { morning, afternoon } = record.tuesday[0];
          return (
            <>
              <div>
                <span>
                  {morning?.start} - {morning?.end}
                </span>
              </div>
              <div>
                <span>
                  {afternoon?.start} - {afternoon?.end}
                </span>
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
        if (record.wednesday && record.wednesday.length > 0) {
          const { morning, afternoon } = record.wednesday[0];
          return (
            <>
              <div>
                <span>
                  {morning?.start} - {morning?.end}
                </span>
              </div>
              <div>
                <span>
                  {afternoon?.start} - {afternoon?.end}
                </span>
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
        if (record.thursday && record.thursday.length > 0) {
          const { morning, afternoon } = record.thursday[0];
          return (
            <>
              <div>
                <span>
                  {morning?.start} - {morning?.end}
                </span>
              </div>
              <div>
                <span>
                  {afternoon?.start} - {afternoon?.end}
                </span>
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
        if (record.friday && record.friday.length > 0) {
          const { morning, afternoon } = record.friday[0];
          return (
            <>
              <div>
                <span>
                  {morning?.start} - {morning?.end}
                </span>
              </div>
              <div>
                <span>
                  {afternoon?.start} - {afternoon?.end}
                </span>
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
        if (record.saturday && record.saturday.length > 0) {
          const { morning, afternoon } = record.saturday[0];
          return (
            <>
              <div>
                <span>
                  {morning?.start} - {morning?.end}
                </span>
              </div>
              <div>
                <span>
                  {afternoon?.start} - {afternoon?.end}
                </span>
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
        if (record.sunday && record.sunday.length > 0) {
          const { morning, afternoon } = record.sunday[0];
          return (
            <>
              <div>
                <span>
                  {morning?.start} - {morning?.end}
                </span>
              </div>
              <div>
                <span>
                  {afternoon?.start} - {afternoon?.end}
                </span>
              </div>
            </>
          );
        } else {
          return null;
        }
      },
    },
  ];
  return (
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
          />
          {/* end add department */}
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
