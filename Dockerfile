FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Use pip with no-cache-dir and install lightweight/CPU-only torch/tensorflow-cpu
# to prevent memory limit crashes (512MB RAM cap on Render)
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch==2.0.1+cpu torchvision==0.15.2+cpu -f https://download.pytorch.org/whl/torch_stable.html && \
    pip install --no-cache-dir tensorflow-cpu>=2.12.0 && \
    pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Render dynamically injects standard PORT environment variable, defaults to 3000
EXPOSE 3000

ENV PORT=3000

# Start Flask Microservice
CMD ["python", "app.py"]
