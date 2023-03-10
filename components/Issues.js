import React, { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import fetch from '../libs/fetch'

const PAGE_SIZE = 6

export default function Issues({ repo }) {
	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite((index) => `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${index + 1}`, fetch, {
		onSuccess: (data, key, config) => {
			console.log('onSuccess key', key)
			console.log('onSuccess data', data)
		},
	})

	useEffect(() => {
		console.log('size', size)
	}, [size])

	const issues = data ? [].concat(...data) : []
	const isLoadingInitialData = !data && !error
	const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
	const isRefreshing = isValidating && data && data.length === size

	return (
		<>
			<h2>{repo}</h2>
			<button onClick={() => { setSize(1); }}>load issues</button>
			<p>
				showing {size} page(s) of {isLoadingMore ? '...' : issues.length}{' '}
				issue(s){' '}
				<button disabled={isLoadingMore || isReachingEnd} onClick={() => setSize(size + 1)}>{isLoadingMore ? 'loading...' : isReachingEnd ? 'no more issues' : 'load more'}</button>
				<button disabled={isRefreshing} onClick={() => mutate()}>{isRefreshing ? 'refreshing...' : 'refresh'}</button>
				<button disabled={!size} onClick={() => setSize(0)}>clear</button>
			</p>
			{isEmpty ? <p>Yay, no issues found.</p> : null}
			{issues.map((issue) => {
				return (
					<p key={issue.id} style={{ margin: '6px 0' }}>- {issue.title}</p>
				)
			})}
		</>
	)
}
