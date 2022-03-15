echo starting server
gunicorn -b 0.0.0.0:8080 main:app
# nginx -g 'daemon off;'