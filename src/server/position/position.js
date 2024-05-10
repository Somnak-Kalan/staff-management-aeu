//fetch position
const Fetch_Position = () => {
  let existingData = localStorage.getItem("position");
  let existingData_department = localStorage.getItem("department");

  return new Promise((resolve, reject) => {
    let positions = JSON.parse(existingData);
    let department = JSON.parse(existingData_department);
    if (positions) {
      // Add department_name: "hello" to each position
      positions = positions.map((position) => ({
        ...position,
        department_name:
          department.find((dep) => dep.id === position.department_id)
            ?.department_name || "",
      }));
      resolve(positions);
    } else {
      resolve(false);
    }
  });
};

//end get position
//add position

const Add_Position = async (newData) => {
  let existingData = localStorage.getItem("position");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    position_name: newData.position_name,
    department_id: newData.department_id,
    description: newData.description,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("position", JSON.stringify(updatedData));
};
//end add position
//update position
const Update_Position = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("position");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      position_name: newData.position_name,
      department_id: newData.department_id,
      description: newData.description,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("position", JSON.stringify(existingData));
  }
};

//end update position
//remove position

const Delete_Position = async (id) => {
  let existingData = localStorage.getItem("position");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("position", JSON.stringify(updatedData));
};
//end remove position
export { Fetch_Position, Add_Position, Delete_Position, Update_Position };
