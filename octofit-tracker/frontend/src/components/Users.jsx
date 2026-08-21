import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message))
  }, [])

  return <CollectionPage eyebrow="People" title="Athlete roster" description="A live view of every athlete in the OctoFit network." columns={['Name', 'Team', 'Level']} rows={users.map((user) => [user.name, user.team || 'Unassigned', user.fitnessLevel || 'Not set'])} error={error} />
}

export default Users

function CollectionPage({ eyebrow, title, description, columns, rows, error }) {
  return <section className="page-section"><p className="eyebrow">{eyebrow} / {rows.length} records</p><h1>{title}</h1><p className="lede">{description}</p>{error ? <p className="alert alert-danger">{error}</p> : <DataTable columns={columns} rows={rows} />}</section>
}

export function DataTable({ columns, rows }) {
  return <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={row[0] || index}>{row.map((value, cellIndex) => <td key={cellIndex}>{value ?? '-'}</td>)}</tr>) : <tr><td colSpan={columns.length} className="empty">No records found.</td></tr>}</tbody></table></div>
}