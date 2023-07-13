import { useSelector } from "react-redux";

const PeriodEditModal = () => {
  const selectedPeriod = useSelector((store) => store.timetable.selectedPeriod);
  return (
    <div className="flex-column gap-1">
      <div className="flex-row gap-1"><p style={{wordSpacing: '6px'}}>Course: {" " + selectedPeriod?.course}</p></div>
      <div className="flex-row gap-1"><p style={{wordSpacing: '6px'}}>Faculty: {" " + selectedPeriod?.faculty}</p></div>
    </div>
  )
}

export default PeriodEditModal;