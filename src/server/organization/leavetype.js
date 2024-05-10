//fetch leave type
const Fetch_Leave_Type = () => {
  let existingData = localStorage.getItem("leave_type");
  return new Promise((resolve, reject) => {
    const leave_type = JSON.parse(existingData);
    if (leave_type) {
      resolve(leave_type);
    } else {
      resolve(false);
    }
  });
};
//end get leave_type
//add leave_type

const Add_Leave_Type = async (newData) => {
  let existingData = localStorage.getItem("leave_type");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    leave_type_name: newData.leave_type_name,
    leave_type: newData.leave_type,
    description: newData.description,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("leave_type", JSON.stringify(updatedData));
};
//end add leave_type
//update leave_type
const Update_Leave_Type = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("leave_type");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      leave_type_name: newData.leave_type_name,
      leave_type: newData.leave_type,
      description: newData.description,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("leave_type", JSON.stringify(existingData));
  }
};

//end update leave_type
//remove leave_type

const Delete_Leave_Type = async (id) => {
  let existingData = localStorage.getItem("leave_type");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("leave_type", JSON.stringify(updatedData));
};
//end remove leave_type
export {
  Fetch_Leave_Type,
  Add_Leave_Type,
  Delete_Leave_Type,
  Update_Leave_Type,
};
