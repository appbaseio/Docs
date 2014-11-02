# Introduction

The Appbase JS library allows developers to create realtime multi-user apps using a graph data model and realtime smart-search capabilities.

The Appbase library exposes the ``Appbase`` object. The methods in the JS lib rely on three main objects.

1. **Appbase**
2. **Namespace Reference** (referred as ``nsref`` in this doc)
3. **Vertex Reference** (referred as ``vref`` in this doc)

## Appbase

**Appbase** is the global object exposed the JS library. It has the following four methods: ``credentials()``, ``ns()``, ``uuid()``, and ``serverTime()``.

### credentials()
Appbase.credentials(appname, appsecret)

Authorize the app credentials using the appname and appsecret identifiers, as they appear in the [Dev Console](//appbase.io/developer).

```javascript
var register = Appbase.credentials('aphrodite', '4d8d0072580912343cd74aa0015cd217');
if (register === true)
  console.log("app successfully registered");
```

``Appbase.credentials(appname, appsecret)``

* **appname** ``String`` — App name
* **appsecret** ``String`` — App secret key

**Returns**

``boolean`` **true** if the app has been successfully registered.
