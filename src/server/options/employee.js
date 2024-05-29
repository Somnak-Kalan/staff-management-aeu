const Fetch_Staff_Otp_Follow_Department = (id) => {
  let existingData = localStorage.getItem("staff");
  return new Promise((resolve, reject) => {
    let staff = JSON.parse(existingData) || [];
    const filter_staff =
      Array.isArray(staff) &&
      staff
        .filter((employee) => employee.departments.id === id)
        .map((employee) => ({
          label: employee.first_name_latin + " " + employee.last_name_latin,
          value: employee.id,
        }));
    resolve(filter_staff);
  });
};
export { Fetch_Staff_Otp_Follow_Department };
