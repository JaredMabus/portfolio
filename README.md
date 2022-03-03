# Jared Mabusth's Portfolio

# Summary

# Python Poetry Environment

If poetry isn't installed on machine  
`curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -`

Could also install with pip instead  
`pip install poetry==1.1.7 `

Install python dependencies  
`poetry install `

Activate poetry virual environment  
`poetry shell`

# Flask Dev Server

Starts server at port 8000 by default  
`python3 main.py`

Start using Gunicorn  
`gunicorn --bind localhost:8000 main:app`

# Docker

Create docker image:
(-t allows you to name the image)  
`docker build -t portfolio-image .`

Create and run container from new image:  
`docker run -p 8000:8000 --name portfolio-container portfolio-image`

Run flask dev server  
`docker run -it -p 8000:8000 -v $(pwd)/app:/usr/src/app/app:ro --name portfolio-container portfolio-image flask run -h 0.0.0.0 -p 8000`

`docker run -it -p 8000:8000 -v $(pwd):/usr/src/app --name portfolio-container portfolio flask run -h 0.0.0.0 -p 8000`

SSH into a docker container:  
`docker exec -it {container-name} /bin/sh`

# Google Cloud Run

Note: must have GCP IAM credentials to push to cloud

Create a tagged docker image  
`docker tag image-id gcr.io/steel-index-323816/portfolio<#>`

Push docker image to Google Cloud Registry  
`docker push gcr.io/steel-index-323816/portfolio<#>`

# Gmail for Account Creation

[SMPT Gmail Login Issues fix](https://serverfault.com/questions/635139/how-to-fix-send-mail-authorization-failed-534-5-7-14)
