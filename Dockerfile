# Use Ubuntu as the base image
FROM ubuntu:latest

# Install Ubuntu updates and essential packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy all files into the container
COPY . .

# Expose port (if needed for serving the app)
EXPOSE 8080

# Default command
CMD ["bash"]
