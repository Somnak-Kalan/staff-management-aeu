const Fetch_Position_By_Department_Id = (id) => {
  let existingData = localStorage.getItem("position");
  return new Promise((resolve, reject) => {
    let positions = JSON.parse(existingData) || [];
    if (positions) {
      const filteredPositions = positions.filter(
        (pos) => pos.department_id === id
      );
      resolve(filteredPositions);
    } else {
      resolve(false);
    }
  });
};

export { Fetch_Position_By_Department_Id };
