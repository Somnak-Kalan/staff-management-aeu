//fetch staff
const Count_Amount_Staff = () => {
  let existingData = localStorage.getItem("staff");

  return new Promise((resolve, reject) => {
    let staff = JSON.parse(existingData) || [];
    const count_amount_staff = staff ? staff.length : 0;
    resolve(count_amount_staff);
  });
};
export { Count_Amount_Staff };
