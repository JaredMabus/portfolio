# Offical docks for using python images https://hub.docker.com/_/python
FROM python:3.8

# args would set these env variables
ENV POETRY_VERSION=1.1.7 \
    FLASK_APP=main:app \
    FLASK_ENV=development 


WORKDIR /usr/src/app

# Install poetry
RUN pip install "poetry==${POETRY_VERSION}"

# Don't need to create a virtual env when used with docker
RUN poetry config virtualenvs.create false

# Copy the project requirements into the app directory
COPY poetry.lock pyproject.toml ./

# Install dependencies
RUN poetry install --no-dev

RUN apt update && apt install -y nginx

# Copy rest of repo
COPY . .
COPY ./proxy/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

# CMD ["/bin/sh", "./start.sh"]
CMD ["gunicorn", "-b", "0.0.0.0:8080", "main:app"]



