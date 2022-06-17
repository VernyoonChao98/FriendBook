"""empty message

Revision ID: 2fc452b2a927
Revises: f85ee22afc63
Create Date: 2022-06-17 09:13:12.342662

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2fc452b2a927'
down_revision = 'f85ee22afc63'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('post_image', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('online', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'online')
    op.drop_column('posts', 'post_image')
    # ### end Alembic commands ###
