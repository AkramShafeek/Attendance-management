import { facultyRootUrl } from "./config"
import axios from "axios";

export const fetchTodayAttendanceApi = async (token) => {
  try {
    const url = `${facultyRootUrl}/todayclasses`;
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

export const fetchStudentsFromClassApi = async(_class, token) => {
  try {
    const url = `${facultyRootUrl}/getstudentsfromclass/${_class}`;
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