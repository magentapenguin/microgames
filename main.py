import bottle, json, os, hashlib, colorsys

os.chdir(os.path.dirname(os.path.abspath(__file__)))

app = bottle.Bottle()

@app.route('/')
def index():
    return bottle.template('index', games=games)

@app.route('/static/<filepath:path>')
def static(filepath):
    return bottle.static_file(filepath, root='static')

@app.route('/game/<game_id>')
def game(game_id):
    game = games.get(game_id)
    if not game:
        bottle.abort(404, 'Game not found')
    return bottle.static_file(game['file'], root='games')

@app.route('/favicon.ico')
def favicon():
    return bottle.static_file('favicon.ico', root='static')

with open('games.json') as f:
    games = json.load(f)

def string_to_color(s, saturation=1, lightness=0.5):
    hash = hashlib.sha256(s.encode(), usedforsecurity=False).hexdigest()
    hue = int(hash[:2], 16) / 255.0
    hue = hue * 0.6 + 0.2
    r, g, b = colorsys.hls_to_rgb(hue, lightness, saturation)
    return f'rgb({int(r*255)}, {int(g*255)}, {int(b*255)})'

for id, game_ in games.items():
    game_['color'] = string_to_color(id)

if __name__ == '__main__':
    bottle.mount('/microgames', app)
    bottle.route('/', callback=lambda: bottle.redirect('/microgames'))
    bottle.run(host='localhost', port=8080, debug=True, reloader=True)