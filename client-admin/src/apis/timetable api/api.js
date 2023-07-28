import { adminRootUrl } from "../config";
import axios from "axios";

export const fetchApi = async (query) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      },
      params: { ...query }
    }
    const response = await axios.get(`${adminRootUrl}/timetable/read`,config);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
  }
}

export const createApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/timetable/create`;
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

export const editApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/timetable/update`;
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

export const deleteApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/timetable/delete`;
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