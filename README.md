# Portfolio Landing Page

A landing page for posting my projects.

## Tech Stack 
* <strong>React:</strong> create-react-app, styled-components
* <strong>Python:</strong> Flask, poetry
* <strong>Docker</strong>
* <strong>Cloud:</strong> GC Run and GC Build


## Running Poetry Dev Virtual Env

`Installing Poetry`
```zsh
pip install poetry==1.1.7

# or with curl

curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

`Installing Python dependencies`
```zsh
poetry install
```

`Running Virtual Env`
```zsh
# start
poetry shell

# stop
exit
```

## Start Flask Dev Server
`Run "main.py" default port 8000`
```zsh
python3 main.py
```

## Node Create-React-App Dev
`Start React Dev Server`

```zsh
#start server port 3000
npm start

# compile to build folder
npm run build
```