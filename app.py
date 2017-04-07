# -*- coding: utf-8 -*-
import bottle

app = bottle.app()

@app.get('/')
def index():
	return bottle.template("index.html")

@app.get("/<filepath:re:.*\.css>")
def css(filepath):
    return bottle.static_file(filepath, root="")


@app.get("/<filepath:re:.*\.(eot|otf|svg|ttf|woff|woff2?)>")
def font(filepath):
    return bottle.static_file(filepath, root="")


@app.get("/<filepath:re:.*\.(jpg|png|gif|ico|svg|PNG)>")
def img(filepath):
    return bottle.static_file(filepath, root="")


@app.get("/js/<filepath:re:.*\.(js|jsx)>")
def js(filepath):
    return bottle.static_file(filepath, root="js")


@app.get("/<filepath:re:.*\.json>")
def js(filepath):
    return bottle.static_file(filepath, root="")

if __name__ == '__main__':
    app.run(host='localhost', port=8080)
