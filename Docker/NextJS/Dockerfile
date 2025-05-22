# Use Ubuntu latest
FROM ubuntu:latest

# Avoid prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install essential packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    ca-certificates \
    lsb-release \
    git \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 23 and npm (using NodeSource repository)
RUN curl -fsSL https://deb.nodesource.com/setup_23.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Clone the repository and copy ReactJS folder to /app
RUN git clone https://github.com/tsahil01/buildx-templates && \
    cp -r buildx-templates/nextJS/* /app/ && \
    rm -rf buildx-templates

# Verify installations
RUN node --version && \
    npm --version && \
    git --version && \
    ls -la /app

# Default command
CMD ["/bin/bash"]