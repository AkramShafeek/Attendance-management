import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Navigator = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("database");
  })
  return;
}

export default Navigator;