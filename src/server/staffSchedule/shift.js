//fetch shift
const Fetch_Shift = () => {
  let existingData = localStorage.getItem("shift");
  return new Promise((resolve, reject) => {
    const shift = JSON.parse(existingData);
    if (shift) {
      resolve(shift);
    } else {
      resolve(false);
    }
  });
};
//end get shift
//add shift

const Add_Shift = async (newData) => {
  console.log(newData, "inside");
  let existingData = localStorage.getItem("shift");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    shift_name: newData.shift_name,
    attendance_rule_ids: newData.attendance_rule_ids,
    attendance: newData.attendance,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("shift", JSON.stringify(updatedData));
};
//end add shift
//update shift
const Update_Shift = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("shift");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      shift_name: newData.shift_name,
      university_name: newData.university_name,
      description: newData.description,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("shift", JSON.stringify(existingData));
  }
};

//end update shift
//remove shift

const Delete_Shift = async (id) => {
  let existingData = localStorage.getItem("shift");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("shift", JSON.stringify(updatedData));
};
//end remove shift
export { Fetch_Shift, Add_Shift, Delete_Shift, Update_Shift };
