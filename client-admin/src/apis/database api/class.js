import { adminRootUrl } from "../config";
import axios from "axios";

export const fetchClassApi = async () => {
  try {
    const response = await axios.get(`${adminRootUrl}/class/read`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
  }
}

export const createClassApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/class/create`;
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

export const editClassApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/class/update`;
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

export const deleteClassApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/class/delete`;
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