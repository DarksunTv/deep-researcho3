/**
 * Module to interact with Supabase API using supabase-js.
 * Ensure you have installed @supabase/supabase-js package.
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchDataFromSupabase(table) {
  const { data, error } = await supabase
    .from(table)
    .select('*');
  if (error) throw new Error(`Supabase fetch error: ${error.message}`);
  return data;
}

async function insertDataToSupabase(table, record) {
  const { data, error } = await supabase
    .from(table)
    .insert(record);
  if (error) throw new Error(`Supabase insert error: ${error.message}`);
  return data;
}

module.exports = {
  fetchDataFromSupabase,
  insertDataToSupabase
}; 