//fetch subject
const Fetch_Subject = () => {
  let existingData = localStorage.getItem("subject");
  return new Promise((resolve, reject) => {
    const subject = JSON.parse(existingData);
    if (subject) {
      resolve(subject);
    } else {
      resolve(false);
    }
  });
};
//end get subject
//add subject

const Add_Subject = async (newData) => {
  let existingData = localStorage.getItem("subject");
  existingData = existingData ? JSON.parse(existingData) : [];
  const new_data = {
    id: existingData.length,
    subject_name: newData.subject_name,
    university_name: newData.university_name,
    description: newData.description,
  };
  const updatedData = [...existingData, new_data];
  localStorage.setItem("subject", JSON.stringify(updatedData));
};
//end add subject
//update subject
const Update_Subject = async (data) => {
  const id = data.id;
  const newData = data;
  let existingData = localStorage.getItem("subject");
  existingData = existingData ? JSON.parse(existingData) : [];
  // Find the index of the item to edit
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Update the item with the new data
    existingData[index] = {
      ...existingData[index],
      subject_name: newData.subject_name,
      description: newData.description,
    };
    // Save the updated data back to localStorage
    localStorage.setItem("subject", JSON.stringify(existingData));
  }
};

//end update subject
//remove subject

const Delete_Subject = async (id) => {
  let existingData = localStorage.getItem("subject");
  existingData = existingData ? JSON.parse(existingData) : [];
  const updatedData = existingData.filter((item) => item.id !== id);
  localStorage.setItem("subject", JSON.stringify(updatedData));
};
//end remove subject
export { Fetch_Subject, Add_Subject, Delete_Subject, Update_Subject };
