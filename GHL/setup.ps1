# setup.ps1
# This script automates the environment setup for the project.

if (-Not (Test-Path ".env")) {
    Write-Output "Creating .env from .env.example..."
    Copy-Item ".env.example" ".env"
} else {
    Write-Output ".env already exists. Skipping copy."
}

Write-Output "Installing dependencies using Yarn..."
yarn install

Write-Output "Setup complete. You can now run 'yarn dev' to start the local server." 