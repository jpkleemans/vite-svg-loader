#!/bin/bash

$1 # Install vue command, project name should be `test-app`

# Copy example code and SVGs
cp ./tests/fixtures/App.vue ./test-app/src/App.vue
cp ./tests/fixtures/vite.config.ts ./test-app/vite.config.ts
cp ./tests/fixtures/vite-env.d.ts ./test-app/src/vite-env.d.ts
cp ./tests/fixtures/test.svg ./test-app/src/assets/test.svg
cp ./tests/fixtures/style.svg ./test-app/src/assets/style.svg
cp ./tests/fixtures/circle.svg ./test-app/src/assets/circle.svg
cp ./tests/fixtures/root.svg ./test-app/public/root.svg

# Commands when not using typescript
if [[ "$2" != "--typescript" ]]; then
    mv ./test-app/vite.config.ts ./test-app/vite.config.js # Rename `.ts` to `.js`
    sed -i 's/ lang="ts"//' ./test-app/src/App.vue # Remove `lang="ts"` from `<script>`
fi

# Install and build app
cd ./test-app
npm install
npm install vite-svg-loader --save-dev
npm run build
