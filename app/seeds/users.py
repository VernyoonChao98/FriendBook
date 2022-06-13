from app.models import db, User
from datetime import date
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='demo', lastname="user", username='FriendBook', email='friendbookclone@aa.com',
        hashed_password=generate_password_hash("password"), birthday=date(2022, 6, 8))
    vern = User(
        firstname='Vernyoon', lastname="Chao", username='Coolycool', email='coolycool@cool.com',
        hashed_password=generate_password_hash("password"), birthday=date(1998, 10, 6))
    darren = User(
        firstname='Darren', lastname="Kong", username='ComeEatChinaCity', email='darren@aa.com',
        hashed_password=generate_password_hash("password"), birthday=date(2022, 6, 8))
    ara = User(
        firstname='Ara', lastname="Sargsyan", username='ThePaleRider', email='ara@aa.com',
        hashed_password=generate_password_hash("password"), birthday=date(2022, 6, 8))
    chris = User(
        firstname='Chris', lastname="Threadgill", username='ChrisCharming', email='chris@aa.com',
        hashed_password=generate_password_hash("password"), birthday=date(2022, 6, 8))
    paul = User(
        firstname='Paul', lastname="Melhus", username='DukeSilver', email='paul@aa.com',
        hashed_password=generate_password_hash("password"), birthday=date(2022, 6, 8))

    usersList = [demo, vern, darren, ara, chris, paul]

    for user in usersList:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
