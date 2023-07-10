export const getClassId = (classList, params) => {
  var classId = undefined;
  for (let element of classList) {
    console.log(element)
    const deptMatch = Boolean(element.dept._id === params.dept);
    const yearMatch = Boolean(element.year === params.year);
    const semMatch = Boolean(element.sem === params.sem);
    const sectionMatch = Boolean(element.section === params.section);
    if (deptMatch && yearMatch && semMatch && sectionMatch) {
      classId = element._id;
      break;
    }
  }
  return classId;
}