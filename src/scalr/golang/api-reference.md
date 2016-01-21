# GOLANG API REFERENCE

[go-appbase](https://github.com/appbaseio/go-appbase) is a data streams library for Go.

It can:

* Continuously stream updates to documents, queries or filters over http-streams.  
* Index new documents and update existing ones.  
* Is compatible with [Elasticsearch's Go Client](https://github.com/olivere/elastic) maintained by Olivere. 

You can read the quick start guide for installation and basic usage. You can also read the API doc from godoc directly [here](https://godoc.org/github.com/appbaseio/go-appbase).


## SETUP

#### type Client

```go
type Client struct {
}
```


#### NewClient

```go
client, _ := NewClient("https://scalr.api.appbase.io", "QEVrcElba", "5c13d943-a5d1-4b05-92f3-42707d49fcbb", "es2test1")

err := client.Ping()
if err != nil {
    log.Fatalln(err)
}

fmt.Println("Client created")
```

**Usage**

``
func NewClient(URL string, username string, password string, appname string) (*Client, error)
``
- **URL** ``string``- URL with the API version, always *https://scalr.api.appbase.io* 
- **username** ``string`` - username for the app as displayed in the dashboard
- **password** ``string`` - password for the app as displayed in the dashboard
- **appname** ``string`` - name of the app as displayed in the [dashboard](https://appbase.io/scalr)

**Returns**

Returns a **Client** struct which has - ``Ping()``, ``Index()``, ``Get()``, ``GetStream()``, ``Update()``, ``Delete()``, ``Search()``, ``SearchStream()``, and ``SearchStreamToURL()``.

#### Delete

Delete returns a DeleteService which is used to delete a document

```go
func (c *Client) Delete() *actions.DeleteService
```

#### Get

Get returns a GetService which is used to retrieve a document

```go
func (c *Client) Get() *actions.GetService
```

#### GetStream

GetStream is used to start a stream of updates corresponding to a document

```go
func (c *Client) GetStream() *actions.GetStreamService
```

#### Index

Index returns an IndexService which is used to index a document

```go
func (c *Client) Index() *actions.IndexService
```

#### Ping

```go
func (c *Client) Ping() error
```

#### Search

Search provides access to Elasticsearch's search functionality

```go
func (c *Client) Search() *actions.SearchService
```

#### SearchStream

SearchStream is used to get updates corresponding to a query

```go
func (c *Client) SearchStream() *actions.SearchStreamService
```

#### SearchStreamToURL

SearchStream is used to send updates corresponding to a query to an URL

```go
func (c *Client) SearchStreamToURL() *actions.SearchStreamToURLService
```

#### Update

Update returns an UpdateService which is used to update a document

```go
func (c *Client) Update() *actions.UpdateService
```
