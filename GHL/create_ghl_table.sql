-- Create the table for GoHighLevel data caching
CREATE TABLE IF NOT EXISTS ghl_data (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
); 