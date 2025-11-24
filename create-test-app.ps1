if ($args[0] -ne $null) {
    Invoke-Expression $args[0] # Install vue command, project name should be `test-app`
}

# Create necessary directories if they don't exist
New-Item -ItemType Directory -Force -Path ./test-app/src/assets | Out-Null
New-Item -ItemType Directory -Force -Path ./test-app/public | Out-Null

# Copy example code and SVGs
Copy-Item -Path ./example/src/App.vue -Destination ./test-app/src/App.vue -Force
Copy-Item -Path ./example/vite.config.ts -Destination ./test-app/vite.config.ts -Force
Copy-Item -Path ./example/src/vite-env.d.ts -Destination ./test-app/src/vite-env.d.ts -Force
Copy-Item -Path ./example/src/assets/test.svg -Destination ./test-app/src/assets/test.svg -Force
Copy-Item -Path ./example/src/assets/style.svg -Destination ./test-app/src/assets/style.svg -Force
Copy-Item -Path ./example/src/assets/circle.svg -Destination ./test-app/src/assets/circle.svg -Force
Copy-Item -Path ./example/public/root.svg -Destination ./test-app/public/root.svg -Force

# Commands when not using typescript
if ($args[1] -ne "--typescript") {
    Move-Item -Path ./test-app/vite.config.ts -Destination ./test-app/vite.config.js -Force # Rename `.ts` to `.js`
    (Get-Content ./test-app/src/App.vue) -replace ' lang="ts"', '' | Set-Content ./test-app/src/App.vue # Remove `lang="ts"` from `<script>`
}

# Install and build app
Set-Location ./test-app
npm install
npm install vite-svg-loader --save-dev
npm run build
