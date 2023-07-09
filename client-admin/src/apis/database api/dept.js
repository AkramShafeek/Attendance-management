import { adminRootUrl } from "../config";
import axios from "axios";

export const fetchDeptsApi = async () => {
  try {
    const response = await axios.get(`${adminRootUrl}/dept/read`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
  }
}

export const createDeptsApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/dept/create`;
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

export const editDeptsApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/dept/update`;
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
    throw (error);
  }
}

export const deleteDeptsApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/dept/delete`;
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