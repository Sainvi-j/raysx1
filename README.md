
# RAYS X1: Renewable Energy Microgrid Monitoring - Frontend Demo

## Overview
This repository contains the **frontend source code** for a demo web dashboard of a renewable energy microgrid monitoring system. The demo showcases real-time visualization of energy generation, consumption, battery status, alerts, and device health using simulated data. It is designed as a user-friendly interface for community operators to monitor and manage microgrids in rural and remote areas.

## Features
- Responsive dashboard UI for desktop and mobile
- Live updating charts and gauges displaying energy metrics
- Interactive graphs for power generation, consumption, and battery state-of-charge
- Alerts and notifications panel simulating maintenance and fault warnings
- Device status overview with mock sensor node connectivity
- Clean, modern interface using React.js and Chart.js
- Fully frontend-only demo with simulated data for presentation and prototyping

## Technologies Used
- Frontend framework: **React.js**
- Charting libraries: **Chart.js**
- Styling: **CSS3**, **Flexbox/Grid**
- Real-time simulation via JavaScript timers and state management

## Installation & Running Locally
1. Clone the repository:
   ```
   git clone https://github.com/Sainvi-j/raysx1.git
   ```
2. Navigate to the project directory:
   ```
   cd raysx1
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:XXXX` to view the dashboard.

## Usage
- The app automatically simulates real-time data updates.
- Navigate through dashboard tabs to see different energy metrics.
- Alerts animate on threshold conditions for demo purposes.
- Device list and status reflect simulated sensor connections.

## Project Structure
- `/src/components` - UI components (charts, alerts, widgets)
- `/src/data` - Simulated data generators
- `/src/App.js` - Main application entry with routing and state
- `/public` - Static assets (icons, logos)

## Notes
- This is a **demo frontend only**; backend integration and real sensor data will be implemented later.
- Data is randomly generated for visualization and presentation purposes.

---

*This demo is part of the Smart India Hackathon 2025 - Renewable Energy Monitoring System for Microgrids project.*

```
