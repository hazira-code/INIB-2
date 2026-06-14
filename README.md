# 🚀 INIB2 - CIFAR-10 Image Classification Dashboard

<div align="center">

### AI-Powered Image Classification Platform

A lightweight, production-ready CIFAR-10 image classification web application optimized for Render Free Tier deployment without Docker.

🌐 Live Demo: https://inib-2.onrender.com/

</div>

---

## 📌 Overview

INIB2 is an interactive machine learning dashboard that demonstrates image classification concepts using the CIFAR-10 dataset. The platform provides an educational and practical environment where users can explore CNN architectures, visualize training behavior, upload images, and understand how deep learning models classify objects.

The application has been specifically optimized for native Python deployment on Render's Free Tier, ensuring low memory consumption and fast startup times.

---

## ✨ Features

### 🎯 Prediction Playground

* Upload custom images
* Test CIFAR-10 sample images
* Real-time classification predictions
* Interactive prediction visualization

### 📊 Training Simulator

* Simulated model training process
* Epoch-wise accuracy tracking
* Loss convergence visualization
* Interactive charts and graphs

### 🧠 CNN Architecture Explorer

* Explore Convolution Layers
* Understand MaxPooling operations
* Visualize Dense Layers
* Learn parameter distributions

### 📝 Code Comparison Panel

* TensorFlow implementation walkthrough
* PyTorch implementation walkthrough
* Side-by-side framework comparison
* Educational explanations

### ☁️ Render Deployment Assistant

* Render deployment instructions
* Memory optimization explanations
* Free Tier deployment guidance
* Production-ready configurations

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Lucide React Icons
* Recharts

### Backend

* Python
* Flask
* Gunicorn

### Machine Learning

* CIFAR-10 Dataset
* CNN Concepts
* Image Processing
* NumPy

### Deployment

* Render (Native Python Runtime)
* Render Blueprint (render.yaml)

---

## 📂 Project Structure

```bash
INIB2/
│
├── app.py
├── requirements.txt
├── render.yaml
│
├── src/
│   └── image_classification.py
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── styles/
│
└── README.md
```

---

## 🚀 Live Application

### Production URL

https://inib-2.onrender.com/

---

## ⚙️ Local Installation

### Clone Repository

```bash
git clone https://github.com/hazira-code/INIB.git

cd INIB
```

### Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / Mac

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Application

```bash
python app.py
```

Open:

```bash
http://localhost:5000
```

---

## ☁️ Render Deployment

### Runtime

```text
Python
```

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
gunicorn app:app
```

### Important

This project is optimized specifically for Render Free Tier:

✅ No Docker Required

✅ Memory Usage < 250 MB

✅ Fast Startup Time

✅ Native Python Deployment

✅ Render Blueprint Support

---

## 📄 render.yaml

```yaml
services:
  - type: web
    name: inib2
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
```

---

## 🔥 Performance Optimizations

The application was designed to overcome Render's 512 MB memory limitation.

### Optimizations Implemented

* Lightweight Flask backend
* Minimal dependency footprint
* No TensorFlow GPU packages
* No Docker image overhead
* NumPy-based image preprocessing
* Gunicorn production server
* Memory-safe image handling

### Resource Usage

| Resource                    | Usage    |
| --------------------------- | -------- |
| RAM                         | < 250 MB |
| Storage                     | Minimal  |
| Startup Time                | Fast     |
| Render Free Tier Compatible | ✅        |

---

## 🎓 Educational Goals

This project helps students learn:

* Convolutional Neural Networks (CNNs)
* Image Classification
* CIFAR-10 Dataset
* TensorFlow Basics
* PyTorch Basics
* Flask API Development
* React Dashboard Design
* Cloud Deployment on Render

---

## 🛣️ Future Enhancements

* Real-time model inference
* Mobile responsive improvements
* Custom dataset support
* Transfer learning demonstrations
* Model performance benchmarking
* User authentication
* Training history storage

---

## 👨‍💻 Author

Developed as part of the INIB2 Machine Learning Dashboard Project.

Focused on delivering an educational, lightweight, and deployment-friendly AI experience.

---

## 📜 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute for educational and research purposes.

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

Built with ❤️ using Python, Flask, React, and Machine Learning.

</div>
