/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  Row,
  Col,
  Upload,
  message,
  Select,
  DatePicker,
  Button,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const App = (props) => {
  //form
  const { form, setPersonalData } = props;

  //form
  //upload image
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  //end upload image
  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   const {
  //     first_name_kh,
  //     last_name_kh,
  //     first_name_latin,
  //     last_name_latin,
  //     dob,
  //     gender,
  //     marital_status,
  //     nation,
  //     phone,
  //     email,
  //     id_card,
  //     pob,
  //     province,
  //     district,
  //     commune,
  //     village,
  //   } = values;
  //   const doc = {
  //     first_name_kh: first_name_kh,
  //     last_name_kh: last_name_kh,
  //     first_name_latin: first_name_latin,
  //     last_name_latin: last_name_latin,
  //     dob: dob,
  //     gender: gender,
  //     marital_status: marital_status,
  //     nation: nation,
  //     phone: phone,
  //     email: email,
  //     id_card: id_card,
  //     pob: pob,
  //     province: province,
  //     district: district,
  //     commune: commune,
  //     village: village,
  //   };
  //   setPersonalData(doc);
  // };
  return (
    <Form form={form} autoComplete="off">
      <Row gutter={[8, 2]}>
        <Col sm={8} style={{ alignItems: "center", textAlign: "center" }}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="First Name(Khmer)"
            name="first_name_kh"
            style={{ margin: "0px", padding: "0px" }}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="first name (khmer)" />
            {/* <Input placeholder="first name (khmer)" /> */}
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Last Name(Khmer)"
            name="last_name_kh"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="last name (khmer)" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="First Name(Latin)"
            name="first_name_latin"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="first name (latin)" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Last Name(Latin)"
            name="last_name_latin"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="last name (latin)" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Date Of Birth"
            name="dob"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
              format="YYYY-MM-DD"
              className="w-full"
              placeholder="select date"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Gender"
            name="gender"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select gender"
              allowClear // Add this line
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Marital Status"
            name="marital_status"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select marital status"
              allowClear // Add this line
              options={[
                {
                  value: "single",
                  label: "Single",
                },
                {
                  value: "marriage",
                  label: "Marriage",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Nation"
            name="nation"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select nation"
              allowClear // Add this line
              options={[
                {
                  value: "khmer",
                  label: "Khmer",
                },
                {
                  value: "vietname",
                  label: "Vietname",
                },
                {
                  value: "thai",
                  label: "thai",
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Phone"
            name="phone"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="phone" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Email"
            name="email"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Identity Card"
            name="id_card"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="identity card" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24}>
          <Form.Item
            label="Place of Birth"
            name="pob"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Input placeholder="province - commune - district - village" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24}>
          Current
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Province"
            name="province"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select nation"
              allowClear // Add this line
              options={[
                {
                  value: "province",
                  label: "Province",
                },
                {
                  value: "Ratanakiri",
                  label: "Ratanakiri",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="District"
            name="district"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select nation"
              allowClear // Add this line
              options={[
                {
                  value: "district",
                  label: "District",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Commune"
            name="commune"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select nation"
              allowClear // Add this line
              options={[
                {
                  value: "commune",
                  label: "Commune",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Form.Item
            label="Village"
            name="village"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "field require!",
              },
            ]}
          >
            <Select
              placeholder="select nation"
              allowClear // Add this line
              options={[
                {
                  value: "village",
                  label: "Village",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default App;
