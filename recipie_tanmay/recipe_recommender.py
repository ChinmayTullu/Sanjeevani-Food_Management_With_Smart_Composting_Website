from flask import Flask, request, render_template
import pandas as pd
from fuzzywuzzy import fuzz  

app = Flask(__name__)

# Load dataset
df = pd.read_csv('Cleaned_Indian_Food_Dataset.csv')  
df['TranslatedIngredients'] = df['TranslatedIngredients'].apply(lambda x: x.split(','))  

@app.route('/')
def home():
    return render_template('index.html')  

@app.route('/recommend', methods=['POST'])
def recommend():
    input_ingredients = request.form.get('ingredients') 
    input_list = [i.strip().lower() for i in input_ingredients.split(',')]  
    
    recommendations = []
    
    for _, row in df.iterrows():
        recipe_ingredients = [i.strip().lower() for i in row['TranslatedIngredients']]
        
        # Find matched ingredients
        matched_ingredients = [
            input_ing for input_ing in input_list 
            if any(fuzz.partial_ratio(input_ing, recipe_ing) > 70 for recipe_ing in recipe_ingredients)
        ]
        
        if matched_ingredients:
            recommendations.append({
                'Recipe': row['TranslatedRecipeName'],
                'Ingredients': ', '.join(row['TranslatedIngredients']),
                'MatchedIngredients': ', '.join(matched_ingredients),
                'Process': row['TranslatedInstructions'],
                'Image': row['image-url'],
                'MatchedCount': len(matched_ingredients),
                'TotalIngredients': len(recipe_ingredients)
            })
    
    # Sort recommendations by:
    # 1. Most matched ingredients (descending).
    # 2. Fewest total ingredients (ascending).
    recommendations = sorted(
        recommendations, 
        key=lambda x: (-x['MatchedCount'], x['TotalIngredients'])
    )
    
    # Get the top 3 recommendations
    top_recommendations = recommendations[:3] if recommendations else []
    
    return render_template('results.html', recommendations=top_recommendations)

if __name__ == '__main__':
    app.run(debug=True)
