-- Join form submissions (name + contact number)
CREATE TABLE IF NOT EXISTS join_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_number text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE join_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit join form"
  ON join_registrations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view join registrations"
  ON join_registrations FOR SELECT
  TO authenticated
  USING (true);
