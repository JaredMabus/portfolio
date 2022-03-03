from flask import Flask, render_template


app = Flask(__name__, static_folder="../portfolio_react/build/static", template_folder="../portfolio_react/build")


# Routes non-api traffic to react app
@app.errorhandler(404)
def handle_404(e):
    return render_template("index.html")

# API routes
@app.route('/api', methods=["GET"])
def api_test():
    return {"message":"hello world"}



