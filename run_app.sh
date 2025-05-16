#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Eco-Brain-Grow Application...${NC}"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed. Please install it to run the backend.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install it to run the frontend.${NC}"
    exit 1
fi

# Kill any existing backend processes related to this app
echo -e "${GREEN}Stopping any running instances of the backend server on port 3000...${NC}"
# Try to kill by process name first
pkill -f "python3 server.py" 2>/dev/null || true
# Then try to kill any process listening on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Navigate to the API directory for backend operations
cd api

# Create Python virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "${GREEN}Creating Python virtual environment in api/venv...${NC}"
    python3 -m venv venv
    source venv/bin/activate
    echo -e "${GREEN}Installing backend dependencies from requirements.txt...${NC}"
    pip install -r requirements.txt
    deactivate
else
    echo -e "${GREEN}Using existing Python virtual environment in api/venv...${NC}"
fi

# Start backend in the background and log its output
echo -e "${GREEN}Starting Python backend server on port 3000...${NC}"
echo -e "${YELLOW}Backend logs will be saved to api/backend.log${NC}"
source venv/bin/activate
nohup python3 server.py > backend.log 2>&1 &
BACKEND_PID=$!
deactivate # Deactivate after launching, the nohup process keeps its environment

# Navigate back to the project root
cd ..

echo -e "${GREEN}Waiting for backend to start (PID: $BACKEND_PID)...${NC}"
RETRY_COUNT=0
MAX_RETRIES=15 # Wait for max 30 seconds (15 * 2 seconds)
HEALTH_URL="http://localhost:3000/api/health"

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    sleep 2
    if curl -s --head --fail --max-time 2 $HEALTH_URL > /dev/null; then
        echo -e "${GREEN}Backend started successfully on port 3000.${NC}"
        break
    else
        echo -e "${YELLOW}Waiting for backend... (attempt $((RETRY_COUNT+1))/$MAX_RETRIES)${NC}"
        # Check if backend process is still running
        if ! ps -p $BACKEND_PID > /dev/null; then
            echo -e "${RED}Backend process (PID: $BACKEND_PID) is no longer running.${NC}"
            echo -e "${RED}Please check api/backend.log for error messages.${NC}"
            exit 1
        fi
        RETRY_COUNT=$((RETRY_COUNT+1))
    fi
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo -e "${RED}Backend failed to start on port 3000 after $MAX_RETRIES attempts.${NC}"
    echo -e "${RED}Please check api/backend.log for error messages.${NC}"
    echo -e "${YELLOW}Attempting to stop backend process (PID: $BACKEND_PID) if it's running...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Start frontend
echo -e "${GREEN}Starting Frontend development server (usually on http://localhost:8081)...${NC}"
# Trap Ctrl+C to ensure backend is killed when frontend is stopped
trap 'echo -e "\n${YELLOW}Frontend development server stopped.${NC}"; echo -e "${GREEN}Shutting down the backend server (PID: $BACKEND_PID)...${NC}"; kill $BACKEND_PID; exit 0' SIGINT
npm run dev

# This part is normally reached if npm run dev exits on its own, or after the trap.
# The trap should handle cleanup, but as a fallback:
echo -e "${GREEN}Shutting down the backend server (PID: $BACKEND_PID)...${NC}"
kill $BACKEND_PID 2>/dev/null || true

echo -e "${GREEN}Eco-Brain-Grow Application stopped.${NC}" 