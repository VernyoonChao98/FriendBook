from app.models import db, Friend

# Adds a demo user, you can add other users here if you want
def seed_friends():
    friend1 = Friend(user_a= 1, user_b= 2)
    friend2 = Friend(user_a= 1, user_b= 3, status= True)
    friend3 = Friend(user_a= 2, user_b= 3, status= True)

    friendsList = [friend1, friend2, friend3]

    for friend_request in friendsList:
        db.session.add(friend_request)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_friends():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()
