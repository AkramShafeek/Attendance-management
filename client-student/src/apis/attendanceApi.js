import { studentRootUrl } from "./config"
import axios from "axios";

export const getStudentAttendance = async (token) => {
  try {
    const url = `${studentRootUrl}/attendance`;
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    if (error.response.data.msg)
      throw error.response.data.msg;
    throw (error.response.data);
  }
}


