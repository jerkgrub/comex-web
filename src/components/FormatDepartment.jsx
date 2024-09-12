const FormatDepartment = ({ department }) => {
  if (!department) return null;
  
  const words = department.split(' ');
  let formattedDepartment = department;

  if (words.length > 3) {
    formattedDepartment = `${words.slice(0, 3).join(' ')}\n${words.slice(3).join(' ')}`;
  }

  return (
    <p style={{ whiteSpace: "pre-line" }}>
      {formattedDepartment}
    </p>
  );
};

export default FormatDepartment;
