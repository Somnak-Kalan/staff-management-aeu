const Fetch_Leave_Type_Option = () => {
  let existingData = localStorage.getItem("leave_type");
  return new Promise((resolve, reject) => {
    const leave_type = JSON.parse(existingData);
    if (leave_type) {
      const leave_type_option = leave_type.map((el) => ({
        value: el.id,
        label: el.leave_type_name,
      }));
      resolve(leave_type_option);
    } else {
      resolve(false);
    }
  });
};
export { Fetch_Leave_Type_Option };
