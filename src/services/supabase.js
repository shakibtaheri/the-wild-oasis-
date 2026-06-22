import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://rxtuyjikrvagqaguiggu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dHV5amlrcnZhZ3FhZ3VpZ2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDc3NDYsImV4cCI6MjA5NjIyMzc0Nn0.I5c2--yOzEn9vOO2pMb-kZLqwOgUGv-ob-d07_vUc5Q",
);
export default supabase;
