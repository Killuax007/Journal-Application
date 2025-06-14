# 📝 Journal Application

A secure, full-stack journaling app built with **Spring Boot**, **React**, and **JWT Authentication**. Users can create, view, update, and delete their personal journal entries, all protected via token-based routing and seamless authentication.

---

## 🚀 Tech Stack

### 🔧 Backend
- **Java **
- **Spring Boot **
- **Spring Security**
- **JWT (JSON Web Token)**
- **Spring Data MongoDB**
- **Maven**

### 🖥️ Frontend
- **React 18**
- **Axios**
- **Tailwind CSS**
- **React Router**
- **Lucide Icons**

---

## 🔐 Authentication & Authorization

### 🛡️ Spring Security + JWT Flow

This project features a custom JWT-based authentication system:

1. **User Signup/Login:**
   - A user signs in through the `/auth/login` endpoint.
   - On success, a **JWT token** is generated and returned to the frontend.

2. **Token Storage:**
   - The JWT token is stored in the frontend via **`localStorage`**.

3. **Securing Routes:**
   - Protected routes like `/journals/**` and `/user/**` are secured using Spring Security's `SecurityFilterChain`.
   - The backend validates the token for every protected request using a **custom `JwtFilter`** which extends `OncePerRequestFilter`.

4. **AuthenticationManager Usage:**
   - The `AuthenticationManager` authenticates user credentials during login and sets up the security context.

5. **Extracting Logged-In User:**
   - In any controller, fetch the logged-in user using:
     ```java
     String userName = SecurityContextHolder.getContext().getAuthentication().getName();
     ```

6. **Cross-Origin Resource Sharing (CORS):**
   - Configured using `@CrossOrigin(origins = "http://localhost:5173")` on controllers.
   - You can also configure it globally using a `CorsConfigurationSource`.

---

## 🔒 Secured Routes

| Endpoint        | Method | Access Level | Description                       |
|----------------|--------|--------------|-----------------------------------|
| `/auth/login`  | POST   | Public       | Authenticate user and return JWT  |
| `/auth/register` | POST   | Public       | Create new user                   |
| `/user`        | GET    | Authenticated | Get user details                  |
| `/journals`    | GET    | Authenticated | Get all journals for the user     |
| `/journals`    | POST   | Authenticated | Create a new journal              |
| `/journals/{id}` | DELETE | Authenticated | Delete a journal by ID           |
| `/journals/{id}` | PUT    | Authenticated | Update a journal by ID           |

---

## 📦 Frontend Features

- 🔐 Auto-login using stored token
- ✅ Token sent with each Axios request using a configured `axiosInstance`
- 🎯 Protected routes in React (e.g., redirect to `/login` if not authenticated)
- ✏️ Journal CRUD operations with instant UI feedback (no refresh required)
- ⚡ Toast alerts for actions like create/delete/update
- 🌗 Dark-themed minimalist UI with Tailwind

---


---


## 🧪 Clone & Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Killuax007/Journal-Application.git
cd Journal-Application
```

### Backend
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```
---
## 💡 Highlights
- **✅ Fully stateless session using JWT**
- **🛡️ Token-based route protection**
- **🔁 No refresh needed after create/delete/update**
- **⚛️ Custom global context for user and journals**
- **⚙️ Clean and scalable code architecture**

---

## ✍️ Author
Manoj Kumar Panda
Full-Stack Developer | Spring Boot + React Enthusiast
🚀 Building developer-centric apps with love ❤️

---

## 🌟 Like this project?
### Star it on GitHub ⭐ and share it with your dev friends!




