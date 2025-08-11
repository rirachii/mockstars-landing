'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Download, Users, DollarSign, TrendingUp, Activity } from 'lucide-react'
import { format } from 'date-fns'
import { 
  getEventsByType, 
  getFunnelAnalysis, 
  getRevenueAnalysis,
  type AnalyticsEvent 
} from '@/lib/analytics/supabase'

interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  conversionRate: number
  resumesCreated: number
  interviewSessions: number
}

export function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    conversionRate: 0,
    resumesCreated: 0,
    interviewSessions: 0,
  })
  
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  })
  
  const [funnelData, setFunnelData] = useState<AnalyticsEvent[]>([])
  const [revenueData, setRevenueData] = useState<AnalyticsEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [dateRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      const dateRangeFilter = {
        start: dateRange.from.toISOString(),
        end: dateRange.to.toISOString(),
      }

      // Load funnel data
      const acquisitionFunnel = await getFunnelAnalysis('acquisition', dateRangeFilter)
      const conversionFunnel = await getFunnelAnalysis('conversion', dateRangeFilter)
      setFunnelData([...acquisitionFunnel, ...conversionFunnel])

      // Load revenue data
      const revenue = await getRevenueAnalysis(dateRangeFilter)
      setRevenueData(revenue)

      // Load other metrics
      const [signups, resumes, interviews] = await Promise.all([
        getEventsByType('user_signed_up'),
        getEventsByType('resume_created'),
        getEventsByType('interview_practice_completed'),
      ])

      // Calculate metrics
      const totalRevenue = revenue.reduce((sum, event) => {
        return sum + (parseFloat(event.properties.revenue) || 0)
      }, 0)

      const uniqueUsers = new Set([
        ...signups.map(e => e.user_id),
        ...resumes.map(e => e.user_id),
        ...interviews.map(e => e.user_id),
      ]).size

      const paidUsers = new Set(revenue.map(e => e.user_id)).size
      const conversionRate = uniqueUsers > 0 ? (paidUsers / uniqueUsers) * 100 : 0

      setMetrics({
        totalUsers: uniqueUsers,
        activeUsers: uniqueUsers, // Simplified - could be more sophisticated
        totalRevenue,
        conversionRate,
        resumesCreated: resumes.length,
        interviewSessions: interviews.length,
      })
    } catch (error) {
      console.error('Failed to load analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = async () => {
    // Export analytics data as CSV
    const csvData = funnelData.map(event => ({
      event_name: event.event_name,
      user_id: event.user_id,
      timestamp: event.timestamp,
      properties: JSON.stringify(event.properties),
    }))

    const csv = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track user behavior, conversions, and revenue across your SaaS
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to })
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={exportData} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Unique users who signed up
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Revenue from subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Users who became paying customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resumes Created</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.resumesCreated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total resumes generated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.interviewSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Practice sessions completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="funnel" className="space-y-4">
        <TabsList>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>
                Track users through the acquisition and conversion process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['signup_completed', 'resume_created', 'resume_downloaded', 'subscription_started'].map((step, index) => {
                  const stepEvents = funnelData.filter(e => e.event_name.includes(step))
                  const uniqueUsers = new Set(stepEvents.map(e => e.user_id)).size
                  
                  return (
                    <div key={step} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <h4 className="font-medium capitalize">{step.replace('_', ' ')}</h4>
                          <p className="text-sm text-muted-foreground">{uniqueUsers} users</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{uniqueUsers}</div>
                        {index > 0 && (
                          <div className="text-sm text-muted-foreground">
                            {/* Calculate conversion rate from previous step */}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>
                Analyze revenue patterns and subscription data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.slice(0, 10).map((event, index) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">
                        {event.properties.plan || 'Unknown Plan'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(event.timestamp), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        ${parseFloat(event.properties.revenue || '0').toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.properties.currency?.toUpperCase() || 'USD'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                Track how users interact with your features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Engagement metrics will appear here as users interact with your app</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}