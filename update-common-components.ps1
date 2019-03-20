cd C:\projects\rmondardo.vuejs.common.components 

npm run build

Remove-Item C:\projects\front-end-pages-and-components-vuejs\src\plugins\components.bundle.js
Copy-Item -Path C:\projects\rmondardo.vuejs.common.components\dist\components.bundle.js -Destination C:\projects\front-end-pages-and-components-vuejs\src\plugins -Force

cd C:\projects\front-end-pages-and-components-vuejs
