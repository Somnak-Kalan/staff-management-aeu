const Filter_Position_By_ID = (id) => {
  let existingData = localStorage.getItem("position");
  return new Promise((resolve, reject) => {
    let positions = JSON.parse(existingData) || [];
    if (positions) {
      const filteredPositions = positions
        .filter((pos) => pos.id === id)
        .map((el) => ({
          label: el.position_name,
          value: el.id,
        }));
      resolve(filteredPositions);
    } else {
      resolve(false);
    }
  });
};

export { Filter_Position_By_ID };
