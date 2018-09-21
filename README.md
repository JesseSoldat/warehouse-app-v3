Heroku

SERVER package.json
"start": "node server",
"heroku-postbuild": "cd client && npm install && npm run build",

CLIENT package.json
"proxy": {
"/api/\*": {
"target": "http://localhost:5000"
}

1 heroku create
2 git push heroku master
