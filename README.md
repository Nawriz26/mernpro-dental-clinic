🦷 MERNPro Dental Clinic Management Web Application

A full-stack MERN application for managing patients, appointments, and clinic staff workflows.


📘 Project Overview

The MERNPro Dental Clinic Management System is a full-stack MERN application designed to help dental clinics manage their operations efficiently.

**This system allows staff to manage:**

- Patient records

- Appointments

- User authentication & profiles

- Light/Dark theme settings

- Dashboard insights

This repository includes both backend API (Node.js + Express + MongoDB) and React frontend integrated together.


⭐ Features


**🔐 Authentication & Authorization**

- User Registration

- User Login

- JWT-based authentication

- Protected routes (Dashboard, Profile, Appointments)

- Role-aware UI (future-ready)

**👨‍⚕️ Patient Management**

- Add new patients

- Edit patient info

- Delete patient

- View all patients in table

- Search patient by name / email / phone

- Pagination

**📅 Appointment Management**

- Full CRUD for appointments

- NEW: Linked appointments → patients using patientId

- Patient dropdown selector

- Status tracking (Scheduled / Completed / Cancelled)

**👤 User Profile**

- Update username

- Update email

- Navbar dynamically updates “Welcome, {username}”

**🎨 UI/UX Enhancements**

- Light/Dark mode toggle

- Toast notifications (success/error)

- Loading animations (4 seconds spinner + green checkmark)

- Animated route transitions

- Mobile responsive navbar

- Clinic logo integrated into navbar + favicon


🛠 Tech Stack


**Frontend**

- React

- React Router

- Bootstrap 5

- Axios

- React Toastify

**Backend**

- Node.js

- Express.js

- MongoDB Atlas

-Mongoose

- JWT Authentication

- bcryptjs

**Tools**

- Postman

- VS Code

- GitHub

- Trello (Agile Project Board)

- Canva / Figma (Wireframes)

## Quick start
```bash
npm install
npm run dev
