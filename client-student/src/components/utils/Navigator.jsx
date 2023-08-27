import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Navigator = () => {
  console.log("I'm mounted")
  const navigate = useNavigate();
  useEffect(() => {
    navigate("todayattendance");
  })
  return;
}

export default Navigator;