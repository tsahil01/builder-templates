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
    software-properties-common \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python 3 and pip (using default Ubuntu version)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create symlinks for python and pip
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Install system dependencies for Manim
RUN apt-get update && apt-get install -y \
    ffmpeg \
    texlive \
    texlive-latex-extra \
    texlive-fonts-extra \
    texlive-latex-recommended \
    texlive-science \
    texlive-fonts-recommended \
    pkg-config \
    libcairo2-dev \
    libgirepository1.0-dev \
    libpango1.0-dev \
    libglib2.0-dev \
    libgtk-3-dev \
    libgstreamer1.0-dev \
    libgstreamer-plugins-base1.0-dev \
    gstreamer1.0-plugins-good \
    gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-ugly \
    libpangocairo-1.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Manim and comprehensive math/science packages directly
# (skip upgrading system packages to avoid conflicts)

# Install Manim and comprehensive math/science packages
RUN pip install --break-system-packages \
    manim \
    manim[jupyterlab] \
    numpy \
    scipy \
    matplotlib \
    pillow \
    opencv-python \
    sympy \
    pandas \
    seaborn \
    plotly \
    networkx \
    scikit-learn \
    statsmodels \
    mpmath \
    pycairo \
    manimpango \
    moderngl \
    moderngl-window \
    pygments \
    rich \
    colour \
    decorator \
    tqdm \
    requests \
    click \
    watchdog \
    jupyter \
    ipython \
    notebook \
    jupyterlab \
    ipywidgets \
    && pip cache purge

# Clone the repository and copy python-manim folder to /app
RUN git clone https://github.com/tsahil01/buildx-templates && \
    cp -r buildx-templates/python-manim/* /app/ && \
    rm -rf buildx-templates

# Create media directory for Manim output
RUN mkdir -p /app/media

# Verify installations
RUN python --version && \
    pip --version && \
    manim --version && \
    ffmpeg -version | head -1 && \
    git --version && \
    ls -la /app

# Set environment variables for Manim
ENV MANIM_LOG_LEVEL=INFO
ENV MANIM_VERBOSITY=INFO

# Expose port 8000
EXPOSE 8000

# Default command - run Python web server on port 8000 from root
CMD ["python", "-m", "http.server", "8000", "--directory", "/"]