const Fetch_Company_By_Department_Id = (id) => {
  let existingData = localStorage.getItem("company");
  return new Promise((resolve, reject) => {
    let companys = JSON.parse(existingData) || [];
    if (companys) {
      const filteredCompany = companys
        .filter((pos) => pos.id === id)
        .map((el) => ({
          label: el.company_en,
          value: el.id,
        }));
      resolve(filteredCompany);
    } else {
      resolve(false);
    }
  });
};
export { Fetch_Company_By_Department_Id };
