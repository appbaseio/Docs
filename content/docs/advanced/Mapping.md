---
id: mapping
title: "Elasticsearch Mapping"
layout: docs
sectionid: docs
permalink: docs/advanced/mapping.html
prev: react.html
prevTitle: "Reactive Chaining"
next: styleguide.html
nextTitle: "Style Guide"
---

1. Close the Index:      

```bash
curl 'http://scalr.api.appbase.io/map_demo/_close' -X POST -d '{}' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```    

2. Update the settings:

```bash
curl 'http://scalr.api.appbase.io/map_demo/_settings' -X PUT -d '{
  "analysis": {
    "filter": {
      "nGram_filter": {
        "type": "edge_ngram",
        "min_gram": 1,
        "max_gram": 20,
        "token_chars": [
          "letter",
          "digit",
          "punctuation",
          "symbol"
        ]
      }
    },
    "analyzer": {
      "nGram_analyzer": {
        "type": "custom",
        "tokenizer": "whitespace",
        "filter": [
          "lowercase",
          "asciifolding",
          "nGram_filter"
        ]
      },
      "body_analyzer": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": [
          "lowercase",
          "asciifolding",
          "stop",
          "snowball",
          "word_delimiter"
        ]
      },
      "standard_analyzer": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": [
          "lowercase",
          "asciifolding"
        ]
      },
      "whitespace_analyzer": {
        "type": "whitespace",
        "tokenizer": "whitespace",
        "filter": [
          "lowercase",
          "asciifolding"
        ]
      }
    }
  }
}' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```    

3. Open the Index:

```bash
curl 'http://scalr.api.appbase.io/map_demo/_open' -X POST -d '{}' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```    

4. Update the mapping:

```bash
curl 'http://scalr.api.appbase.io/map_demo/_mapping/meetupdata1?ignore_conflicts=true&update_all_types=true' -X PUT -d '{
  "meetupdata1": {
    "properties": {
      "group": {
        "properties": {
          "group_city_new": {
            "type": "multi_field",
            "fields": {
              "group_city_simple": {
                "type": "string",
                "index": "not_analyzed"
              },
              "group_city_ngrams": {
                "type": "string",
                "analyzer": "nGram_analyzer",
                "search_analyzer": "whitespace_analyzer"
              }
            }
          },
          "group_city": {
            "type": "string",
            "fields": {
              "raw": { 
                "type":  "string",
                "index": "not_analyzed"
              }
            }
          },
          "group_topics": {
            "properties": {
              "topic_name_new": {
                "type": "multi_field",
                "fields": {
                  "topic_name_simple": {
                    "type": "string",
                    "index": "not_analyzed"
                  },
                  "topic_name_ngrams": {
                    "type": "string",
                    "analyzer": "nGram_analyzer",
                    "search_analyzer": "whitespace_analyzer"
                  }
                }
              }
            }
          }
        }
      },
      "venue_new": {
        "type": "multi_field",
        "fields": {
          "venue_name_simple": {
            "type": "string",
            "index": "not_analyzed"
          },
          "venue_name_ngrams": {
            "type": "string",
            "analyzer": "nGram_analyzer",
            "search_analyzer": "whitespace_analyzer"
          }
        }
        
      }
    }
    
  }
}

' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```
