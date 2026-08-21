import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataTable } from './Users.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <Page apiEndpoint="-8000.app.github.dev/api/activities" title="Activity log" eyebrow="Movement" description="Training sessions flowing in from the activity API." columns={['Athlete', 'Type', 'Duration', 'Calories']} rows={activities.map((activity) => [activity.userId?.name || activity.user || 'Unknown athlete', activity.type, activity.durationMinutes ? `${activity.durationMinutes} min` : '-', activity.caloriesBurned ? `${activity.caloriesBurned} kcal` : '-'])} error={error} />
}

function Page({ apiEndpoint, title, eyebrow, description, columns, rows, error }) { return <section className="page-section" data-api-endpoint={apiEndpoint}><p className="eyebrow">{eyebrow} / {rows.length} records</p><h1>{title}</h1><p className="lede">{description}</p>{error ? <p className="alert alert-danger">{error}</p> : <DataTable columns={columns} rows={rows} />}</section> }
export default Activities