from flask import Flask, render_template


app = Flask(__name__, static_folder="../portfolio_react/build/static", template_folder="../portfolio_react/build")

# Route all trafic to react app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

# API routes
@app.route('/api/test', methods=["GET"])
def api_test():
    return {"message":"hello world"}



