const Fetch_Apply_Shift = () => {
  let existing_data_dept = localStorage.getItem("apply_to_dept");
  let existing_data_staff = localStorage.getItem("staff");
  let existing_data_ee = localStorage.getItem("apply_to_ee");
  let existing_data_shift = localStorage.getItem("shift");
  let existing_data_department = localStorage.getItem("department");

  return new Promise((resolve, reject) => {
    const data_dept = JSON.parse(existing_data_dept) || [];
    const data_ee = JSON.parse(existing_data_ee) || [];
    const data_shift = JSON.parse(existing_data_shift) || [];
    const data_department = JSON.parse(existing_data_department) || [];
    const data_staff = JSON.parse(existing_data_staff) || [];

    if (data_dept.length > 0 || data_ee.length > 0) {
      // Create a map to accumulate departments with their staff
      const departmentMap = new Map();

      data_dept.forEach((dept) => {
        const departmentEntry = data_department.find(
          (dep) => dep.id === dept.department_id
        );
        const shiftEntry = data_shift.find((shi) => shi.id === dept.shift_id);

        const departmentName = departmentEntry
          ? departmentEntry.department_name
          : "Unknown Department";

        const defaultShift = shiftEntry
          ? shiftEntry.shift_name
          : "No shift assigned";

        if (!departmentMap.has(dept.department_id)) {
          departmentMap.set(dept.department_id, {
            department_name: departmentName,
            shift_name: defaultShift,
            staff: new Map(),
          });
        }

        // Find matching staff data for the current department
        const staffForDept = data_ee
          .filter((ee) => ee.department_id === dept.department_id)
          .map((ee) => {
            // Find matching shift data for the current employee
            const shiftForEE = data_shift.find(
              (shift) => shift.employee_id === ee.employee_id
            );
            const staff = data_staff.find((st) => st.id === ee.staff_id);
            return {
              id: ee.staff_id,
              name: staff
                ? staff.first_name_latin + " " + staff.last_name_latin
                : "Unknown Staff",
              shift: shiftForEE ? shiftForEE.shift_name : defaultShift,
            };
          });

        // Accumulate staff into the department, ensuring uniqueness
        const departmentMapEntry = departmentMap.get(dept.department_id);
        staffForDept.forEach((staff) => {
          if (!departmentMapEntry.staff.has(staff.id)) {
            departmentMapEntry.staff.set(staff.id, staff);
          }
        });
      });
      //staff
      data_ee.forEach((dept) => {
        const departmentEntry = data_department.find(
          (dep) => dep.id === dept.department_id
        );
        const shiftEntry = data_shift.find((shi) => shi.id === dept.shift_id);

        const departmentName = departmentEntry
          ? departmentEntry.department_name
          : "Unknown Department";

        const defaultShift = shiftEntry
          ? shiftEntry.shift_name
          : "No shift assigned";

        if (!departmentMap.has(dept.department_id)) {
          departmentMap.set(dept.department_id, {
            department_name: departmentName,
            shift_name: defaultShift,
            staff: new Map(),
          });
        }

        // Find matching staff data for the current department
        const staffForDept = data_ee
          .filter((ee) => ee.department_id === dept.department_id)
          .map((ee) => {
            // Find matching shift data for the current employee
            const shiftForEE = data_shift.find(
              (shift) => shift.employee_id === ee.employee_id
            );
            const staff = data_staff.find((st) => st.id === ee.staff_id);
            return {
              id: ee.staff_id,
              name: staff
                ? staff.first_name_latin + " " + staff.last_name_latin
                : "Unknown Staff",
              shift: shiftForEE ? shiftForEE.shift_name : defaultShift,
            };
          });

        // Accumulate staff into the department, ensuring uniqueness
        const departmentMapEntry = departmentMap.get(dept.department_id);
        staffForDept.forEach((staff) => {
          if (!departmentMapEntry.staff.has(staff.id)) {
            departmentMapEntry.staff.set(staff.id, staff);
          }
        });
      });

      // Convert map to array and format the staff map to array
      const combinedData = Array.from(departmentMap.values()).map((dept) => ({
        ...dept,
        staff: Array.from(dept.staff.values()),
      }));

      resolve(combinedData);
    } else {
      resolve(false);
    }
  });
};
//end get department
//add department

const Apply_To_Dept = async (newData) => {
  let existingData = localStorage.getItem("apply_to_dept");
  let existing_data_staff = localStorage.getItem("staff");
  existingData = existingData ? JSON.parse(existingData) : [];

  // Find the department in the existing data
  const deptIndex = existingData.findIndex(
    (dept) => dept.department_id === newData.department_id
  );

  if (deptIndex !== -1) {
    // Department exists, update the shift
    existingData[deptIndex].shift_id = newData.shift_id;

    // localStorage.setItem("staff", JSON.stringify(data_staff));
  } else {
    // Assign shift to staff in the department
    const data_staff = JSON.parse(existing_data_staff) || [];
    const staffInDepartment = data_staff.filter(
      (staff) => staff.departments.id === newData.department_id
    );
    console.log(data_staff, "when add ");
    let existingData_ee = localStorage.getItem("apply_to_ee");
    existingData_ee = existingData_ee ? JSON.parse(existingData_ee) : [];

    const new_data_ee = {
      id: existingData_ee.length,
      department_id: newData.department_id,
      shift_id: newData.shift_id,
      staff_id: newData.staff_id,
    };
    existingData_ee.push(new_data_ee);
    // }

    // const updatedData = [...existingData_ee, new_data];
    localStorage.setItem("apply_to_ee", JSON.stringify(existingData_ee));
    staffInDepartment.forEach((staff) => {
      if ((staff.shift_id = newData.shift_id)) {
        console.log(staff, "when add ");
      }
    });
    // Department does not exist, add a new entry
    const new_data = {
      id: existingData.length,
      department_id: newData.department_id,
      shift_id: newData.shift_id,
    };
    existingData.push(new_data);
  }

  // Update local storage
  localStorage.setItem("apply_to_dept", JSON.stringify(existingData));
};

const Apply_To_EE = async (newData) => {
  let existingData = localStorage.getItem("apply_to_ee");
  existingData = existingData ? JSON.parse(existingData) : [];

  // Find the department in the existing data
  const deptIndex = existingData.findIndex(
    (dept) => dept.department_id === newData.department_id
  );

  if (deptIndex !== -1) {
    // Department exists, update the shift
    existingData[deptIndex].shift_id = newData.shift_id;
  } else {
    // Department does not exist, add a new entry
    const new_data = {
      id: existingData.length,
      department_id: newData.department_id,
      shift_id: newData.shift_id,
      staff_id: newData.staff_id,
    };
    existingData.push(new_data);
  }

  // const updatedData = [...existingData, new_data];
  localStorage.setItem("apply_to_ee", JSON.stringify(existingData));
};

export {
  Apply_To_Dept,
  Apply_To_EE,
  Fetch_Apply_Shift,
  // Delete_Department,
  // Update_Department,
};
