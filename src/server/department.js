//fetch department
const Fetch_Department = () => {
  let existingData = localStorage.getItem("department");
  return new Promise((resolve, reject) => {
    const departments = JSON.parse(existingData);
    if (departments) {
      resolve(departments);
    } else {
      resolve(false);
    }
  });
};
//end get department
//add department

const Add_Department = async (newData) => {
  let existingData = localStorage.getItem("department");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    department_name: newData.department_name,
    university_name: newData.university_name,
    description: newData.description,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("department", JSON.stringify(updatedData));
};
//end add department
//update department
const Update_Department = async (data) => {
  console.log(data, "back end");
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
export {
  Fetch_Department,
  Add_Department,
  Delete_Department,
  Update_Department,
};
