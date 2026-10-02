from flask import Flask, render_template, request
import re
import sqlite3

app = Flask(__name__)

DATABASE = "database.db"
SUSPICIOUS_PATTERNS = (
    r"(?i)(?:'|\"|--|/\*|\*/|;|\bunion\b|\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b|\balter\b|\btruncate\b|\bexec\b|\bbenchmark\b|\bsleep\b|\bor\s+1\s*=\s*1\b|\bor\s+true\b)"
)


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def has_suspicious_input(value):
    if value is None:
        return False

    text = str(value).strip()
    return bool(re.search(SUSPICIOUS_PATTERNS, text))


@app.route("/", methods=["GET", "POST"])
def home():
    login_result = None
    security_state = "neutral"

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if has_suspicious_input(username) or has_suspicious_input(password):
            login_result = {
                "status": "Access Denied",
                "type": "Suspicious Input Detected",
                "message": "This request was blocked because the login input contains unusual or unsafe SQL-style patterns.",
                "technical": "Quotes, comments, operators, and injection keywords are filtered before the system evaluates the credentials."
            }
            security_state = "denied"
            return render_template("index.html", login_result=login_result, security_state=security_state)

        connection = get_connection()
        cursor = connection.cursor()
        query = "SELECT * FROM users WHERE username = ? AND password = ?"
        cursor.execute(query, (username, password))
        user = cursor.fetchone()
        connection.close()

        if user:
            login_result = {
                "status": "Login Successful",
                "type": "Secure Access",
                "message": f"Welcome back, {user['username']}! Access has been granted.",
                "technical": "The system treats the entered values as ordinary data and verifies them safely against the database."
            }
            security_state = "success"
        else:
            login_result = {
                "status": "Login Failed",
                "type": "Invalid Credentials",
                "message": "The entered username or password did not match an authorized record.",
                "technical": "No matching account was found, so the login request was rejected."
            }
            security_state = "error"

    return render_template("index.html", login_result=login_result, security_state=security_state)


@app.route("/vulnerable", methods=["GET", "POST"])
def vulnerable():

    if request.method == "POST":

        username = request.form.get("username", "")
        password = request.form.get("password", "")

        connection = get_connection()
        cursor = connection.cursor()

        query = (
            "SELECT * FROM users "
            f"WHERE username = '{username}' "
            f"AND password = '{password}'"
        )

        try:
            cursor.execute(query)
            user = cursor.fetchone()

            if user:
                result = {
                    "status": "Vulnerability Demonstrated",
                    "type": "Vulnerable Login",
                    "message": "The application's unsafe query construction allowed unexpected database behavior.",
                    "technical": "User input was directly incorporated into the SQL statement."
                }
            else:
                result = {
                    "status": "Login Failed",
                    "type": "Vulnerable Login",
                    "message": "The supplied credentials were not accepted.",
                    "technical": "The vulnerable query did not return a matching record."
                }

        except sqlite3.Error as error:
            result = {
                "status": "Database Error",
                "type": "Vulnerable Login",
                "message": "The database rejected the supplied input.",
                "technical": str(error)
            }

        connection.close()

        return render_template("result.html", result=result)

    return render_template("vulnerable.html")


@app.route("/secure", methods=["GET", "POST"])
def secure():

    if request.method == "POST":

        username = request.form.get("username", "")
        password = request.form.get("password", "")

        connection = get_connection()
        cursor = connection.cursor()

        query = """
            SELECT * FROM users
            WHERE username = ? AND password = ?
        """

        cursor.execute(query, (username, password))

        user = cursor.fetchone()

        if user:
            result = {
                "status": "Login Successful",
                "type": "Secure Login",
                "message": f"Welcome, {user['username']}!",
                "technical": "Parameterized queries kept the supplied input separate from the SQL command."
            }
        else:
            result = {
                "status": "Attack/Input Rejected",
                "type": "Secure Login",
                "message": "The supplied credentials were not accepted.",
                "technical": "The application treated the supplied values as data rather than SQL instructions."
            }

        connection.close()

        return render_template("result.html", result=result)

    return render_template("secure.html")


@app.route("/analysis")
def analysis():

    return render_template("result.html", result={
        "status": "Security Analysis",
        "type": "Vulnerable vs Secure",
        "message": "The vulnerable implementation directly incorporates user input into a database query. The secure implementation uses parameterized queries.",
        "technical": "Parameterized queries separate SQL commands from user-supplied values."
    })


if __name__ == "__main__":
    app.run(debug=True)