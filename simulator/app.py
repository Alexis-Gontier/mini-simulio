from flask import Flask, request, jsonify
from flask_cors import CORS
from simulator.calcule import CalculerMensualité39_bis2_ANCIEN

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify(
        {"hello":"world"}
    )


@app.route("/api/calculate", methods=["POST"])
def calculate_payment():
    data = request.get_json()

    result = CalculerMensualité39_bis2_ANCIEN(
        data['N'], data['C2'], data['T'], data['ASSU'], data['apport'],
        data['mois'], data['annee'], data['fraisAgence'], data['fraisNotaire'],
        data['TRAVAUX'], data['revalorisationBien']
    )

    M, I, A, fraisNotaire_calc, garantieBancaire, salaireMinimum, df, fraisAgence2, C2_final, output2, output3, output4, output13, TRAVAUX_final = result

    return jsonify({
        "mensualite": round(M, 2),
        "prix_du_bien": data['C2'],
        "frais_de_notaire": round(fraisNotaire_calc, 2),
        "garantie_bancaire": round(garantieBancaire, 2),
        "travaux": TRAVAUX_final,
        "frais_agence": round(fraisAgence2, 2),
        "total_a_financer": round(C2_final, 2),
        "revenu_acquereur_minimum_mensuel": int(salaireMinimum)
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
