# Hello World JS Application

This is a simple Node.js application that prints **Hello, World** and includes a CI/CD pipeline using **GitHub Actions** and **Docker**.

---

## 🚀 Running the Application Locally

### 1. Clone the repository

```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
node main.js
```

You should see the following output:

```
Hello, World
```

### 4. Run tests

```bash
npm test
```

---

## ⚙️ CI/CD Pipeline Workflow

This repository includes a **GitHub Actions** workflow defined in `.github/workflows/cicd.yml`.

The pipeline has **two jobs**:

### **1. Test Job**

* Checks out the repository.
* Sets up Node.js (version 20).
* Installs dependencies using `npm ci` (ensures clean installation).
* Runs automated tests using `npm test`.

### **2. Build & Push Job**

* Runs **only if the test job passes**.
* Logs in to Docker Hub using secrets.
* Builds the Docker image using the provided `Dockerfile`.
* Pushes the image to Docker Hub.

---

## 🛠 Setup Instructions

### **1. Environment Requirements**

* Node.js (v20 or above)
* npm
* Docker

### **2. Docker Setup**

If you want to run the application inside Docker:

```bash
docker build -t hello-world-js .
docker run --rm hello-world-js
```

### **3. GitHub Secrets Configuration**

In your GitHub repository settings, add the following secrets:

* `DOCKERHUB_USERNAME` – Your Docker Hub username.
* `DOCKERHUB_TOKEN` – Your Docker Hub access token.

---

## 📦 Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
CMD ["node", "main.js"]
```

---

