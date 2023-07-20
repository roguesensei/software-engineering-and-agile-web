from flask import Flask

app = Flask(__name__)

# Test route
@app.route("/test")
def test():
    return ["One", "Two", "Three"]


if __name__ == '__main__':
    app.run(debug = True)
