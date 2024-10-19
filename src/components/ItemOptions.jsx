// src/components/ItemOptions.jsx

const usertypeItems = [
  { label: "All Usertypes", value: "All Usertypes" },
  // Removed the "Admin" option as per the revision
  { label: "Comex Coordinator", value: "Comex Coordinator" },
  { label: "Faculty", value: "Faculty" },
  { label: "NTP", value: "NTP" },
  { label: "Student", value: "Student" },
];

const departmentItems = [
  { label: "All Departments", value: "All Departments" },
  { label: "College of Dentistry", value: "College of Dentistry" },
  { label: "School of Optometry", value: "School of Optometry" },
  { label: "School of Health Sciences", value: "School of Health Sciences" },
  { label: "School of Accountancy and Management", value: "School of Accountancy and Management" },
  { label: "School of Information Technology", value: "School of Information Technology" },
  { label: "School of Arts and Sciences", value: "School of Arts and Sciences" },
  { label: "School of Architecture", value: "School of Architecture" },
  { label: "Senior High School Department", value: "Senior High School Department" },
  { label: "Others", value: "Others" },
];

const ntpDepartmentItems = [
  { label: "All Departments", value: "All Departments" },
  { label: "Admission", value: "Admission" },
  { label: "Treasury", value: "Treasury" },
  { label: "ITRO", value: "ITRO" },
  { label: "Clinic", value: "Clinic" },
  { label: "Guidance", value: "Guidance" },
  { label: "SDAO", value: "SDAO" },
  { label: "Security", value: "Security" },
  { label: "Housekeeping", value: "Housekeeping" },
];

const activityTypeItems = [
  { label: "All Activities", value: "" },
  { label: "Institutional", value: "Institutional" },
  { label: "College Driven", value: "College Driven" },
];

export { usertypeItems, departmentItems, activityTypeItems, ntpDepartmentItems };