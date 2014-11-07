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
