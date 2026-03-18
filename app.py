from flask import Flask, request, jsonify
from flask_cors import CORS
from data import herbal_data  # import herbal info

app = Flask(__name__)
CORS(app)

@app.route("/api/check", methods=["POST"])
def check_herbal():
    data = request.get_json()
    product = data.get("product", "").lower()  # convert to lowercase
    info = herbal_data.get(product)

    if info:
        return jsonify({
            "product": product.title(),
            "active_ingredients": info["active_ingredients"],
            "warnings": info["warnings"]
        })
    else:
        return jsonify({"error": "Product not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
