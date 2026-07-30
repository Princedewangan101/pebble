"""initial

Revision ID: c25d6f273e3d
Revises:
Create Date: 2026-07-30 22:26:58.470224

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

revision: str = 'c25d6f273e3d'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'website_projects',
        sa.Column('id', UUID(as_uuid=False), primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('initial_prompt', sa.Text, nullable=False),
        sa.Column('current_code', sa.Text, nullable=True),
        sa.Column('current_version_index', sa.String(50), nullable=False, server_default=''),
        sa.Column('isPublished', sa.Boolean, nullable=False, server_default=sa.text('false')),
        sa.Column('createdAt', sa.DateTime, nullable=False, server_default=sa.func.now()),
        sa.Column('updatedAt', sa.DateTime, nullable=False, server_default=sa.func.now()),
    )

    op.create_table(
        'conversations',
        sa.Column('id', UUID(as_uuid=False), primary_key=True),
        sa.Column('role', sa.String(20), nullable=False),
        sa.Column('content', sa.Text, nullable=False),
        sa.Column('timestamp', sa.DateTime, nullable=False, server_default=sa.func.now()),
        sa.Column('projectId', UUID(as_uuid=False), sa.ForeignKey('website_projects.id', ondelete='CASCADE'), nullable=False),
    )

    op.create_table(
        'versions',
        sa.Column('id', UUID(as_uuid=False), primary_key=True),
        sa.Column('code', sa.Text, nullable=False),
        sa.Column('description', sa.Text, nullable=True),
        sa.Column('timestamp', sa.DateTime, nullable=False, server_default=sa.func.now()),
        sa.Column('projectId', UUID(as_uuid=False), sa.ForeignKey('website_projects.id', ondelete='CASCADE'), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('versions')
    op.drop_table('conversations')
    op.drop_table('website_projects')
