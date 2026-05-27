import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

export const getKPIs = (range = '30d') =>
  api.get(`/kpis?range=${range}`).then((r) => r.data)

export const getUserGrowth = (range = '12m') =>
  api.get(`/user-growth?range=${range}`).then((r) => r.data)

export const getFeatureUsage = (range = '30d') =>
  api.get(`/feature-usage?range=${range}`).then((r) => r.data)

export const getTrafficSources = () =>
  api.get('/traffic-sources').then((r) => r.data)

export const getRetentionTrend = (range = '30d') =>
  api.get(`/retention-trend?range=${range}`).then((r) => r.data)

export const getInsights = () =>
  api.get('/insights').then((r) => r.data)
