# React Project with Yarn and Stability-AI Integration

This project is built with React using the Yarn package manager. It integrates Stability-AI API for AI-based functionalities. Follow the instructions below to set up and run the project.

---

## **Features**
- Built with [React](https://reactjs.org/)
- Managed with [Yarn](https://yarnpkg.com/)
- Integration with Stability-AI API
- Fast development with Vite

---

## **Setup and Installation**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Create a `.env.local` File
Add the following line to a `.env.local` file in the root directory:

```env
VITE_API_KEY=/* YOUR API KEY HERE */
```

Replace `/* YOUR API KEY HERE */` with your Stability-AI API key. You can obtain your API key by signing up or logging into [Stability AI's platform](https://platform.stability.ai/) and generating an API key from your account dashboard.

### 4. Start the Development Server
```bash
yarn dev
```


## **Scripts**

### Development
```bash
yarn dev
```
Start the development server.

### Build
```bash
yarn build
```
Create a production-ready build.

### Preview
```bash
yarn preview
```
Preview the production build locally.

---

## **Dependencies**
- React
- Vite
- Stability-AI integration dependencies

---

## **Environment Variables**
| Variable        | Description                          |
|------------------|--------------------------------------|
| `VITE_API_KEY`  | Stability-AI API key for integration |
