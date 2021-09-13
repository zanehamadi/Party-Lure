"""empty message

Revision ID: dd0693abfda9
Revises: 3cf52f78fc6d
Create Date: 2021-09-13 12:13:10.238265

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'dd0693abfda9'
down_revision = '3cf52f78fc6d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parties_requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('partyId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['partyId'], ['parties.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('posts', sa.Column('user_id', sa.Integer(), nullable=True))
    op.add_column('posts', sa.Column('recruit_level', sa.Integer(), nullable=False))
    op.add_column('posts', sa.Column('recruit_role', postgresql.ARRAY(sa.Integer(), dimensions=4), nullable=True))
    op.add_column('posts', sa.Column('activity_id', sa.Integer(), nullable=True))
    op.add_column('posts', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('posts', sa.Column('updated_at', sa.DateTime(), nullable=False))
    op.drop_constraint('posts_userId_fkey', 'posts', type_='foreignkey')
    op.drop_constraint('posts_activityId_fkey', 'posts', type_='foreignkey')
    op.create_foreign_key(None, 'posts', 'activities', ['activity_id'], ['id'])
    op.create_foreign_key(None, 'posts', 'users', ['user_id'], ['id'])
    op.drop_column('posts', 'activityId')
    op.drop_column('posts', 'userId')
    op.drop_column('posts', 'createdAt')
    op.drop_column('posts', 'updatedAt')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('updatedAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('posts', sa.Column('createdAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('posts', sa.Column('userId', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('posts', sa.Column('activityId', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.create_foreign_key('posts_activityId_fkey', 'posts', 'activities', ['activityId'], ['id'])
    op.create_foreign_key('posts_userId_fkey', 'posts', 'users', ['userId'], ['id'])
    op.drop_column('posts', 'updated_at')
    op.drop_column('posts', 'created_at')
    op.drop_column('posts', 'activity_id')
    op.drop_column('posts', 'recruit_role')
    op.drop_column('posts', 'recruit_level')
    op.drop_column('posts', 'user_id')
    op.drop_table('parties_requests')
    # ### end Alembic commands ###