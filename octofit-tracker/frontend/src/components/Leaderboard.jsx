import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataTable } from './Users.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <Page title="Leaderboard" eyebrow="Competition" description="The current race for consistency and points." columns={['Rank', 'Athlete', 'Points', 'Streak']} rows={entries.map((entry, index) => [index + 1, entry.user?.name || entry.userId?.name || entry.name || '-', entry.points ?? 0, entry.streak ? `${entry.streak} days` : '0 days'])} error={error} />
}
function Page({ title, eyebrow, description, columns, rows, error }) { return <section className="page-section"><p className="eyebrow">{eyebrow} / {rows.length} records</p><h1>{title}</h1><p className="lede">{description}</p>{error ? <p className="alert alert-danger">{error}</p> : <DataTable columns={columns} rows={rows} />}</section> }
export default Leaderboard