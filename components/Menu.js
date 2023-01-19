import React from 'react'
import Link from 'next/link'

export default function Menu() {
	return (
		<ul>
			<li><Link href="/?page=1">pages/index.js - 1</Link></li>
			<li><Link href="/?page=2">pages/index.js - 2</Link></li>
			<li><Link href="/page">pages/page.js</Link></li>
		</ul>
	)
}
