# create target folders
mkdir -Force public\assets
mkdir -Force public\src\assets

# copy your source image into public locations the app might request
# adjust the source path if your original is elsewhere (example: src\assets\riseher.png)
Copy-Item -Force src\assets\riseher.png public\assets\riseher.png
Copy-Item -Force src\assets\riseher.png public\src\assets\riseher.png

# restart dev server (if using npm)
# stop existing server, then:
# npm run dev

Write-Host "Done. Restart dev server and hard-refresh (Ctrl+Shift+R). If deploying, git add/commit/push the public files."
