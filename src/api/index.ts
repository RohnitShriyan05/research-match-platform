import axios from "axios";

const API_URL = "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth Services
export const authService = {
  checkEmail: async (email: string) => {
    try {
      const response = await api.get("/Auth/CheckEmail", {
        params: { Email: email },
      });
      return response.data;
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    }
  },

  register: async (userData: any) => {
    try {
      const response = await api.post("/Auth/Register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  login: async (Email: string, Password: string) => {
    try {
      // Trim whitespace from inputs
      Email = Email.trim();
      Password = Password.trim();

      const response = await api.post("/Auth/SignIn", {
        Email: Email,
        Password: Password,
      });

      if (response.data.success) {
        return {user:response.data.user, found: true}; // Return user data
      } else {
        throw new Error(response.data.error || "Login failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Login failed";
      console.error("Login error:", errorMessage);
      throw new Error(errorMessage);
    }
  },
};

// Jobs Services
export const jobsService = {
  createJob: async (jobData: any) => {
    try {
      const response = await api.post("/Jobs/Create", jobData);
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },

  getAllJobs: async () => {
    try {
      const response = await api.get("/Jobs/GetAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  },

  getJob: async (id: string) => {
    try {
      const response = await api.get("/Jobs/GetOne", { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  },
};

// Professor Services
export const professorService = {
  getAllProfessors: async () => {
    try {
      const response = await api.get("/Professor/GetAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching professors:", error);
      throw error;
    }
  },

  getProfessor: async (id: string) => {
    try {
      const response = await api.get("/Professor/GetOne", { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error fetching professor:", error);
      throw error;
    }
  },
};

// Student Services
export const studentService = {
  getAllStudents: async () => {
    try {
      const response = await api.get("/Student/GetAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  getStudent: async (id: string) => {
    try {
      const response = await api.get("/Student/GetOne", { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error fetching student:", error);
      throw error;
    }
  },
};

export default api;
