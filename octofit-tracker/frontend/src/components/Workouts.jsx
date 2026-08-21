import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataTable } from './Users.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <Page apiEndpoint="-8000.app.github.dev/api/workouts" title="Workout library" eyebrow="Guidance" description="Suggested sessions ready for the next training block." columns={['Workout', 'Focus', 'Difficulty', 'Duration']} rows={workouts.map((workout) => [workout.name || workout.title, workout.type || workout.focus || '-', workout.difficulty || workout.level || '-', workout.durationMinutes ? `${workout.durationMinutes} min` : '-'])} error={error} />
}
function Page({ apiEndpoint, title, eyebrow, description, columns, rows, error }) { return <section className="page-section" data-api-endpoint={apiEndpoint}><p className="eyebrow">{eyebrow} / {rows.length} records</p><h1>{title}</h1><p className="lede">{description}</p>{error ? <p className="alert alert-danger">{error}</p> : <DataTable columns={columns} rows={rows} />}</section> }
export default Workouts