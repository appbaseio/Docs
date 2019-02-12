---
id: query-rules
title: "Query Rules"
layout: docs
sectionid: query-rules
permalink: concepts/query-rules.html
prev: api-credentials.html
prevTitle: "API Credentials"
---

## Part 1: Introduction

Query Rules are essentially `If-This-Then-That` construct - ***If*** **search query contains 'Google',** ***then*** 
**promote 'Chromebook'.** Query Rules serve a very specific purpose as far as search results and merchandising is 
concerned. When building a commercial search product, customers more often than not require commercializing the product 
based on certain search queries. 

One of the most common approach to achieve this is to **promote** or **hide** certain search results based on a given 
query. Query Rules automates this process by allowing users curate `If-This-Then-That` rules. For example, a user can 
create a rule to **promote** an external document or result when a particular search query is fired. The rule is then 
triggered automatically whenever that search query is fired and appends the promoted document along with the search 
results. Similarly, a rule can be created that prevents i.e. **hides** certain results from getting included in the 
actual search results.

## Part 2: Query Rules using Dashboard

The dashboard provides an intuitive way to create, manage and configure your Query Rules. In fact, you can visualize 
and tune your search results while you are creating the rule. After the rule is created, you can always tweak it later
based on your search and merchandising needs.

In order to create a Query Rule, select `Query Rules` under `Develop` on the dashboard's navigation bar.

![]()

Creating a rule from dashboard is a two-step process. In the first step you configure the ***If*** condition of the rule.
Query Rule currently supports four `operators`:

- `is`: resembles the docs with **exact** query match
- `starts_with`: resembles the docs that **starts with** the given query
- `ends_with`: resembles the docs that **ends with** the given query
- `contains`: resembles the docs that **contains** the given query

For example: After the configuring this step, what we achieve is something similar to: 
***If*** **search query contains 'Google'**, where the `operator` is `contains` and `query` is `Google`.

<!-- If condition image -->
![](https://i.imgur.com/j4qodaD.png)

The second step consists of configuring of actions that are triggered when the ***If*** condition of the query is 
matched. Query Rule currently supports two `actions`:

- `promote`: appends external docs or results along with the actual search results
- `hide`: prevents certain results from getting included in the resturned search results

<!-- Then condition image each for promote and hide -->
![](https://i.imgur.com/biuc4SL.png)

## Part 3: Query Rules using API

The dashboard provides an easier way to tune and visualize the query rules, however you can also manage them via API.
The rule can be divided into two main segments:

1. ***If*** clause:

The **If** clause comprises of both `query` and `operator`. Currently supported `operators` are listed in the 
section above. Whenever a search query matches the **If** clause, it automatically triggers the **Then** clause of the
rule.


```js
{
    ..
    "if": {
        "query": "harry potter",
        "operator": "contains"
    } 
    ...
}
```

2. ***Then*** clause:

The **Then** clause comprises of `actions` that are to be executed when a rule is triggered. Currently supported 
`actions` are listed in the section above.

```js
{
    ...
    "then": {
        "promote": [
            {
                "id": "harry_potter_cheat_sheet",
                "name": "Harry Potter",
                "section_order": [
                    "Books",
                    "Movies",
                    "Franchise"
                ],
                "template_type": "reference"
            }
        ],
        "hide": [
            { "doc_id": "Jle44WgBnfYvZBcA0H66" }
        ]
    }
    ...
}
```

A complete query rule may look similar to:

```js
{
    "id": "contains_harry_potter",
    "if": {
        "query": "harry potter",
        "operator": "contains"
    },
    "then": {
        "promote": [
            {
                "id": "harry_potter_cheat_sheet",
                "name": "Harry Potter",
                "section_order": [
                    "Books",
                    "Movies",
                    "Franchise"
                ],
                "template_type": "reference"
            }
        ],
        "hide": [
            { "doc_id": "Jle44WgBnfYvZBcA0H66" }
        ]
    }
}
```

**Note**: The rule `id` is an optional field, in case it isn't provided, it will be generated automatically 
based on the `query` and `operator`.

Now that we have constructed the `rule` object, we can create the query rule by executing the following request:

```sh
curl --location --request POST "https://accapi.appbase.io/app/book-store/rule" \
  --header "Content-Type: application/json" \
  --data "
{
    \"id\": \"contains_harry_potter\",
    \"if\": {
        \"query\": \"harry potter\",
        \"operator": \"contains\"
    },
    \"then\": {
        \"promote\": [
            {
                \"id\": \"harry_potter_cheat_sheet\",
                \"name\": \"Harry Potter\",
                \"section_order\": [
                    \"Books\",
                    \"Movies\",
                    \"Franchise\"
                ],
                \"template_type\": \"reference\"
            }
        ],
        \"hide\": [
            { \"doc_id\": \"Jle44WgBnfYvZBcA0H66\" }
        ]
    }
}
"
```

We can similarly add more rules and update or delete the existing query rules via API. Checkout the Query Rules REST 
API [documentation](https://documenter.getpostman.com/view/2848488/RW81vt5x#723b2a22-e515-4950-adec-ab3b64ccfcd7) for 
more information.
