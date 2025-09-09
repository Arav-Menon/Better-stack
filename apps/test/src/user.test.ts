import axios from "axios";
import { describe, it, expect } from "bun:test";
import { LOCAL_URL } from "../config/config";

const UNIQUE_EMAIL = `${Math.random()}@test.com`; // random email each run
const PASSWORD = "password123";

describe("Auth (Signup + Signin) endpoints", () => {
  it("Should not sign up if body is incomplete", async () => {
    try {
      await axios.post(`${LOCAL_URL}/user/auth`, {
        email: UNIQUE_EMAIL,
        password: PASSWORD,
        // missing fullName, companyName etc
      });
      expect(false, "It should throw an error").toBe(true);
    } catch (e: any) {
      expect(e.response.status).toBe(400); // validation should fail
    }
  });

  it("Should successfully sign up if body is correct", async () => {
    const res = await axios.post(`${LOCAL_URL}/user/auth`, {
      fullName: "Test User",
      email: UNIQUE_EMAIL,
      password: PASSWORD,
      confirmPassword: PASSWORD,
      companyName: `Company_${Math.random()}`,
      phoneNumber: "9999999999",
    });

    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined(); // jwt should come back
    expect(res.data.user).toBeDefined();
  });

  it("Should successfully sign in with same credentials", async () => {
    const res = await axios.post(`${LOCAL_URL}/user/auth`, {
      email: UNIQUE_EMAIL,
      password: PASSWORD,
    });

    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
  });

  it("Should fail signin with wrong password", async () => {
    try {
      await axios.post(`${LOCAL_URL}/user/auth`, {
        email: UNIQUE_EMAIL,
        password: "wrongpassword",
      });
      expect(false, "Should not reach here").toBe(true);
    } catch (e: any) {
      expect(e.status).toBe(401); // unauthorized
    }
  });
});
