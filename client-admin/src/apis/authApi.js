import { adminRootUrl } from "./config"
import axios from "axios";

export const loginApi = async (payload) => {
  try {
    const url = `${adminRootUrl}/auth/login`;
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {    
    console.log(error.response.data)
    if(error.response.data.msg)
      throw error.response.data.msg;
    throw (error.response.data);
  }
}