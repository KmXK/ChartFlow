FROM mcr.microsoft.com/devcontainers/dotnet:1-8.0-bookworm

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment this line to install global node packages.
RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install --lts && nvm use --lts && npm install -g typescript" 2>&1
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1

WORKDIR /app/backend/CF.Web
COPY ./backend/CF.Web/*.csproj .
RUN dotnet restore

RUN npm install -g @angular/cli

WORKDIR /app/frontend
COPY ./frontend/package*.json .

RUN npm install
