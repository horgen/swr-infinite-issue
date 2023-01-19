import { useRouter } from 'next/router'
import Issues from '../components/Issues'
import Menu from '../components/Menu'

export default function App() {
  const router = useRouter()
  let repo = 'reactjs/react-a11y'
  if (router.query.page && router.query.page === '2') {
		repo = 'facebook/react'
	}

	return (
		<div style={{ fontFamily: 'sans-serif' }}>
			<h1>IndexPage</h1>
			<Menu />
			<Issues repo={repo} />
		</div>
	)
}
