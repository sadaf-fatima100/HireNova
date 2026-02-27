// ===========================================
//  seedData.js — Updated to avoid password validation errors
//  Run: node seedData.js
// ===========================================

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ─── Models ───────────────────────────────
import { User } from "./models/userSchema.js";
import { Job } from "./models/jobSchema.js";
import { Application } from "./models/applicationSchema.js";

// ─── Load env ─────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "config", "config.env") });

// ─── Connect to MongoDB ───────────────────
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in config.env");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI, {
  dbName: "JOB_PORTAL_WITH_HireNova",
});
console.log("✅ MongoDB Connected");

// ─── Users ───────────────────────────────
const employers = [
  {
    name: "Ahmed Raza",
    email: "ahmed.employer@gmail.com",
    phone: "3001234567",
    address: "Gulshan-e-Iqbal, Karachi",
    password: "Test@1234", // plain password → will be hashed by pre-save hook
    role: "Employer",
  },
  {
    name: "Sara Khan",
    email: "sara.employer@gmail.com",
    phone: "3017654321",
    address: "DHA Phase 5, Lahore",
    password: "Test@1234",
    role: "Employer",
  },
];

const jobSeekers = [
  {
    name: "Bilal Hassan",
    email: "bilal.seeker@gmail.com",
    phone: "3111112222",
    address: "Johar Town, Lahore",
    password: "Test@1234",
    role: "Job Seeker",
    niches: {
      firstNiche: "Web Development",
      secondNiche: "Software Development",
      thirdNiche: "Mobile App Development",
    },
    coverLetter:
      "Passionate web developer with 2+ years of experience in React and Node.js.",
    resume: { public_id: "resume_bilal", url: "https://example.com/bilal.pdf" },
  },
  {
    name: "Ayesha Siddiqui",
    email: "ayesha.seeker@gmail.com",
    phone: "3219998888",
    address: "F-10, Islamabad",
    password: "Test@1234",
    role: "Job Seeker",
    niches: {
      firstNiche: "Data Science",
      secondNiche: "Machine Learning",
      thirdNiche: "Artificial Intelligence",
    },
    coverLetter: "Data science enthusiast with strong Python and ML skills.",
    resume: { public_id: "resume_ayesha", url: "https://example.com/ayesha.pdf" },
  },
];

// ─── Clear old data ───────────────────────
await Application.deleteMany({});
await Job.deleteMany({});
await User.deleteMany({ email: { $in: [...employers, ...jobSeekers].map(u => u.email) } });

// ─── Insert Users ─────────────────────────
const createdEmployers = await User.insertMany(employers);
const createdJobSeekers = await User.insertMany(jobSeekers);
console.log(`✅ Users created: ${createdEmployers.length + createdJobSeekers.length}`);

// ─── Create Jobs for Employers ────────────
let allJobs = [];
for (const employer of createdEmployers) {
  for (let i = 1; i <= 2; i++) {
    const job = await Job.create({
      title: `Job ${i} at ${employer.name}'s Company`,
      jobType: i % 2 === 0 ? "Part-time" : "Full-time",
      location: i % 2 === 0 ? "Lahore" : "Karachi",
      companyName: `${employer.name} Corp`,
      introduction: `Exciting opportunity for talented candidates at ${employer.name}'s company.`,
      responsibilities: "Perform assigned tasks efficiently.",
      qualifications: "Relevant experience and skills required.",
      salary: i % 2 === 0 ? "40000 PKR" : "60000 PKR",
      hiringMultipleCandidates: "Yes",
      jobNiche: i % 2 === 0 ? "Software Development" : "Web Development",
      postedBy: employer._id,
    });
    allJobs.push(job);
  }
}
console.log(`✅ Jobs created: ${allJobs.length}`);

// ─── Create Applications from Job Seekers ──
let totalApplications = 0;
for (const seeker of createdJobSeekers) {
  for (const job of allJobs) {
    await Application.create({
      jobSeekerInfo: {
        id: seeker._id,
        name: seeker.name,
        email: seeker.email,
        phone: seeker.phone,
        address: seeker.address,
        resume: seeker.resume,
        coverLetter: seeker.coverLetter,
        role: "Job Seeker",
      },
      employerInfo: {
        id: job.postedBy,
        role: "Employer",
      },
      jobInfo: {
        jobId: job._id,
        jobTitle: job.title,
      },
    });
    totalApplications++;
  }
}
console.log(`✅ Applications created: ${totalApplications}`);

// ─── Finish ───────────────────────────────
await mongoose.disconnect();
console.log("🔌 MongoDB Disconnected. Seed Complete!");

// ─── Summary ──────────────────────────────
console.log("───────────────────────────────");
console.log("Users:");
[...createdEmployers, ...createdJobSeekers].forEach((u) =>
  console.log(`${u.role.padEnd(12)} ${u.name.padEnd(20)} ${u.email}`)
);
console.log("───────────────────────────────");
console.log("Each employer posted 2 jobs and each job seeker applied to all jobs.");