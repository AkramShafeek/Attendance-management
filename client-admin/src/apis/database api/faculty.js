import { adminRootUrl } from "../config";
import axios from "axios";

export const fetchFacultyApi = async () => {
  try {
    const response = await axios.get(`${adminRootUrl}/faculty/read`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
  }
}

export const createFacultyApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/faculty/create`;
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

export const editFacultyApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/faculty/update`;
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

export const deleteFacultyApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/faculty/delete`;
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