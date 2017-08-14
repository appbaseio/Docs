var docbaseConfig = {
  "method": "github",
  "generic": {
    "baseurl": "",
    "path": ""
  },
  "file": {
    "path": ""
  },
  "github": {
    "user": "appbaseio",
    "repo": "Docs",
    "path": "src",
    "branch": "master",
    "access_token": "OTAwNDU5MTk4M2NlYzViYzQxNzFlN2E3Yjk1MWQ2ZjhkODRjMTg5Yg=="
  },
  "indexHtml": "./html/main.html",
  "flatdocHtml": "./bower_components/docbase/html/flatdoc.html",
  "default_version": "",
  "manual_override": true,
  "versions" : {
  "scalr": [
    {
      "label": "Concepts",
      "name": "concepts",
      "files": [
        {
          "label": "Intro",
          "name": "intro"
        },
        {
          "label": "Data Model",
          "name": "datamodel"
        },
        {
          "label": "Data Browser",
          "name": "databrowser"
        }
      ]
    },
    {
      "label": "Javascript",
      "name": "javascript",
      "files": [
        {
          "label": "JS Quick Start",
          "name": "javascript-intro"
        },
        {
          "label": "Node Quick Start",
          "name": "nodejs-intro"
        },
        {
          "label": "API Reference",
          "name": "api-reference"
        },
        {
          "label": "Webhooks Guide",
          "name": "javascript-webhooks"
        }
      ]
    },
    {
      "label": "REST",
      "name": "rest",
      "files": [
        {
          "label": "Quick Start",
          "name": "intro"
        },
        {
          "label": "API Endpoints",
          "name": "endpoints"
        }
      ]
    },
    {
      "label": "Go",
      "name": "golang",
      "files": [
        {
          "label": "API Reference",
          "name": "api-reference"
        }
      ]
    },
    {
      "label": "FAQs",
      "name": "FAQs",
      "files": [
        {
          "label": "JS API",
          "name": "jsapi"
        },
        {
          "label": "REST",
          "name": "rest"
        }
      ]
    }
  ]
}
}
