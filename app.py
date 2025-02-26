from flask import Flask, render_template, jsonify
from utils.rail_api import get_departures
from utils.cache import Cache
import os

app = Flask(__name__)
cache = Cache()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/departures')
def departures():
    try:
        # Check cache first
        cached_data = cache.get('departures')
        if cached_data:
            return jsonify(cached_data)

        # Get fresh data
        departures = get_departures()
        cache.set('departures', departures, timeout=60)  # Cache for 1 minute
        return jsonify(departures)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
