const Fetch_Department_Option = () => {
  let existingData = localStorage.getItem("department");
  return new Promise((resolve, reject) => {
    const departments = JSON.parse(existingData);
    if (departments) {
      const department_option = departments.map((el) => ({
        value: el.id,
        label: el.department_name,
      }));
      resolve(department_option);
    } else {
      resolve(false);
    }
  });
};
export { Fetch_Department_Option };
