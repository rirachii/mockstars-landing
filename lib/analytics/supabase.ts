import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema for analytics events
export interface AnalyticsEvent {
  id?: string
  event_name: string
  properties: Record<string, any>
  user_id: string
  session_id?: string
  timestamp: string
  created_at?: string
}

// Helper functions for common queries
export const getEventsByUser = async (userId: string, limit = 100) => {
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

export const getEventsByType = async (eventName: string, limit = 100) => {
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('event_name', eventName)
    .order('timestamp', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

export const getFunnelAnalysis = async (funnelName: string, dateRange?: { start: string; end: string }) => {
  let query = supabase
    .from('analytics_events')
    .select('*')
    .like('event_name', `funnel_${funnelName}_%`)
    .order('timestamp', { ascending: true })
  
  if (dateRange) {
    query = query
      .gte('timestamp', dateRange.start)
      .lte('timestamp', dateRange.end)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

export const getRevenueAnalysis = async (dateRange?: { start: string; end: string }) => {
  let query = supabase
    .from('analytics_events')
    .select('*')
    .eq('event_name', 'purchase')
    .order('timestamp', { ascending: false })
  
  if (dateRange) {
    query = query
      .gte('timestamp', dateRange.start)
      .lte('timestamp', dateRange.end)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

// SQL for creating the analytics_events table (run this in Supabase SQL editor)
export const createAnalyticsTableSQL = `
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  user_id TEXT NOT NULL,
  session_id TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);

-- Create a view for funnel analysis
CREATE OR REPLACE VIEW funnel_analysis AS
SELECT 
  user_id,
  event_name,
  properties->>'funnel_name' as funnel_name,
  properties->>'funnel_step' as funnel_step,
  timestamp,
  ROW_NUMBER() OVER (PARTITION BY user_id, properties->>'funnel_name' ORDER BY timestamp) as step_order
FROM analytics_events 
WHERE event_name LIKE 'funnel_%';

-- Create a view for revenue analysis
CREATE OR REPLACE VIEW revenue_analysis AS
SELECT 
  user_id,
  (properties->>'revenue')::NUMERIC as revenue,
  properties->>'currency' as currency,
  properties->>'plan' as plan,
  timestamp,
  DATE_TRUNC('day', timestamp) as date,
  DATE_TRUNC('month', timestamp) as month
FROM analytics_events 
WHERE event_name = 'purchase';
`