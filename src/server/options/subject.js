const Filter_Subject_By_ID = (id) => {
  let existingData = localStorage.getItem("subject");
  return new Promise((resolve, reject) => {
    let subjects = JSON.parse(existingData) || [];
    const filter_subject =
      Array.isArray(subjects) &&
      subjects
        .filter((dept) => dept.id === id)
        .map((el) => ({
          label: el.subject_name,
          value: el.id,
        }));
    resolve(filter_subject);
  });
};
export { Filter_Subject_By_ID };
