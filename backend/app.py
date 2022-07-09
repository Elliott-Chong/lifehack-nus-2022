from flask import *

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def root():
    if request.method == "GET":
        return {'plastic': 2, 'clothings': 5, 'bottles': 9, 'human_hand': 0}
        return render_template() # elliot's frontend
    elif request.method == "POST":
        file = request.json.file
        # AI black magic stuff
        # return {plastic: 2, clothings: 5, bottles: 9, human_hand: 0}
        
if __name__ == "__main__":
    app.run(port=5500)

