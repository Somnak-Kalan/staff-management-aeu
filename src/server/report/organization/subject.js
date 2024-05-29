const Count_Amount_Subject = () => {
  let existingData = localStorage.getItem("subject");
  return new Promise((resolve, reject) => {
    const subject = JSON.parse(existingData);
    const count_amount_subject = subject ? subject.length : 0;
    resolve(count_amount_subject);
  });
};
export { Count_Amount_Subject };
