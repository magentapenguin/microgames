import json
import os
def generate_service_worker(assets):
    with open('sw.js', 'r') as f:
        sw_code = f.read()
    sw_code = sw_code.replace('/* ASSETS_PLACEHOLDER */', json.dumps(assets))
    return sw_code

def recursive_listdir(path):
    files = []
    for entry in os.listdir(path):
        full_path = os.path.join(path, entry)
        if os.path.isdir(full_path):
            files.extend(recursive_listdir(full_path))
        else:
            files.append(full_path)
    return files