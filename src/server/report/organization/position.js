//fetch position
const Count_Amount_Position = () => {
  let existingData = localStorage.getItem("position");
  let existingData_department = localStorage.getItem("department");

  return new Promise((resolve, reject) => {
    let positions = JSON.parse(existingData);
    const count_amount_position = positions ? positions.length : 0;
    resolve(count_amount_position);
  });
};
export { Count_Amount_Position };
