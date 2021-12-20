---
title: 'ReactiveGoogleMap'
meta_title: 'ReactiveGoogleMap'
meta_description: '`ReactiveGoogleMap` creates a data-driven map UI widget using Google Maps for Flutter. It is the key widget for building map based experiences.'
keywords:
    - reactivegooglemap
    - flutter_searchbox_ui
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'flutter-searchbox-ui'
---

![Basic Example](https://raw.githubusercontent.com/appbaseio/flutter-assets/master/map.gif)

[ReactiveGoogleMap](https://github.com/appbaseio/flutter-searchbox/blob/master/flutter_searchbox_ui/lib/src/components/reactive_google_map.dart) widegt creates a data-driven map UI component using [Google Maps for Flutter](https://pub.dev/packages/google_maps_flutter/). It is the key widget for building map based experiences. 

Example uses:
- showing a map of user checkins by city and topics for powering discovery based experiences.
- displaying restaurants filtered by a nearby distance query on a map.

## Installation

1. Depend on it

Add this to your package's `pubspec.yaml` file:

```yaml
dependencies:
  flutter_searchbox: ^2.2.3-nullsafety
  searchbase: ^2.2.2
  flutter_searchbox_ui: 1.0.16-alpha
```

2. Install it

You can install packages from the command line:

```bash
$ flutter pub get
```

> To use [ReactiveGoogleMap](/docs/reactivesearch/flutter-searchbox-ui/reactive-google-map/) please follow the installation guide mentioned at [here](https://pub.dev/packages/google_maps_flutter/).

## Basic usage

```dart
  ReactiveGoogleMap(
    id: "map-widget",
    react: const {
      "and": "search-widget",
    },
    initialCameraPosition: const CameraPosition(
      target: LatLng(37.42796133580664, -122.085749655962),
      zoom: 4,
    ),
    showMarkerClusters: true,
    dataField: 'location',
    triggerQueryOnInit: true,
    searchAsMove: true,
  )
```

## Usage with All Props

```dart
    ReactiveGoogleMap(
        id: "map-widget",
        subscribeTo: ['results'],
        triggerQueryOnInit: true,
        shouldListenForChanges: true,
        destroyOnDispose: true,
        react: const {
          "and": "search-widget",
        },
        index: 'earthquakes',
        url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
        credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61', 
        headers: {
            "x-custom-header": "map-example"
        },
        appbaseConfig: AppbaseSettings(
            userId: 'jon@appbase.io',         
            enableQueryRules: true,
        ),
        queryFormat: "or"
        dataField: 'location',
        categoryField: "place",
        categoryValue: "Kyrgyzstan",
        // nestedField: "", 
        from: 0,
        size: 0,
        sortBy: SortType.asc,
        aggregationField: "place.keyword",
        aggregationSize: 10,
        after: {
            "place.keyword": "Kyrgyzstan"
        },
        includeNullValues: false,
        includeFields: ["location", "magnitude", "time", "place"],
        excludeFields: [""],
        fuzziness: 1,
        searchOperators: true,
        highlight: true,
        highlightField: "title",
        customHighlight: {
                "fields": {
                    "title": {}
                },
                "pre_tags": [
                    "<pre>"
                ],
                "post_tags": [
                    "</pre>"
                ],
                "require_field_match": false
        },
        interval: 1,
        aggregations: ["max"],
        showMissing: true,
        missingLabel: "N/A",
        defaultQuery: (SearchController searchController) =>(
            {
                "aggregations": {
                  "location": {
                    "geohash_grid": {"field": "location", "precision": 3},
                    "aggs": {
                      "top_earthquakes": {
                        "top_hits": {
                          "_source": {
                            "includes": ["magnitude"]
                          },
                          "size": 1
                        }
                      }
                    }
                  },
                }
            }
        ),
        customQuery: (SearchController searchController) =>(
            {
                "query":{
                    "term":{
                        "place.keyword":"Kyrgyzstan"
                    }
                }
            }  
        ),        
        enableSynonyms: true,
        selectAllLabel: "All", // works for term type of queries
        pagination: true,
        queryString: true,        
        enablePopularSuggestions: true,
        maxPopularSuggestions: 3,
        showDistinctSuggestions: true,
        preserveResults: true,
        clearOnQueryChange: true,
        transformRequest: Future (Map request) =>
            Future.value({
                ...request,
                'credentials': 'include',
            })
        }       
        transformResponse: Future (Map elasticsearchResponse) async {
            final ids = elasticsearchResponse['hits']['hits'].map(item => item._id);
            final extraInformation = await getExtraInformation(ids);
            final hits = elasticsearchResponse['hits']['hits'].map(item => {
                final extraInformationItem = extraInformation.find(
                    otherItem => otherItem._id === item._id,
                );
                return Future.value({
                    ...item,
                    ...extraInformationItem,
                };
            }));
        
            return Future.value({
                ...elasticsearchResponse,
                'hits': {
                    ...elasticsearchResponse.hits,
                    hits,
                },
            });
        }            
        results: [],
        distinctField: 'place.keyword',
        distinctFieldConfig: {
            ...
        },
        beforeValueChange: Future (value) {
            // called before the value is set
            // returns a [Future]
            // update state or component props
            return Future.value(value);
            // or Future.error()
        },
        onValueChange: (next, {prev}){
            // perform side-effects as value changes
        },
        onResults: (nextMap, {prevMap}){
            // perform side-effects as results change
        },
        onAggregationData: (nextMap, {prevMap}){
            // perform side-effects as aggregation data changes
        },   
        onError: (error){
            // handle error
        },        
        onRequestStatusChange: (next, {prev}){
            // listen to request status changes
        },                 
        onQueryChange: (nextQuery, {prevQuery}){
            // listen to request query changes
        },                
        onMapCreated: (mapController){
          // Callback method for when the map is ready to be used.
        },
        onMapCreated: (mapController){
          // Callback method for when the map is ready to be used.
        },        
        initialCameraPosition: const CameraPosition(
          target: LatLng(37.42796133580664, -122.085749655962),
          zoom: 4,
        ),
        compassEnabled: true,
        mapToolbarEnabled: true,
        cameraTargetBounds: null,
        mapType: MapType.satellite,
        minMaxZoomPreference: MinMaxZoomPreference(null, null),
        rotateGesturesEnabled: true,
        scrollGesturesEnabled: true,
        zoomControlsEnabled: true,
        zoomGesturesEnabled: true,
        liteModeEnabled: true,
        tiltGesturesEnabled: true,
        padding: const EdgeInsets.all(0),
        polygons: {Polygon(...)},
        polylines: {Polyline(...)},
        circles: {Circle(...)},
        tileOverlays: {TileOverlay(...)},
        onCameraMoveStarted: (){
          // Called when the camera starts moving.
        },
        onCameraMove: (cameraPosition){
          // Called repeatedly as the camera continues to move after an onCameraMoveStarted call.
        },
        onCameraIdle: (){
          // Called when camera movement has ended.
        },
        onTap: (latLngArg){
          // Called every time a GoogleMap is tapped.
        },
        myLocationEnabled: true,
        myLocationButtonEnabled: true,
        indoorViewEnabled: true,
        trafficEnabled: true,
        buildingsEnabled: true,
        gestureRecognizers: [],
        // To build marker when `showMarkerClusters` is set to `false`
        // buildMarker: (Place place) {
        //   return Marker(
        //       markerId: MarkerId(place.id), position: place.position);
        // },
        showMarkerClusters: true,
        buildClusterMarker: (Cluster<Place> cluster) async {
          return Marker(
              markerId: MarkerId(cluster.getId()),
              position: cluster.location,
              icon: await _getMarkerBitmap(cluster.isMultiple ? 125 : 75,
              text: cluster.isMultiple
                    ? cluster.count.toString()
                    : cluster.items.first.source?["magnitude"]),
              );
        },
        autoCenter: true,
        searchAsMove: true,
        calculateMarkers: (SearchController controller) {
          List<Place> places = [];
          for (var bucket in controller.aggregationData?.raw?["buckets"] ?? []) {
            try {
              var locationDecode = GeoHash(bucket["key"]);
              var source = bucket["top_earthquakes"]?["hits"]?["hits"]?[0]
                  ?["_source"];
              places.add(
                Place(
                    id: bucket["key"],
                    position: LatLng(locationDecode.latitude(), locationDecode.longitude()),
                    source: source),
              );
            } catch (e) {}
          }
          return places;
        },
        levels: [/* list of doubles for zoom levels */ ],
        extraPercent: .1,
        stopClusteringZoom: .6
  ) 
```

## API Reference
Check out the docs for API Reference over [here](https://pub.dev/documentation/flutter_searchbox_ui/latest/flutter_searchbox_ui/ReactiveGoogleMap-class.html/).

## Example
TODO: ADD AN EXAMPLE --> SEARCHBOX WITH REACTIVEMAP