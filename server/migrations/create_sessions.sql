CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID REFERENCES users(id) ON DELETE
    SET NULL,
        mentee_id UUID REFERENCES users(id) ON DELETE
    SET NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
);