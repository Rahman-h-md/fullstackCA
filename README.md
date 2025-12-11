# SwasthyaSetu - Rural Healthcare Platform

SwasthyaSetu is a full-stack offline-first healthcare platform designed for rural connectivity, featuring real-time blood bank updates and AI-powered health surveys.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, PWA (Service Workers), IndexedDB (Dexie).
- **Backend**: Node.js, Express, Socket.io, MongoDB (Mongoose).
- **ML Service**: Python (Flask) [Skeleton].

## Features
- **Offline & Sync**: ASHA workers can submit surveys without internet. Data syncs automatically when online.
- **Real-time Blood Bank**: Live updates of blood stock using WebSockets.
- **Microservice Architecture**: Python service ready for ML integration.
- **Role-based Auth**: JWT authentication for Doctors, ASHA workers, and Admins.

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or Atlas URI)
- Python (3.8+) [Optional for ML]

### Installation

1.  **Clone & Install Dependencies**:
    ```bash
    # Client
    cd client
    npm install

    # Server
    cd ../server
    npm install
    ```

2.  **Environment Setup**:
    - Check `server/.env` and update `MONGO_URI` if needed.
    - Default is `mongodb://localhost:27017/swasthya_setu`

3.  **Run Application**:
    You need to run Client and Server in separate terminals.

    **Terminal 1 (Backend):**
    ```bash
    cd server
    npm run dev
    ```

    **Terminal 2 (Frontend):**
    ```bash
    cd client
    npm run dev
    ```

4.  **Access App**:
    - Open `http://localhost:5173`
    - Register a new user (Role: ASHA or Admin) to access features.

## Module Details

### Offline Survey
- Navigate to Dashboard -> New Survey.
- Fill form. If offline, data saves to IndexedDB.
- When online, it auto-syncs.

### Blood Bank
- Navigate to Dashboard -> Check Availability.
- Real-time updates appear instantly across devices.

## Project Structure
- `/client`: React Frontend
- `/server`: Node.js API with Socket.io
- `/ml-service`: Python Flask API
