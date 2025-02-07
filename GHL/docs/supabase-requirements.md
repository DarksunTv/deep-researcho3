# Supabase Requirements and Automated Setup Guide

This document describes the requirements and steps to create and configure resources in Supabase with minimal user interaction, ensuring a smooth integration with our application.

## Overview

Our Supabase integration is used by the `supabaseIntegration.js` module to store and retrieve GoHighLevel data. To automate this process, please ensure that:

- You have a configured Supabase project.
- The following environment variables are set, either in your `.env` file or using Supabase secrets:
  - `SUPABASE_URL`: Your Supabase project URL.
  - `SUPABASE_KEY`: Your Supabase API key (anon or service_role).

## Required SQL Setup

The following SQL prompt creates the necessary table used by our integration to cache GoHighLevel data.

```sql
-- Create the table for GoHighLevel data caching
CREATE TABLE IF NOT EXISTS ghl_data (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Enable Row Level Security for the ghl_data table
ALTER TABLE ghl_data ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access by anyone (or adjust as needed)
CREATE POLICY "Public select" ON ghl_data
FOR SELECT
USING (true);

-- Create a policy to allow inserts only for a specific service role (adjust the condition as required)
CREATE POLICY "Service insert" ON ghl_data
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Allow only users with service_role to update records in ghl_data
CREATE POLICY "Service update" ON ghl_data
FOR UPDATE
USING (auth.role() = 'service_role');
```

You can execute the above SQL prompt using one of the following methods:

- **Supabase SQL Editor**: Log in to your Supabase dashboard, navigate to the SQL Editor, and run the prompt.
- **Supabase CLI**: Save the SQL in a file (e.g., `create_ghl_table.sql`) and run:

  ```bash
  supabase db query --file create_ghl_table.sql
  ```

## Automating Resource Creation

To minimize manual intervention during deployment, automate these steps:

1. **Set Environment Variables**: Ensure your `SUPABASE_URL` and `SUPABASE_KEY` are correctly configured in your environment.
2. **Run the SQL Script**: As part of your deployment pipeline, automatically execute the SQL prompt to create the necessary table.
3. **Verification**: Optionally, run a verification query to ensure the table `ghl_data` exists and is properly configured.

## Integration via `supabaseIntegration.js`

Our integration module uses the following functions:

- `fetchDataFromSupabase(table)`: Retrieves data from the specified table.
- `insertDataToSupabase(table, record)`: Inserts a new record into the specified table.

For a seamless integration, the table schema must match the expected structure (i.e., include columns for `name`, `data`, and `created_at`).

## Summary

- **Environment Variables**: Configure `SUPABASE_URL` and `SUPABASE_KEY`.
- **Required Table**: Create a `ghl_data` table as described in the SQL prompt above.
- **Automation**: Incorporate the SQL script into your deployment process using Supabase CLI or directly via the SQL Editor.

Following this guide ensures your Supabase environment is prepared for automated resource creation with minimal user interaction. 

npx supabase db query "SELECT COUNT(*) FROM ghl_data;" 

SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'; 