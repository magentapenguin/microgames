import main, shutil, os

build_dir = 'dist'

if os.path.exists(build_dir):
    shutil.rmtree(build_dir)
os.makedirs(build_dir)

shutil.copytree('static', os.path.join(build_dir, 'static'))
os.makedirs(os.path.join(build_dir, 'game'), exist_ok=True)
for game_id, game in main.games.items():
    with open(os.path.join(build_dir, f'game/{game_id}.html'), 'w') as f, open(os.path.join('games', game['file']), 'r') as g:
        f.write(g.read())

with open(os.path.join(build_dir, 'index.html'), 'w') as f:
    # Write the index.html file with the list of games
    f.write(main.index())

with open(os.path.join(build_dir, 'sw.js'), 'w') as f:
    sw_code = main.sw_js()
    f.write(sw_code)

shutil.copyfile(os.path.join('static', 'favicon.ico'), os.path.join(build_dir, 'favicon.ico'))

print(f'Done!')