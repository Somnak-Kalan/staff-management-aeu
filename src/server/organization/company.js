//fetch company
const Fetch_Company = () => {
  let existingData = localStorage.getItem("company");
  return new Promise((resolve, reject) => {
    const company = JSON.parse(existingData);
    if (company) {
      resolve(company);
    } else {
      resolve(false);
    }
  });
};
//end get company
//add staff

const Add_Company = async (newData) => {
  let existingData = localStorage.getItem("company");
  let existingStaffData = localStorage.getItem("company");
  existingData = existingData ? JSON.parse(existingData) : [];
  existingStaffData = existingStaffData ? JSON.parse(existingStaffData) : [];
  const new_data = {
    id: existingData.length,
    employee_id: existingStaffData.length,
    company_kh: newData.company_kh,
    company_en: newData.company_en,
    from_date: newData.from_date,
    to_date: newData.to_date,

    staff_id: newData.staff_id,
    bank_acc: newData.bank_acc,
    join_date: newData.join_date,
    department_id: newData.department_id,
    position_id: newData.position_id,
    subject_id: newData.subject_id,
    leave_type: newData.leave_type,
    working_time: newData.working_time,
    schedule: newData.schedule,
    probation_date: newData.probation_date,
    pass_probation_date: newData.pass_probation_date,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("company", JSON.stringify(updatedData));
};
//end add company
//update company
const Update_Company = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("company");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      company_kh: newData.company_kh,
      company_en: newData.company_en,
      from_date: newData.from_date,
      to_date: newData.to_date,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("company", JSON.stringify(existingData));
  }
};

//end update company
//remove company

const Delete_Company = async (id) => {
  let existingData = localStorage.getItem("company");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.employee_id !== id);
  localStorage.setItem("company", JSON.stringify(updatedData));
};
//end remove Company
export { Fetch_Company, Add_Company, Delete_Company, Update_Company };
