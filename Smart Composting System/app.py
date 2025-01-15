from flask import Flask, request, render_template, jsonify, url_for, redirect
import pandas as pd

app = Flask(__name__)

# Load the updated dataset
df = pd.read_csv('updated_compost_classification_dataset.csv')
valid_items = df['Item'].unique().tolist()

# Sample product data
products = [
    {
        "id": 1,
        "name": "Premium Garden Compost",
        "description": "Enriched with natural nutrients for healthy plant growth",
        "price": 299,
        "rating": 4.8,
        "reviews": 256,
        "badge": "Bestseller",
        "badge_color": "green",
        "image": "/api/placeholder/300/200"
    },
    # ... [other product entries remain the same]
]

@app.route('/')
def index():
    return render_template('index.html', valid_items=valid_items)

@app.route('/shop')
def shop():
    return render_template('shop.html', products=products)

@app.route('/calculator')
def calculator():
    """New route to handle redirection back to calculator"""
    return redirect(url_for('index'))

@app.route('/add_item', methods=['POST'])
def add_item():
    item = request.form['item']
    weight = float(request.form['weight'])
    if item in valid_items:
        item_class = df[df['Item'] == item]['Item Class'].iloc[0]
        return jsonify({
            'item': item,
            'weight': weight,
            'itemClass': item_class,
            'status': 'success'
        })
    else:
        return jsonify({'status': 'error', 'message': 'Item not valid'})

@app.route('/predict', methods=['POST'])
def predict():
    items = request.json.get('items')
    green_items = [item for item in items if df[df['Item'] == item['item']]['Item Class'].iloc[0] == 'Green']
    brown_items = [item for item in items if df[df['Item'] == item['item']]['Item Class'].iloc[0] == 'Brown']

    results = []
    for green in green_items:
        for brown in brown_items:
            green_weight = green['weight']
            brown_weight = brown['weight']
            
            # Calculate the maximum possible combination for 1:3 ratio
            if brown_weight >= green_weight * 3:
                max_brown_weight = green_weight * 3
                max_green_weight = green_weight
            else:
                max_brown_weight = brown_weight
                max_green_weight = brown_weight / 3

            total_weight = max_green_weight + max_brown_weight
            compost_weight = 0.4 * total_weight

            results.append({
                'green_item': green['item'],
                'brown_item': brown['item'],
                'green_weight': max_green_weight,
                'brown_weight': max_brown_weight,
                'compost_weight': compost_weight,
                'remaining_green': green['weight'] - max_green_weight,
                'remaining_brown': brown['weight'] - max_brown_weight
            })

    if results:
        return jsonify({'status': 'success', 'results': results})
    else:
        return jsonify({'status': 'error', 'message': 'No matching 1:3 ratio found. Add more green or brown material.'})

@app.route('/cart', methods=['POST'])
def cart():
    product_id = request.json.get('product_id')
    action = request.json.get('action')
    
    return jsonify({
        'status': 'success',
        'message': f'Product {product_id} {action}ed to cart'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5005)