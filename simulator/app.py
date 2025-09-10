from flask import Flask, request, jsonify
from flask_cors import CORS
from finance import CalculerMensualité39_bis2_ANCIEN

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Hello",
    })

@app.route('/api/v1/', methods=['GET'])
def api_v1():
    return jsonify({
        "message": "Hello",
    })

@app.route("/api/v1/simulator/mensualite", methods=["POST"])
def calcul():
    data = request.json
    result = CalculerMensualité39_bis2_ANCIEN(
        data.get("N", 25),
        data.get("C2", 200000),
        data.get("T", 4),
        data.get("ASSU", 0.3),
        data.get("apport", 0),
        data.get("mois", "02"),
        data.get("annee", "2025"),
        data.get("fraisAgence", 3),
        data.get("fraisNotaire", 2.5),
        data.get("TRAVAUX", 0),
        data.get("revalorisationBien", 1)
    )

    return jsonify({
        "Mensualité": result[0],
        "Interets": result[1],
        "Assurance_totale": result[2],
        "Frais_notaire": result[3],
        "Garantie": result[4],
        "Salaire_minimum": result[5]
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
