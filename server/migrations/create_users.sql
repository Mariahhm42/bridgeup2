CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT CHECK (role IN ('mentor', 'mentee')) NOT NULL,
    field TEXT NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);