const Filter_Staff = (staff_code) => {
  let existingData = localStorage.getItem("staff");

  return new Promise((resolve, reject) => {
    try {
      let staff = JSON.parse(existingData) || [];
      if (!Array.isArray(staff)) {
        return reject("Invalid data format");
      }

      const filter_staff = staff.find(
        (employee) => employee?.company?.staff_id === staff_code
      );

      resolve(filter_staff);
    } catch (error) {
      reject("Error parsing JSON from localStorage");
    }
  });
};

export { Filter_Staff };
