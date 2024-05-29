import { Empty } from "antd";

//fetch staff
const Fetch_Staff = () => {
  let existingData = localStorage.getItem("staff");
  let existingDataCompany = localStorage.getItem("company");
  let existingDepartment = localStorage.getItem("department");
  let existingPosition = localStorage.getItem("position");
  let existingSubject = localStorage.getItem("subject");

  return new Promise((resolve, reject) => {
    let staff = JSON.parse(existingData) || [];
    const companyData = JSON.parse(existingDataCompany) || [];
    const departmentData = JSON.parse(existingDepartment) || [];
    const positionData = JSON.parse(existingPosition) || [];
    const subjectData = JSON.parse(existingSubject) || [];

    staff = staff.map((employee) => {
      const company = companyData.find(
        (company) => company.employee_id === employee.id
      );

      const departments = departmentData.find(
        (dep) => dep.id === company?.department_id
      );

      const position = positionData.find(
        (pos) => pos.id === company?.position_id
      );

      const subject = subjectData.find(
        (type) => type.id === company?.subject_id
      );
      return { ...employee, company, departments, position, subject };
    });

    localStorage.setItem("staff", JSON.stringify(staff));

    resolve(staff);
  });
};

//end get staff
//add staff

const Add_Staff = async (newData) => {
  let existingData = localStorage.getItem("staff");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    first_name_kh: newData.first_name_kh,
    last_name_kh: newData.last_name_kh,
    first_name_latin: newData.first_name_latin,
    last_name_latin: newData.last_name_latin,
    dob: newData.dob,
    gender: newData.gender,
    marital_status: newData.marital_status,
    nation: newData.nation,
    phone: newData.phone,
    email: newData.email,
    id_card: newData.id_card,
    pob: newData.pob,
    province: newData.province,
    district: newData.district,
    commune: newData.commune,
    village: newData.village,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("staff", JSON.stringify(updatedData));
};
//end add staff

//end add staff
//update staff
const Update_Staff = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("staff");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      staff_kh: newData.staff_kh,
      staff_en: newData.staff_en,
      from_date: newData.from_date,
      to_date: newData.to_date,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("staff", JSON.stringify(existingData));
  }
};

//end update staff
//remove staff

const Delete_Staff = async (id) => {
  let existingData = localStorage.getItem("staff");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("staff", JSON.stringify(updatedData));
};
//end remove staff
export { Fetch_Staff, Add_Staff, Delete_Staff, Update_Staff };
