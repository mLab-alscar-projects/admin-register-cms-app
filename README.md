# Admin Registration CMS App

This mobile application provides an admin registration and management system for content management. Built with React Native and Expo, it offers a streamlined interface for admin authentication and user management.

## Overview

The Admin Registration CMS App is a mobile solution that allows administrators to register, login, and manage admins through a simple interface. It connects to a backend API for data management and authentication.

## Live Demo

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/mLab-alscar-projects/admin-register-cms-app.git
   ```

2. Navigate to the client directory:
   ```
   cd admin-register-cms-app/client
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Start the development server:
   ```
   npx expo start -c
   or
   npm start -c
   ```

## Building the App

To build the app for testing or production using EAS Build:

1. Install EAS CLI globally (if not already installed):
   ```
   npm install -g eas-cli
   ```

2. Configure EAS Build:
   ```
   eas build:configure
   ```

3. Create a build for Android:
   ```
   eas build --platform android --profile preview
   ```

4. For iOS builds (requires Apple Developer account):
   ```
   eas build --platform ios --profile preview
   ```

## Demo Credentials

For testing purposes, you can use the following credentials:

- **Email**: aurora@alscar.com
- **Password**: Oscar@2024

## Features

- Admin registration and authentication
- Admin management
- Secure API integration
- Mobile-friendly interface


## Troubleshooting

- If you encounter issues with the EAS CLI, ensure you're using the correct syntax for commands:
  ```
  eas build --platform android --profile preview
  ```

- For punycode deprecation warnings, you can safely ignore them or use the suggested trace-deprecation flag to identify the source.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
