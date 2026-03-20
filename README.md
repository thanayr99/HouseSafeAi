# 🛡️ HourSafe AI – AI-Powered Income Protection for Gig Workers

## 📌 Problem Statement

Gig workers such as Zomato and Swiggy delivery partners face unpredictable income loss due to external disruptions like heavy rain, extreme heat, pollution, and local restrictions.

Unlike salaried employees, their income depends directly on working hours and demand availability. A single disruption can reduce their working hours drastically, leading to immediate income loss.

Currently, there is no system that protects real-time income loss caused by such external factors.

---

## 💡 Solution

HourSafe AI is an AI-powered parametric insurance platform that protects gig workers by insuring their **lost working hours** instead of fixed income.

> “We don’t insure income — we insure lost working hours.”

The system:
- Learns user working patterns
- Detects disruptions
- Calculates lost hours
- Triggers automatic payouts

---

## ⚙️ Core Working Logic


---

## 🎯 Key Innovation

- Behavior-based insurance instead of static insurance
- Personalized payouts for part-time & full-time workers
- Zero-touch claim system
- Real-time parametric triggers

---

## 🧱 System Architecture

Frontend (Next.js)  
→ Behavior Tracking  
→ AI Risk Engine  
→ Fraud Detection Layer  
→ Payout Engine  

---

## 🤖 AI Components

- XGBoost → Risk prediction  
- LSTM → Work pattern prediction  
- Isolation Forest → Fraud detection  
- K-Means → User segmentation  

---

# 🛡️ Adversarial Defense & Anti-Spoofing Strategy

## 🚨 Problem Context

In a Market Crash scenario, fraudsters use GPS spoofing to simulate presence in disruption zones and trigger mass payouts.

Our system is designed to **not rely on GPS alone**, making such attacks ineffective.

---

## 🔍 1. Differentiation: Real vs Fake Worker

We differentiate genuine users using:

### ✅ Behavioral Consistency
- Historical working hours
- Daily activity patterns
- Earnings consistency

👉 Fake users cannot replicate long-term behavior patterns instantly.

---

### ✅ Activity-Based Validation
- Orders completed
- Active app time
- Movement patterns

👉 A user claiming inactivity but showing no prior active pattern is flagged.

---

### ✅ Demand Correlation
- If demand exists but user claims inactivity → suspicious

---

## 📊 2. Data Points Used (Beyond GPS)

We use multiple signals:

### 🔹 Behavioral Data
- Working hours history  
- Earnings/hour  
- Login patterns  

### 🔹 Activity Data
- Orders accepted/rejected  
- App usage time  
- Idle vs active time  

### 🔹 Environmental Data
- Weather APIs  
- AQI levels  
- Real disruption signals  

### 🔹 Network & Movement Data
- Speed consistency  
- Location drift patterns  
- IP/network variation  

### 🔹 Zone Intelligence
- Number of claims in same area  
- Claim clustering patterns  

---

## 🤖 3. Fraud Detection Strategy

### 🔸 Anomaly Detection
- Isolation Forest identifies abnormal users

### 🔸 Cluster Detection
- K-Means detects coordinated fraud rings

👉 If 100+ users behave identically → flagged as fraud cluster

---

## 📍 4. Multi-Layer Validation

We validate claims using:

- Behavior + Activity + Environment + Zone data

👉 NOT just GPS

---

## ⚖️ 5. UX Balance (VERY IMPORTANT)

We ensure honest users are not punished:

### ✅ Low Risk Users
- Instant payout

### ⚠️ Medium Risk
- Slight delay
- Additional validation

### 🚨 High Risk
- Flagged
- Partial or blocked payout

---

### 🌧️ Edge Case Handling

If:
- Network drops due to rain  
- Real disruption exists  

👉 System cross-checks with:
- Weather data  
- Nearby user activity  

👉 Honest users still get paid

---

## 🔐 6. Progressive Trust System

Each user gets a trust score:

- Consistent behavior → faster payouts  
- Suspicious activity → stricter checks  

---

## 🚨 7. Market Crash Protection

In extreme fraud scenarios:

- Zone-based payout throttling  
- Dynamic payout caps  
- Fraud cluster isolation  

👉 Prevents liquidity drain

---

## 🎯 Final Defense Principle

> “We don’t trust a single signal — we validate reality using multiple layers.”

---

## 🚀 Demo Flow

- User logs in  
- Dashboard shows working data  
- Simulate rain  
- Hours drop  
- Payout auto-calculated  

---

## 🧰 Tech Stack

Next.js, Tailwind CSS, Framer Motion, Recharts, FastAPI, Spring Boot, PostgreSQL, XGBoost, LSTM, Isolation Forest

---

## 🔗 Links

Live Demo: https://house-safe-ai.vercel.app/  
GitHub: https://github.com/thanayr99/HouseSafeAi.git 
Video: https://youtu.be/sJ_a7aIiDaQ 

---

## 🏁 Final Note

HourSafe AI transforms insurance into a **real-time, fraud-resistant protection system** for gig workers.

> “We don’t estimate losses — we measure them.”
