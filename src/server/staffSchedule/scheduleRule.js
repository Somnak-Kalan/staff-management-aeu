//fetch schedule_rule
const Fetch_Schedule_Rule = () => {
  let existingData = localStorage.getItem("schedule_rule");
  return new Promise((resolve, reject) => {
    const schedule_rule = JSON.parse(existingData);
    if (schedule_rule) {
      resolve(schedule_rule);
    } else {
      resolve(false);
    }
  });
};
//end get schedule_rule
//add schedule_rule

const Add_Schedule_Rule = async (newData) => {
  let existingData = localStorage.getItem("schedule_rule");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    rule_name: newData.rule_name,
    rule_type: newData.rule_type,
    duration: newData.duration,
    break_time: newData.break_time,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("schedule_rule", JSON.stringify(updatedData));
};
//end add schedule_rule
//update schedule_rule
const Update_Schedule_Rule = async (data) => {
  console.log(data, "inside update rule ");
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("schedule_rule");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      rule_name: newData.rule_name,
      rule_type: newData.rule_type,
      duration: newData.duration,
      break_time: newData.break_time,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("schedule_rule", JSON.stringify(existingData));
  }
};

//end update schedule_rule
//remove schedule_rule

const Delete_Schedule_Rule = async (id) => {
  let existingData = localStorage.getItem("schedule_rule");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("schedule_rule", JSON.stringify(updatedData));
};
//end remove schedule_rule
export {
  Fetch_Schedule_Rule,
  Add_Schedule_Rule,
  Delete_Schedule_Rule,
  Update_Schedule_Rule,
};
