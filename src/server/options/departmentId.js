const Filter_Department_By_ID = (id) => {
  let existingData = localStorage.getItem("department");
  return new Promise((resolve, reject) => {
    let departments = JSON.parse(existingData) || [];
    const filter_department =
      Array.isArray(departments) &&
      departments
        .filter((dept) => dept.id === id)
        .map((el) => ({
          label: el.department_name,
          value: el.id,
        }));
    resolve(filter_department);
  });
};
export { Filter_Department_By_ID };
