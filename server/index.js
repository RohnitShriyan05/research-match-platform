const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config");
const UserModel = require("./models/UserModel");
const { createHash } = require("crypto");
const JobsModel = require("./models/JobsModel");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Handle GET with query for email check
app.get("/Auth/CheckEmail", (req, res) => {
  const email = req.query.Email;
  if (!email) return res.status(400).json({ error: "Email required" });

  UserModel.findOne({ Email: email })
    .then((user) => res.json({ exists: !!user }))
    .catch((err) => res.status(500).json({ error: "Server error" }));
});

// Proper registration with response
app.post("/Auth/Register", async (req, res) => {
  try {
    let userData = req.body;
    // Ensure consistent password hashing
    userData.Password = createHash("sha256")
      .update(userData.Password)
      .digest("hex");
    const newUser = await UserModel.create(userData);
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        Email: newUser.Email,
        Role: newUser.Role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Registration failed",
      details: error.message,
    });
  }
});

// Handle POST for login with body data
app.post('/Auth/SignIn', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        
        if (!Email || !Password) {
            return res.status(400).json({ 
                success: false,
                error: "Email and password are required" 
            });
        }

        const user = await UserModel.findOne({ Email }).select('+Password'); // Ensure password is returned
        if (!user) {
            return res.status(401).json({ 
                success: false,
                error: "Invalid credentials" 
            });
        }

        const hashedAttempt = createHash("sha256").update(Password).digest("hex");
        if (user.Password !== hashedAttempt) {
            return res.status(401).json({ 
                success: false,
                error: "Invalid credentials",
                debug: { // Remove in production
                    received: Password,
                    hashedAttempt,
                    storedHash: user.Password
                }
            });
        }

        // Successful login
        const userData = user.toObject();
        delete userData.Password; // Never send password back
        
        res.json({
            success: true,
            user: {
                id: user._id,
                Email: user.Email,
                Role: user.Role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false,
            error: "Login failed",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
// Job creation with proper structure
app.post("/Jobs/Create", async (req, res) => {
  try {
    const jobData = req.body;
    const existing = await JobsModel.findOne({
      ProfessorId: jobData.ProfessorId,
    });
    if (existing) {
      existing.Jobs.push(jobData);
      await existing.save();
    } else {
      await JobsModel.create({
        ProfessorId: jobData.ProfessorId,
        Jobs: [jobData],
      });
    }
    res.status(201).json({ message: "Job created" });
  } catch (error) {
    res.status(500).json({ error: "Job creation failed" });
  }
});

// Standard GET endpoints with error handling
app.get("/Jobs/GetAll", (req, res) => {
  JobsModel.find()
    .then((jobs) => res.json(jobs))
    .catch(() => res.status(500).json({ error: "Failed to fetch jobs" }));
});

app.get("/Jobs/GetOne", (req, res) => {
  JobsModel.findById(req.query.id)
    .then((job) =>
      job ? res.json(job) : res.status(404).json({ error: "Job not found" })
    )
    .catch(() => res.status(500).json({ error: "Server error" }));
});

app.get("/Professor/GetAll", (req, res) => {
  UserModel.find({ Role: "Professor" })
    .then((profs) => res.json(profs))
    .catch(() => res.status(500).json({ error: "Failed to fetch professors" }));
});

app.get("/Student/GetAll", (req, res) => {
  UserModel.find({ Role: "Student" })
    .then((students) => res.json(students))
    .catch(() => res.status(500).json({ error: "Failed to fetch students" }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
