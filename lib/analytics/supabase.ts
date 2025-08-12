// Stubs for analytics supabase module (disabled in this environment)

export interface AnalyticsEvent {
  id?: string
  event_name: string
  properties: Record<string, any>
  user_id: string
  session_id?: string
  timestamp: string
  created_at?: string
}

export const getEventsByUser = async (_userId: string, _limit = 100): Promise<AnalyticsEvent[]> => {
  return []
}

export const getEventsByType = async (_eventName: string, _limit = 100): Promise<AnalyticsEvent[]> => {
  return []
}

export const getFunnelAnalysis = async (
  _funnelName: string,
  _dateRange?: { start: string; end: string }
): Promise<AnalyticsEvent[]> => {
  return []
}

export const getRevenueAnalysis = async (
  _dateRange?: { start: string; end: string }
): Promise<AnalyticsEvent[]> => {
  return []
}