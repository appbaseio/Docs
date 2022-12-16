---
title: 'Search UI Builder'
meta_title: 'NoCode UI Builder For Search'
meta_description: 'no-code UI builder for authoring search UIs with point and click. Extend with built-in cloud IDE, and deploy on the global edge on your domain in one-click.'
keywords:
    - ui-builder
    - ui-integrations
    - overview
    - storefront search builder
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'ui-builder-reactivesearch'
---

## Overview


[ReactiveSearch.io](http://reactivesearch.io)'s **UI Builder** is a built-in visual search UI builder that enables citizen developers to author search UIs with point and click, extend or export the resulting codebase. It comes with version control support and each version can be deployed on the global edge with your domain in a single click.

You can following this Arcade to see how the UI builder works.

<div style="position: relative; padding-bottom: calc(52.135416666666664% + 40px); height: 0;"><iframe src="https://demo.arcade.software/eA33UmiqidtjfcaNrhi2?embed" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<br/>

> Note: **UI Builder** feature is available for all ReactiveSearch plans.


### Pick A Template

UI builder currently comes with 6 different templates for React and 1 template for Vue.

![](https://i.imgur.com/VD3Jt05.png)

The templates are divided into three categories:

1. **Enterprise Search UIs** - Enterprise search UI templates come with end-user authentication support and also support showing analytics, charts.

2. **E-commerce Search** - E-commerce search UI templates are focused on speed and come in two flavors: a search page only faceted search template that is ideal to integrate into your e-commerce store front and a multi-page search template that comes with a home page, search page, and a detailed page view for each item which is more suited when you're publishing the entire search UI.

3. **Geo Search** - There is one geo-search template that shows how to render an OpenStreetMap / GoogleMap to show search results with faceting on a map.


### UI components

The search UI builder allows adding all the major components of the ReactiveSearch UI components.

In this interactive demo, we will show how you can add UI components with the search UI builder across multiple pages, tweak results, add end-user authentication and deploy the search UI on your own custom domain 🪄

<div style="position: relative; padding-bottom: calc(52.135416666666664% + 40px); height: 0;"><iframe src="https://demo.arcade.software/6J3liQZkPKV2PN8SydLj?embed" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### End-user Authentication

You can configure end-user authentication with Username / Password and OAuth with Google.

![](https://i.imgur.com/8vvnNzW.png)

When configuring username/password authentication, you can optionally choose to enable user sign-ups or manage your end-users with the User Management Portal from within the dashboard.

> Note: This feature is only available for Production and Enterprise plan users

You can configure end-user authentication with Enterprise providers like SAML or AD.

> Note: This feature is only available for Enterprise plan users

### Custom Domain

You can publish the search UI to your own domain. Publishing your search UI live to your domain requires you to add DNS TXT and CNAME records.

![](https://i.imgur.com/0T0Hk3a.png)

> Note: This feature is only available for Production and Enterprise plan users

### Theme

You can theme the search UI with your company logo, configure look and feel for the UI, 

#### Branding

![Branding](https://i.imgur.com/IB4m7lN.png)

The next tab is **Branding**. Here, you can set your business logo to show to your end-users.

![Preview with branding logo set](https://i.imgur.com/neExF37.png)

Once set, the logo then shows up as per the configuration on your search page. The above image shows a preview of how this works.

---

#### Style Presets


![Style Presets](https://i.imgur.com/qbb4VkJ.png)

The **Style Presets** tab lets you set the font family and color preferences for your site search / e-commerce UI.

---
#### Custom CSS

![Custom CSS](https://i.imgur.com/vN9WK9D.png)

The **Custom CSS** tab lets set your CSS to control the look and feel of the search results page on a more granular level by adding various classes. We've also given some examples that you can copy/paste in the editor. Any classes you apply will reflect instantly in the preview.

### Search Settings

In the `Search Settings` tab, you will be able to define the behavior for search, filters, and results.

#### Search

![Search Tab](https://i.imgur.com/bNi4EYS.png)

In the `Search` tab, you can configure the preferences and search settings. Here the preferences are related to suggestions and enabling of voice search and the search settings are regarding the fields to search on, field weights to apply, typo tolerance and synonyms settings. You can read more about the available options over [here](/docs/search/relevancy/#search-settings).

---

#### Facets

![Facets](https://i.imgur.com/STdnuIV.png)


In the `Facets` tab, you can configure facets, their look and feel as well as customize the queries each facet uses for the search engine backend.

![Adding a custom facet](https://i.imgur.com/1NJ0c8n.png)


You can add filters for either:
1. **List** (good for text data that needs to be shown as facets),
2. **Range** (good for displaying price or other numeric information as facets), or 
3. **Date** (good for displaying date information)

MultiList, SingleList, TagCloud, SingleDataList, RangeInput, and DateRange are the supported Facet types within the UI builder.

---

#### Charts

In the Charts tab, you can configure the charts to display. A chart can be added as a facet, where it provides filtering capabilities, or it can also be added to the main view.

![Charts](https://i.imgur.com/75hf1Jb.png)

#### Results

![Results Tab](https://i.imgur.com/2kmbBMd.png)

The `Results` tab gives you control over the results view of the search UI. It supports the following options:

- Enable or Disable **Popular Suggestions** along with the search dropdown,
- Show **Applied Filters** on top of the search results page,
- **Show Results as** allows choosing whether to show the results in grid or list or map view,
- Enable **Results View Switcher** to allow end users to pick between grid and list view in the search UI,
- When using the Geo layout, you can choose between using GoogleMap or OpenStreetMap for your search UI,
- Toggle **Infinite Scroll** or **Pagination** on your search result pages,
- Set sort options picker to allow your end-users to sort search results by,
- Show highlighting of matching content in the search results with **Enable results highlighting**,
- Select what fields appear on the Result Card or List item in the search results. You will be able to set data for **Title**, **Description**, **Numeric value** with a unit, **Image**, and **Redirection URL**. You can also add additional fields to display here.

---

#### Custom Messages

Custom Messages tab lets you customize the text and messaging that appears at various points of the search journey for E-Commerce visitors. You can customize these messages.

![Custom Messages](https://i.imgur.com/vgw0Yii.png)

- **Search Text** lets you set the placeholder message in the search box,
- You can set a custom **Search Icon**,
- **Suggestions Loading** is the message that appears in the search dropdown when relevant suggestions are being fetched,
- **No Suggestions Found** lets you set the message when no suggestions are found for a search term,
- **Result Stats** message lets you show how many results were found for the search query along with the time taken,
- **No Results Found** lets you set the message that appears on the search results page when a search query returns no results,
- **No Filter Items** lets you set the message that appears the filters that appears when there are no relevant filters to select from
- **Fetching Filter Items** lets you set the message when the filter values are being fetched.

While some of these messages are on-screen for a brief period of time, it is considered a good Ux practice to have them set up. They can be used to guide your users to finding relevant search results.

### Edit Code Inline

Starting December 2022, you can edit your saved search configuration inline in a cloud IDE.

The IDE provides a live transpilation where you can edit the code and see live results. This is ideal when you're extending the code to add your own UI components, pages, and such.

![](https://i.imgur.com/kjqlU8x.png)

The IDE changes are reflected back to the no-code panel and any changes done via no-code are also reflected into the IDE. This happens as every change you save is version controled. You can commit your changes, and each version gets deployed to its own domain.

You can also export the resulting code by first exporting it to Code.


### Export Code And Native Development

For production and enterprise plan users, we support exporting of the code functionality. You can go to the code editor first, then go to export to CodeSandbox and from there, you can download the ZIPs.

You can develop with your favorite IDE such as Visual Studio Code (VSCode) and then choose to re-import the project back to the UI builder as well.
