---
title: 'Comparison'
meta_title: 'Comparison'
meta_description: 'Here, we share how ReactiveSearch compares with other projects that have similar aims.'
keywords:
    - reactivesearch
    - comparison
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

### Comparison

Here, we share how `ReactiveSearch` compares with other projects that have similar aims.

<br />

|                                **#** |                                                               **ReactiveSearch**                                                                |                                                                              **SearchKit**                                                                              |                                         **InstantSearch**                                         |
| -----------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
|                          **Backend** |                                          Any Elasticsearch index hosted on any Elasticsearch cluster.                                           |                                                      Any Elasticsearch index hosted on any Elasticsearch cluster.                                                       |                      Custom-built for Algolia, a proprietary search engine.                       |
|                      **Development** |                                                       Actively developed and maintained.                                                        |                                                        Active issue responses, some development and maintenance.                                                        |                                Actively developed and maintained.                                 |
|            **Onboarding Experience** | Starter apps, live interactive tutorial, getting started guide, component playground, every component has a live working demo with codesandbox. |                                      Getting started tutorial, no live component demos, sparse reference spec for many components.                                      |                    Starter apps, getting started guide, component playground.                     |
|                  **Styling Support** |                      Styled and scoped components. No external CSS import required. Rich theming supported as React props.                      |                                            CSS based styles with BEM, not scoped to components. Theming supported with SCSS.                                            |     CSS based styles, requires external style import. Theming supported by manipulating CSS.      |
|              **Types of Components** |                              Lists, Ranges, Search, Dates, Maps, Result Displays. Can use your own UI components.                               | Lists, Ranges, Search*, Result*. Can't use your own UI components. (Only one component for Search and Result, resulting in more code to be written for customizability) |                   Lists, Range, Search, Result. Can use your own UI components.                   |
| **Supported Distribution Platforms** |                                         React, Vue, React Native, Android (coming soon).                                         |                                                                             React for Web.                                                                              | React, Vue, Angular, vanilla JS for Web, React Native for mobile but latter has no UI components. |

The reason this page exists is because we often get asked about it. We welcome contributionstoon this page, and would like to add that our ideas on how other projects compare is based on cursory knowledge. If you are building a project or you know of another project that is in the similar space, let us know and we will update the comparisons.
