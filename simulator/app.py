from flask import Flask, request, jsonify
from flask_cors import CORS
from simulator.calcule import CalculerMensualité39_bis2_ANCIEN

app = Flask(__name__)
CORS(app,
    origins=[
        "http://localhost:5173",
    ],
    supports_credentials=True,
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"],
    allow_headers=["*"]
)


@app.route("/", methods=["GET"])
def home():
    return jsonify(
        {"hello":"world"}
    )


@app.route("/api/calculate", methods=["POST"])
def calculate_payment():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Convert string values to appropriate types
        mois = int(data['mois']) if isinstance(data['mois'], str) else data['mois']
        annee = int(data['annee']) if isinstance(data['annee'], str) else data['annee']

        result = CalculerMensualité39_bis2_ANCIEN(
            data['N'], data['C2'], data['T'], data['ASSU'], data['apport'],
            mois, annee, data['fraisAgence'], data['fraisNotaire'],
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

    except KeyError as e:
        return jsonify({"error": f"Missing required field: {str(e)}"}), 400
    except ValueError as e:
        return jsonify({"error": f"Invalid value: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
