from flask import Flask, render_template, request, redirect, url_for, session
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/GamersHarem'
app.secret_key = 'porcodio'

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

        # Use insert_one instead of insert
        mongo.db.users.insert_one({'email': email, 'nickname': nickname, 'password': hashed_password})

        return redirect(url_for('index'))


@app.route('/logout', methods=['POST'])
def logout():
    # Elimina l'utente dalla sessione
    session.pop('username', None)
    return redirect(url_for('index'))


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


if __name__ == '__main__':
    app.run(debug=True)