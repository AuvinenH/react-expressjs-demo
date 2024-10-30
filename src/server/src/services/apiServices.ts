import axios, { AxiosError, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Osoita backendisi URL tähän
  timeout: 5000, // Aseta aikakatkaisu 5 sekuntia
});

export async function getTasks() {
  try {
    const response: AxiosResponse = await apiClient.get("/tasks");
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error fetching message: ${err.response?.data}`);
  }
}