import { useEffect } from 'react'
import Issues from '../components/Issues'
import Menu from '../components/Menu'

export default function IssuesPage() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>pages/page.js</h1>
      <Menu />
      <Issues repo="vercel/next.js" />
    </div>
  )
}
