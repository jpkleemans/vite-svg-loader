#!/bin/bash

$1 # Install vue command, project name should be `test-app`

# Copy example code and svg's
cp ./example/src/App.vue ./test-app/src/App.vue
cp ./example/vite.config.ts ./test-app/vite.config.js
cp ./example/src/assets/test.svg ./test-app/src/assets/test.svg
cp ./example/src/assets/style.svg ./test-app/src/assets/style.svg
cp ./example/src/assets/circle.svg ./test-app/src/assets/circle.svg
cp ./example/public/root.svg ./test-app/public/root.svg

# Remove `lang="ts"` from `<script>`` if project is not using typescript
if [[ "$2" != "--typescript" ]]; then
    sed -i 's/ lang="ts"//' ./test-app/src/App.vue
fi

# Install and build app
cd ./test-app
npm install
npm install vite-svg-loader --save-dev
npm run build
