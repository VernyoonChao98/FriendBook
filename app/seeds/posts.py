from app.models import db, Post
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo = User(
        firstname='demo', lastname="demo", username='FriendBook', email='friendbookclone@aa.com',
        hashed_password=generate_password_hash("password"), birthday=date(2022, 6, 7))
    post1 = Post(user_id=1, content="CAPSTONE!!!!!!!!!!!!!!!!!!!!!!!")


    postsList = [post1]

    for post in postsList:
        db.session.add(post)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
