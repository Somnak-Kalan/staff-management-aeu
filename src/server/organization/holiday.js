//fetch holiday
const Fetch_Holiday = () => {
  let existingData = localStorage.getItem("holiday");
  return new Promise((resolve, reject) => {
    const holiday = JSON.parse(existingData);
    if (holiday) {
      resolve(holiday);
    } else {
      resolve(false);
    }
  });
};
//end get holiday
//add holiday

const Add_Holiday = async (newData) => {
  let existingData = localStorage.getItem("holiday");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    holiday_kh: newData.holiday_kh,
    holiday_en: newData.holiday_en,
    from_date: newData.from_date,
    to_date: newData.to_date,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("holiday", JSON.stringify(updatedData));
};
//end add holiday
//update holiday
const Update_Holiday = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("holiday");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      holiday_kh: newData.holiday_kh,
      holiday_en: newData.holiday_en,
      from_date: newData.from_date,
      to_date: newData.to_date,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("holiday", JSON.stringify(existingData));
  }
};

//end update holiday
//remove holiday

const Delete_Holiday = async (id) => {
  let existingData = localStorage.getItem("holiday");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("holiday", JSON.stringify(updatedData));
};
//end remove holiday
export { Fetch_Holiday, Add_Holiday, Delete_Holiday, Update_Holiday };
