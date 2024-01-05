from flask import Flask, render_template, request, redirect, url_for, session, flash, send_from_directory, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from flask_pymongo import PyMongo
import requests

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/GamersHarem'
app.secret_key = 'techweb'
mongo = PyMongo(app)


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['pass']
        user = mongo.db.users.find_one({'email': email})

        if user and check_password_hash(user['password'], password):
            session['username'] = user['nickname']
            return redirect(url_for('index'))
        else:
            return render_template('index.html', login_error=True)


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        nickname = request.form['nickname']
        password = request.form['pass']

        existing_user = mongo.db.users.find_one({'email': email})

        if existing_user:
            return render_template('index.html', registration_error=True)

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        mongo.db.users.insert_one({'email': email, 'nickname': nickname, 'password': hashed_password})

        return redirect(url_for('index'))


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/search')
def search():
    query = request.args.get('query', '')
    game_url = find_game_url_in_database(query)

    if game_url:
        return redirect(url_for(game_url))
    else:
        return 'Nessuna corrispondenza trovata'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pc')
def pc():
    return render_template('pc.html')


@app.route('/playstation')
def playstation():
    return render_template('playstation.html')


@app.route('/xbox')
def xbox():
    return render_template('xbox.html')


@app.route('/nintendo')
def nintendo():
    return render_template('nintendo.html')


@app.route('/bg3')
def bg3():
    return render_template('bg3.html')


@app.route('/spider')
def spider():
    return render_template('spider.html')


@app.route('/zel')
def zel():
    return render_template('zel.html')


@app.route('/fh5')
def fh5():
    return render_template('fh5.html')


@app.route('/mhr')
def mhr():
    return render_template('mhr.html')


@app.route('/bdo')
def bdo():
    return render_template('bdo.html')


@app.route('/star')
def star():
    return render_template('star.html')


@app.route('/diablo')
def diablo():
    return render_template('diablo.html')


@app.route('/battle')
def battle():
    return render_template('battle.html')


@app.route('/utente')
def utente():
    return render_template('utente.html')


@app.route('/manifest.json')
def manifest():
    return app.send_static_file('manifest.json')


@app.route('/service-worker.js')
def service_worker():
    return send_from_directory('static', 'service-worker.js')


@app.route('/paypal_payment', methods=['GET'])
def paypal_payment():
    if 'username' not in session:
        flash('Effettua il login prima di continuare, grazie')
        return redirect(url_for('index'))

    client_id = 'AXpBIeslyUQ9y_N3UP0CxwOBxfmjvF71tkWYCliPh-k42Tt1BW58DwSTu7Tg5Xne490QLCHJ0IJCgAsn'
    client_secret = 'EGvmBG0FgQ-4o6E9BdtNSLMGengZdHaKYsET-mdFQ7ssZV66QEE67VOSzfcshvl_4vyjuKrM85w4HxT2'

    access_token = get_access_token(client_id, client_secret)

    game_price = request.args.get('price', '1.00')

    paypal_approval_url = create_paypal_order(access_token, game_price)

    return jsonify({'approval_url': paypal_approval_url})


def get_access_token(client_id, client_secret):
    token_url = 'https://api.sandbox.paypal.com/v1/oauth2/token'
    data = {'grant_type': 'client_credentials'}
    response = requests.post(token_url, auth=(client_id, client_secret), data=data)
    return response.json().get('access_token', '')


def create_paypal_order(access_token, price):
    order_url = 'https://api.sandbox.paypal.com/v2/checkout/orders'

    try:
        price = '{:.2f}'.format(float(price))
    except ValueError:
        price = '1.00'

    order_payload = {
        'intent': 'CAPTURE',
        'purchase_units': [{'amount': {'currency_code': 'EUR', 'value': price}}]
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.post(order_url, headers=headers, json=order_payload)

    if response.status_code == 201:
        approval_url = response.json().get('links', [{}])[1].get('href', '')
        return approval_url
    return ''


if __name__ == '__main__':
    app._static_folder = 'static'
    app.run(host='0.0.0.0', port=8000, debug=True)