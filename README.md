# Soundklips

# Summary

Soundklips is a web project that allows users to uplaod, share, and find other user's audio samples. Users can bundle their sounds into "collections" and share them with other users.

### Features

- Login and email verification
- Audio sample file management with GCS (upload, delete, and edit)
- User settings for dark and light mode
- Audio waveforms for peak amplitude levels

### Problems

1. Python audio library Librosa doesn't allow reading of mp3 binary from Werkzueg's FileStorage stream.

### Solutions:

1. Write mp3 audio files to folder, read from file, and then remove the file after meta data is uploaded.

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
`docker build -t soundklips-image .`

Create and run container from new image:  
`docker run -p 8000:8000 --name soundklips-container soundklips-image1`

Run flask dev server  
`docker run -it -p 8000:8000 -v $(pwd)/app:/usr/src/app/app:ro --name soudnklips-container soundklips-image flask run -h 0.0.0.0 -p 8000`

`docker run -it -p 8000:8000 -v $(pwd):/usr/src/app --name soudnklips-container soundklips flask run -h 0.0.0.0 -p 8000`

SSH into a docker container:  
`docker exec -it {container-name} /bin/sh`

# Google Cloud Run

Note: must have GCP IAM credentials to push to cloud

Create a tagged docker image  
`docker tag image-id gcr.io/steel-index-323816/soundklips<#>`

Push docker image to Google Cloud Registry  
`docker push gcr.io/steel-index-323816/soundklips<#>`

# Gmail for Account Creation

[SMPT Gmail Login Issues fix](https://serverfault.com/questions/635139/how-to-fix-send-mail-authorization-failed-534-5-7-14)
