const Fetch_Shift_Opt = () => {
  let existingData = localStorage.getItem("shift");
  return new Promise((resolve, reject) => {
    const shift = JSON.parse(existingData);
    if (shift) {
      const shift_otp = shift.map((el) => ({
        value: el.id,
        label: el.shift_name,
      }));
      resolve(shift_otp);
    } else {
      resolve(false);
    }
  });
};
export { Fetch_Shift_Opt };
