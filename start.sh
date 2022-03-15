echo starting server
gunicorn -b 0.0.0.0:8080 main:app --daemon
# nginx -g 'daemon off;'