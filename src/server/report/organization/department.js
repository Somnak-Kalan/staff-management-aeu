const Count_Amount_Department = () => {
  let existingData = localStorage.getItem("department");
  return new Promise((resolve, reject) => {
    const departments = JSON.parse(existingData);
    const count_amount_department = departments ? departments.length : 0;
    resolve(count_amount_department);
  });
};
export { Count_Amount_Department };
