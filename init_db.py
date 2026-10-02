import sqlite3

connection = sqlite3.connect("database.db")
cursor = connection.cursor()

cursor.execute("DROP TABLE IF EXISTS users")

cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)
""")

users = [
    ("admin", "Admin@123", "Administrator"),
    ("alice", "Alice@123", "Student"),
    ("bob", "Bob@123", "Student")
]

cursor.executemany(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    users
)

connection.commit()
connection.close()

print("Database created successfully.")