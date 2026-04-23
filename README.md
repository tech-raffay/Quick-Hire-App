# 🚀 QuickHire

QuickHire is a high-performance, cross-platform mobile application designed to bridge the gap between top talent and recruiters. Built with **React Native** and **Expo**, the app delivers a premium, native-feeling user experience with real-time data synchronization and automated deployment.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React Native](https://img.shields.io/badge/React_Native-0.74+-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_50+-000020?logo=expo)
![Firebase](https://img.shields.io/badge/Firebase-Auth_&_Firestore-FFCA28?logo=firebase)

---

## ✨ Key Features

### 👤 For Job Seekers
- **Smart Discovery**: Browse and filter curated job opportunities in real-time.
- **One-Click Apply**: Apply to roles instantly with your pre-uploaded resume.
- **Profile Management**: Build a professional profile with cloud-hosted avatars and PDF resumes.
- **Saved Jobs**: Keep track of opportunities you're interested in for later.

### 🏢 For Recruiters
- **Job Lifecycle Management**: Post, edit, and manage job listings with ease.
- **Applicant Tracking**: View detailed applicant profiles and review resumes directly within the app.
- **Real-Time Analytics**: Monitor application counts and job performance at a glance.

---

## 🎨 Design & UX
QuickHire prioritizes a modern, "Glassmorphic" aesthetic with:
- **Custom Spring Animations**: Smooth screen transitions and tab switching powered by React Native's Native Driver.
- **Safe Area Optimization**: Seamless UI across all devices, including notches and status bar protection.
- **Interactive States**: Loading skeletons, spinners, and disabled states for a robust feel during network requests.

---

## 🛠️ Technical Architecture

- **Frontend**: React Native with Expo SDK for cross-platform compatibility.
- **Backend**: 
  - **Firebase Auth**: Secure, managed user authentication.
  - **Cloud Firestore**: Real-time NoSQL database for jobs and applications.
- **Storage**: **Appwrite Storage** for high-availability file hosting (Resumes/Images).
- **Automation (DevOps)**: GitHub Actions workflow for automated **EAS Updates**, ensuring the live app is always in sync with the repository.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo Go app on your mobile device

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/tech-raffay/Quick-Hire-App.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

---

## 📦 Deployment
This project uses **EAS (Expo Application Services)** for cloud builds and updates.

- **Production Branch**: `main`
- **Automation**: GitHub Actions automatically deploys a new EAS Update whenever code is pushed to `main`.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ by Raffay Khan**  
[Expo Project Page](https://expo.dev/@tech-raffays-organization/projects/quick-hire) | [GitHub](https://github.com/tech-raffay)
