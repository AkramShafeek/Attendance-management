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