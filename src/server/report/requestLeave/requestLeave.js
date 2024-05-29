const Fetch_Leave_Type = () => {
  let existingData = localStorage.getItem("request_leave");
  let existingDepartment = localStorage.getItem("department");
  let existingPosition = localStorage.getItem("position");
  let existingSubject = localStorage.getItem("subject");
  let existingStaff = localStorage.getItem("staff");
  let existingLeaveType = localStorage.getItem("leave_type");

  return new Promise((resolve, reject) => {
    const request_leaves = JSON.parse(existingData);
    const existing_department = existingDepartment
      ? JSON.parse(existingDepartment)
      : [];
    const existing_position = existingPosition
      ? JSON.parse(existingPosition)
      : [];
    const existing_subject = existingSubject ? JSON.parse(existingSubject) : [];
    const existing_staff = existingStaff ? JSON.parse(existingStaff) : [];
    const existing_leave_type = existingLeaveType
      ? JSON.parse(existingLeaveType)
      : [];

    if (request_leaves) {
      const result = request_leaves.map((el) => {
        const staff = existing_staff.find((st) => st.id === el?.staff_id);
        const department = existing_department.find(
          (dept) => dept.id === el?.department_id
        );
        const position = existing_position.find(
          (po) => po.id === el?.position_id
        );
        const subject = existing_subject.find(
          (sub) => sub.id === el?.subject_id
        );
        const leave_types = existing_leave_type.find(
          (leave) => leave.id === el?.leave_type
        );
        return {
          ...el,

          staff_name: staff?.first_name_latin + " " + staff?.last_name_latin,
          staff_code: staff?.company?.staff_id,
          department_name: department?.department_name,
          position_name: position?.position_name,
          subject_name: subject?.subject_name,
          leave_type_name: leave_types?.leave_type_name,
        };
      });
      resolve(result);
    } else {
      resolve(false);
    }
  });
};

//end get department
//add department

const Add_Request_Leave = async (newData) => {
  let existingData = localStorage.getItem("request_leave");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    day_option: newData.day_option,
    department_id: newData.department_id,
    description: newData.description,
    from_date: newData.from_date,
    leave_type: newData.leave_type,
    position_id: newData.position_id,
    staff_code: newData.staff_code,
    staff_id: newData.staff_id,
    subject_id: newData.subject_id,
    to_date: newData.to_date,
    total_day: newData.total_day,
    reason: newData.reason,
    status: "pending",
  };
  const addData = [...existingData, new_data];
  localStorage.setItem("request_leave", JSON.stringify(addData));
};
//end add department
//update department
const Update_Department = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("department");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      department_name: newData.department_name,
      university_name: newData.university_name,
      description: newData.description,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("department", JSON.stringify(existingData));
  }
};

//end update department
//remove department

const Delete_Department = async (id) => {
  let existingData = localStorage.getItem("department");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("department", JSON.stringify(updatedData));
};
//end remove department
export { Add_Request_Leave, Fetch_Leave_Type };
