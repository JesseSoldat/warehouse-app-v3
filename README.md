Deploy
https://daveceddia.com/deploy-react-express-app-heroku/

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

RENAME
https://devcenter.heroku.com/articles/renaming-apps#updating-git-remotes

newName - oldName
heroku apps:rename around-the-world-react --app ancient-falls-85649

Check that the app is running
heroku ps:scale web=1

Logs
heroku logs --tail

Git
git branch

Firebase
https://medium.com/@zwacky/using-firebase-you-might-be-able-to-save-220kb-744269f845cc

Surge
surge teardown https://movie-buddy.surge.sh
surge list

Elastic Email
https://github.com/julianduque/node-elasticemail#readme
