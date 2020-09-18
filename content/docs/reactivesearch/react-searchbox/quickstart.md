---
title: 'QuickStart'
meta_title: 'QuickStart to React SearchBox'
meta_description: 'React SearchBox is a lightweight react search library with some common utilities.'
keywords:
    - quickstart
    - react-searchbox
    - search library
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'react-searchbox-reactivesearch'
---

[react-searchbox](https://github.com/appbaseio/react-searchbox) - React SearchBox is a standalone, lightweight search library which allows you to add custom UI components and allow seamless search systems.

## Installation

To install React Searchbox you can use `npm` or `yarn` to get set as follows:

### Using npm

```js
npm install @appbaseio/react-searchbox
```

### Using yarn

```js
yarn add @appbaseio/react-searchbox
```

## Basic usage

```js
import React from 'react';

import { SearchBox, SearchBase, Component } from '@appbaseio/react-searchbox';
import './styles.css';

export default () => (
	<SearchBase
		index="good-books-ds"
		credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
		url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
	>
		<div>
			<SearchBox
				id="search-component"
				dataField={[
					{
						field: 'original_title',
						weight: 1,
					},
					{
						field: 'original_title.search',
						weight: 3,
					},
				]}
				title="Search"
				placeholder="Search for Books"
				defaultSuggestions={[
					{
						label: 'Songwriting',
						value: 'Songwriting',
					},
					{
						label: 'Musicians',
						value: 'Musicians',
					},
				]}
			/>
			<Component
				id="result-component"
				highlight
				dataField="original_title"
				react={{
					and: ['search-component', 'author-filter'],
				}}
			>
				{({ results, requestPending }) => {
					return (
						<div className="result-list-container">
							{requestPending ? (
								<div>Loading Results ...</div>
							) : (
								<div>
									{!results.data.length ? (
										<div>No results found</div>
									) : (
										<p>
											{results.numberOfResults} results found in{' '}
											{results.time}
											ms
										</p>
									)}
									{results.data.map(item => (
										<div className="flex book-content" key={item._id}>
											<img
												src={item.image}
												alt="Book Cover"
												className="book-image"
											/>
											<div
												className="flex column justify-center"
												style={{ marginLeft: 20 }}
											>
												<div
													className="book-header"
													dangerouslySetInnerHTML={{
														__html: item.original_title,
													}}
												/>
												<div className="flex column justify-space-between">
													<div>
														<div>
															by{' '}
															<span className="authors-list">
																{item.authors}
															</span>
														</div>
														<div className="ratings-list flex align-center">
															<span className="stars">
																{Array(item.average_rating_rounded)
																	.fill('x')
																	.map((i, index) => (
																		<i
																			className="fas fa-star"
																			key={
																				item._id +
																				`_${index}`
																			}
																		/>
																	))}
															</span>
															<span className="avg-rating">
																({item.average_rating} avg)
															</span>
														</div>
													</div>
													<span className="pub-year">
														Pub {item.original_publication_year}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					);
				}}
			</Component>
		</div>
	</SearchBase>
);
```

## Basic usage with Facets

```js
import React from 'react';

import { SearchBox, SearchBase, Component } from '@appbaseio/react-searchbox';
import './styles.css';

export default () => (
	<SearchBase
		index="good-books-ds"
		credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
		url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
	>
		<div>
			<SearchBox
				id="search-component"
				dataField={[
					{
						field: 'original_title',
						weight: 1,
					},
					{
						field: 'original_title.search',
						weight: 3,
					},
				]}
				title="Search"
				placeholder="Search for Books"
				defaultSuggestions={[
					{
						label: 'Songwriting',
						value: 'Songwriting',
					},
					{
						label: 'Musicians',
						value: 'Musicians',
					},
				]}
			/>
			<div className="row">
				<div className="col">
					<Component
						id="author-filter"
						type="term"
						dataField="authors.keyword"
						subscribeTo={['aggregationData', 'requestStatus', 'value']}
						URLParams
						// To initialize with default value
						value={[]}
						render={({ aggregationData, requestPending, value, setValue }) => {
							return (
								<div className="filter-container">
									{requestPending ? (
										<div>Loading Filters ...</div>
									) : (
										aggregationData.data.map(item => (
											<div className="list-item" key={item._key}>
												<input
													type="checkbox"
													checked={
														value ? value.includes(item._key) : false
													}
													value={item._key}
													onChange={e => {
														const values = value || [];
														if (
															values &&
															values.includes(e.target.value)
														) {
															values.splice(
																values.indexOf(e.target.value),
																1,
															);
														} else {
															values.push(e.target.value);
														}
														// Set filter value and trigger custom query
														setValue(values, {
															triggerDefaultQuery: false,
															triggerCustomQuery: true,
															stateChanges: true,
														});
													}}
												/>
												<label
													className="list-item-label"
													htmlFor={item._key}
												>
													{item._key} ({item._doc_count})
												</label>
											</div>
										))
									)}
								</div>
							);
						}}
					/>
				</div>

				<div className="col">
					<Component
						id="result-component"
						highlight
						dataField="original_title"
						react={{
							and: ['search-component', 'author-filter'],
						}}
					>
						{({ results, requestPending }) => {
							return (
								<div className="result-list-container">
									{requestPending ? (
										<div>Loading Results ...</div>
									) : (
										<div>
											{!results.data.length ? (
												<div>No results found</div>
											) : (
												<p>
													{results.numberOfResults} results found in{' '}
													{results.time}ms
												</p>
											)}
											{results.data.map(item => (
												<div className="flex book-content" key={item._id}>
													<img
														src={item.image}
														alt="Book Cover"
														className="book-image"
													/>
													<div
														className="flex column justify-center"
														style={{ marginLeft: 20 }}
													>
														<div
															className="book-header"
															dangerouslySetInnerHTML={{
																__html: item.original_title,
															}}
														/>
														<div className="flex column justify-space-between">
															<div>
																<div>
																	by{' '}
																	<span className="authors-list">
																		{item.authors}
																	</span>
																</div>
																<div className="ratings-list flex align-center">
																	<span className="stars">
																		{Array(
																			item.average_rating_rounded,
																		)
																			.fill('x')
																			.map((i, index) => (
																				<i
																					className="fas fa-star"
																					key={
																						item._id +
																						`_${index}`
																					}
																				/>
																			)) // eslint-disable-line
																		}
																	</span>
																	<span className="avg-rating">
																		({item.average_rating} avg)
																	</span>
																</div>
															</div>
															<span className="pub-year">
																Pub {item.original_publication_year}
															</span>
														</div>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							);
						}}
					</Component>
				</div>
			</div>
		</div>
	</SearchBase>
);
```

## Demo

<iframe src="https://codesandbox.io/embed/github/appbaseio/searchbox/tree/master/packages/react-searchbox/examples/demo" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Check the docs for API Reference [here](/docs/reactivesearch/react-searchbox/apireference/)
