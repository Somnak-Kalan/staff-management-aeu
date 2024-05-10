//fetch event
const Fetch_Event = () => {
  let existingData = localStorage.getItem("event");
  return new Promise((resolve, reject) => {
    const event = JSON.parse(existingData);
    if (event) {
      resolve(event);
    } else {
      resolve(false);
    }
  });
};
//end get event
//add event

const Add_Event = async (newData) => {
  let existingData = localStorage.getItem("event");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    event_name: newData.event_name,
    amount_day: newData.amount_day,
    option: newData.option,
    from_date: newData.from_date,
    to_date: newData.to_date,
    description: newData.description,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("event", JSON.stringify(updatedData));
};
//end add event
//update event
const Update_Event = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("event");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      option: newData.option,
      event_name: newData.event_name,
      amount_day: newData.amount_day,
      from_date: newData.from_date,
      to_date: newData.to_date,
      description: newData.description,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("event", JSON.stringify(existingData));
  }
};

//end update event
//remove event

const Delete_Event = async (id) => {
  let existingData = localStorage.getItem("event");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("event", JSON.stringify(updatedData));
};
//end remove event
export { Fetch_Event, Add_Event, Delete_Event, Update_Event };
