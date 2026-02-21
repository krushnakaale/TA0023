# 🏥 TA0023 — Hospital Bed & OPD Availability System

> A centralized digital platform to monitor hospital bed availability and OPD status in real time — helping patients find the right care, fast.

---

## 📌 Problem Statement

During medical emergencies, patients struggle to find hospitals with available beds and active OPD services. Lack of real-time information leads to delayed treatment and poor outcomes.

**TA0023** solves this by providing a single platform where:

- Patients can find hospitals with available beds and active OPD
- Doctors can manage and respond to appointment requests
- Admins can keep hospital data up to date

---

## ✨ Features

### 👤 Patient

- Browse hospitals filtered by **city** and **OPD status**
- View **real-time bed availability** (General + ICU)
- View **doctors** at a selected hospital
- **Book appointments** with preferred doctor

### 🩺 Doctor

- View all incoming appointment requests
- **Accept or Reject** appointments with one click
- Dashboard with stats — Pending, Accepted, Rejected

### 🛠️ Admin

- **Add, Edit, Delete** hospital records
- Manage hospital info — beds, ICU, OPD status, contact

---

## 🛠️ Tech Stack

| Layer       | Technology             |
| ----------- | ---------------------- |
| Frontend    | React.js, Tailwind CSS |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB (Mongoose)     |
| HTTP Client | Axios                  |
| Icons       | Lucide React           |

---

## 📁 Project Structure

```
📦 TA0023
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   └── 📂 auth/
│   │   │       ├── LoginForm.jsx
│   │   │       ├── RegisterForm.jsx
│   │   │       └── ForgotPasswordForm.jsx
│   │   ├── 📂 pages/
│   │   │   ├── 📂 Home/
│   │   │   │   └── 📂 sections/
│   │   │   │       ├── HeroSection.jsx       ← Hospital listing + filters
│   │   │   │       └── HospitalDoctors.jsx   ← Doctor cards per hospital
│   │   │   ├── 📂 Dashboard/
│   │   │   │   └── HeroSection.jsx           ← Patient/Doctor dashboard
│   │   │   ├── 📂 About/
│   │   │   │   └── HeroSection.jsx           ← About + flow overview
│   │   │   └── 📂 Login/
│   │   │       └── index.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── 📂 backend/
    ├── 📂 models/
    │   ├── Hospital.js
    │   ├── Doctor.js
    │   └── Appointment.js
    ├── 📂 routes/
    │   ├── hospitals.js
    │   ├── doctors.js
    │   └── appointments.js
    ├── 📂 controllers/
    ├── server.js
    └── package.json
```

---

## 🔌 API Endpoints

### 🏥 Hospitals

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/hospitals`     | Get all hospitals  |
| POST   | `/api/hospitals`     | Add a new hospital |
| PUT    | `/api/hospitals/:id` | Update hospital    |
| DELETE | `/api/hospitals/:id` | Delete hospital    |

### 🩺 Doctors

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| GET    | `/api/doctors/hospital/:id` | Get doctors for a hospital |

### 📅 Appointments

| Method | Endpoint                        | Description                   |
| ------ | ------------------------------- | ----------------------------- |
| POST   | `/api/appointments`             | Book an appointment           |
| GET    | `/api/appointments/doctor/:id`  | Get appointments for a doctor |
| PUT    | `/api/appointments/:id/respond` | Accept or Reject appointment  |

---

## 🔄 User Flow

```
User
 └── Selects Hospital
      └── GET /api/doctors/hospital/:id
           └── Fills Appointment Form
                └── POST /api/appointments
                     └── Doctor Reviews
                          └── GET /api/appointments/doctor/:id
                               └── PUT /api/appointments/:id/respond
                                    └── System sends Email to Patient ✉️
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/TA0023.git
cd TA0023
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

App will run at `http://localhost:5173`

---

## ⚙️ Environment Variables

| Variable     | Description                         |
| ------------ | ----------------------------------- |
| `PORT`       | Backend server port (default: 8080) |
| `MONGO_URI`  | MongoDB connection string           |
| `JWT_SECRET` | Secret key for JWT tokens           |
| `EMAIL_USER` | Email used to send notifications    |
| `EMAIL_PASS` | Email password / app password       |

---

## 📸 Screenshots

> _(Add screenshots here after deployment)_

| Page             | Description                   |
| ---------------- | ----------------------------- |
| Home             | Hospital listing with filters |
| Hospital Doctors | Doctors popup with booking    |
| Dashboard        | Patient & Doctor views        |
| Login / Register | Auth forms                    |

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is developed as part of an academic assignment.

---

## 👨‍💻 Authors

- **TA0023** — Full Stack Development

---

<div align="center">
  <p>Made with ❤️ for better healthcare access</p>
</div>
