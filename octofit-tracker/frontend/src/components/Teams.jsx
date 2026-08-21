import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataTable } from './Users.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <Page apiEndpoint="-8000.app.github.dev/api/teams" title="Team standings" eyebrow="Community" description="See how squads are forming and growing together." columns={['Team', 'Members', 'Coach']} rows={teams.map((team) => [team.name, Array.isArray(team.members) ? team.members.length : team.memberCount || '-', team.coach || team.description || '-'])} error={error} />
}
function Page({ apiEndpoint, title, eyebrow, description, columns, rows, error }) { return <section className="page-section" data-api-endpoint={apiEndpoint}><p className="eyebrow">{eyebrow} / {rows.length} records</p><h1>{title}</h1><p className="lede">{description}</p>{error ? <p className="alert alert-danger">{error}</p> : <DataTable columns={columns} rows={rows} />}</section> }
export default Teams