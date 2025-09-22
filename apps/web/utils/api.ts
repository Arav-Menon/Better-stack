import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001";

const axiosInstence = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface authUser {
  fullName?: String;
  email: String;
  password: String;
  confirmPassword?: String;
  companyName?: String;
  phoneNumber?: String;
}

export async function signup({
  fullName,
  email,
  password,
  confirmPassword,
  companyName,
  phoneNumber,
}: authUser) {
  const response = await axiosInstence.post("/user/auth", {
    fullName,
    email,
    password,
    confirmPassword,
    companyName,
    phoneNumber,
  });

  return response.data.token;
}

export async function signin({ email, password }: authUser) {
  const response = await axiosInstence.post("/user/auth", {
    email,
    password,
  });

  console.log(response);

  return response.data.token;
}
