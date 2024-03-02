# if [[ "${CODESPACES}" == true ]]; then
#   sudo chmod 777 -R /app
# fi

function front() {
  cd /app/frontend
  npm install
}

function backend() {
  cd /app/backend
  dotnet restore
}

front() & backend() && fd
