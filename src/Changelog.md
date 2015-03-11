##### AppbaseJS v2.2.13 -> 2.2.14
- using `v2_1` REST API

##### AppbaseJS v2.2.13 -> 2.2.14
- `on()` methods now include vertex data with them.
- better error return for `on` methods

##### AppbaseJS v2.2.12 -> 2.2.13
- Resolved: path problems when using with an https site

##### AppbaseJS v2.2.11 -> 2.2.12
- fixed: onComplete wasn't getting the reference
- Appbase.rawSearch();

##### AppbaseJS v2.2.10 -> 2.2.11
- fixed: error thrown on empty namespaces

##### ng-appbase v2.2.3 -> 2.2.4
- onComplete callback: called after properties are loaded as well, with arguments scope and reference

##### ng-appbase v2.2.2 -> 2.2.3
- onComplete callback

##### AppbaseJS v2.2.9 -> 2.2.10
- onComplete callback: returns the reference as well

##### AppbaseJS v2.2.8 -> 2.2.9
- onComplete callback: fired when existing edges/vertices have been fired

##### ng-appbase v2.2.1 -> 2.2.2
- using Appbase.vRefModifier() to convert every reference to ng-appbase ref

##### AppbaseJS v2.2.7 -> 2.2.8
- Appbase.vRefModifier and Appbase.nsRefModifier to let bindings modify references

##### ng-appbase v2.2.0 -> 2.2.1
- performance improvements

##### AppbaseJS v2.2.6 -> 2.2.7
- performance improvements in nsRef.v() - making ng-appbase was faster

##### (Discarded) AppbaseJS v2.2.6 -> 2.2.7
- Supporting the only characters encoded by `encodeURI()` except namespaces. Encoding all URLs before requesting server

##### AppbaseJS v2.2.5 -> 2.2.6
- console.error -> console.log
- minified size: 200k -> 150k
- version info prepended in each build
- firing- comments removed

##### AppbaseJS v2.2.4 -> 2.2.5
- getAuth() - resolved: 'token not present'
- proper character support
  - paths support all ascii except '~' and ':'
  - vertice names: all ascii except '/', '~' and ':'
  - property names: all unicode
  - appname: lowercase alphanumeric and underscores
  - appsecret: alphanumeric

##### AppbaseJS v2.2.3 -> 2.2.4
- namespace listening works after a reconnect

##### AppbaseJS v2.2.2 -> 2.2.3
- vRef.name(), nsRef.name(), vRef.once('properties')

##### AppbaseJS v2.2.1 -> 2.2.2
- getAuth() returns {authObj, requestObj}

##### AppbaseJS v2.2.0 -> 2.2.1
- getAuth() returns stored credentials

##### AppbaseJS v1.2.2 -> 2.2.0
- The lib now points to REST 2.0
- fixed: credentils was creating random vertices

##### AppbaseJS v1.2.1 -> 1.2.2
- the lib points to REST API 1.0
- `setEdge` works without a callback
- Event: _vertex_destroyed_ -> _vertex_removed_
- input validation and returning proper errors
- removeEdge and removeData accepts array/string
- `inVertex` throws an error when called on a root vertex

##### AppbaseJS v1.2.0 -> 1.2.1
Edge filters: startAt, endAt are working, limit and skip are not functional.
