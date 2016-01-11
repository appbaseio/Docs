var docbaseConfig = {
  method: 'file',
  map: {
      file: 'map.json',
      path: '/'
  },
  "file" : {
    'path': 'src'
  },
  github: {
    client_id:'2189c9f3da189f760f69',
    client_secret: '5385328f8910540ae0e5fde1df78fba6686651cd',
    user: 'appbaseio',
    repo: 'Docs',
    path: 'src',
    branch: 'master'
  },
  indexType: 'html',
  indexHtml: 'html/main.html',
  editGithubBtn: true,
  html5mode: false,
  flatdocHtml: 'html/flatdoc.html',
  angularAppName: 'docbaseApp',
  versions : {
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
                  }
              ]
          },
          {
              "label": "Go",
              "name": "golang",
              "files": [
                  {
                      "label": "Quick Start",
                      "name": "golang-intro"
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
      ],
      "v2.0" : [
          {
              "label": "Concepts",
              "name": "concepts",
              "files": [
                  {
                      "label": "Datamodel",
                      "name": "datamodel"
                  }
              ]
          },
          {
              "label": "REST",
              "name": "rest",
              "files": [
                  {
                      "label": "API Reference",
                      "name": "api-reference"
                  }
              ]
          },
          {
              "label": "Javascript",
              "name": "javascript",
              "files": [
                  {
                      "label": "Quick start",
                      "name": "quick-start"
                  },
                  {
                      "label": "API Reference",
                      "name": "api-reference"
                  },
                  {
                      "label": "Angular Binding",
                      "name": "angular"
                  },
                  {
                      "label": "OAuth",
                      "name": "oauth"
                  }
              ]
          },
          {
              "label": "Search Queries",
              "name": "search",
              "files": [
                  {
                      "label": "Quick Start",
                      "name": "quick-start"
                  },
                  {
                      "label": "Use-cases",
                      "name": "use-cases"
                  }
              ]
          }
      ],
      "v3.0" : [
          {
              "label": "Changelog",
              "name": "changelog",
              "files": [
                  {
                      "label": "Changelog",
                      "name": "changelog"
                  }
              ]
          },
          {
              "label": "REST",
              "name": "rest",
              "files": [
                  {
                      "label": "API Reference",
                      "name": "api-reference"
                  }
              ]
          },
          {
              "label": "Search",
              "name": "search",
              "files": [
                  {
                      "label": "Quick Start",
                      "name": "quick-start"
                  },
                  {
                      "label": "Use-cases",
                      "name": "use-cases"
                  }
              ]
          },
          {
              "label": "Concepts",
              "name": "concepts",
              "files": [
                  {
                      "label": "Datamodel",
                      "name": "datamodel"
                  }
              ]
          },
          {
              "label": "REST",
              "name": "rest",
              "files": [
                  {
                      "label": "API Reference",
                      "name": "api-reference"
                  }
              ]
          },
          {
              "label": "Javascript",
              "name": "javascript",
              "files": [
                  {
                      "label": "API Reference",
                      "name": "api-reference"
                  }
              ]
          }

      ]

  }
};
