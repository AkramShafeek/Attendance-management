import { adminRootUrl } from "../config";
import axios from "axios";

export const fetchStudentsApi = async () => {
  try {
    const response = await axios.get(`${adminRootUrl}/student/read`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
  }
}

export const createStudentsApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/student/create`;
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await axios.post(url, payload, config);
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    throw (error.response.data.msg);
  }
}

export const editStudentsApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/student/update`;
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await axios.put(url, payload, config);
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    throw (error.response.data.msg);
  }
}

export const deleteStudentsApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/student/delete`;
    // payload has to be sent along with config in delete request
    const config = {
      data: payload,
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await axios.delete(url, config);
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    throw (error.response.data.msg);
  }
}