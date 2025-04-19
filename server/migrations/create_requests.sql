CREATE TABLE mentorship_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);