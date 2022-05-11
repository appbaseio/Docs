---
title: 'Search UI Builder'
meta_title: 'NoCode UI Builder For Search'
meta_description: 'Visually build a search UI with no-code. Build e-commerce search, site search and geo search UIs, export to your platform of choice - Shopify, Webflow, Wordpress, Wix and more.'
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


[Appbase.io](http://appbase.io)'s **UI Builder** is a built-in visual search UI builder that gives developers and business teams the freedom to configure search layout, relevance and styling instantly with no-code. It also comes with an inline code editor and a live preview to modify the configuration presets with React code. This WYSIWYG storefront search preview can be easily integrated with your favorite E-Commerce platform or site.

You can watch this 5-mins video to follow along the process of creating a storefront search and installing into a Shopify store.

[![Watch 5-min video for Shopify](https://i.imgur.com/VMW4pIw.jpg)](https://www.youtube.com/watch?v=5pdcNUha2iA)

> Note: **UI Builder** feature is available with appbase.io Production and Enterprise plans.


### E-Commerce Platform

![Choose Platform](https://imgur.com/DWhvlhp.png)

You can choose the `E-Commerce Platform` for which you are building the search UI for. The Shopify option comes with presets specific to Shopify's schema. You can also import data from a Shopify store into appbase.io via the `Develop > Import` tab. However, you can use UI Builder to build a site search for other platforms such as Magento, Wordpress, Webflow, Wix and it can even be integrated into your own site.

![Store Info](https://imgur.com/l96LvJU.png)

Next, in the `Store info` tab, you can set the default currency for your store.

### Importing Data

appbase.io natively supports indexing data from a Shopify store via our dashboard.

<br/>
<img src="https://i.imgur.com/Bm1AmXj.png" alt="Support for sync preferences" width="500"/>

You can read more about the different preferences and how it works over [here](/docs/data/import/from-shopify/).

### Layout and Design

The options in the `Layout and Design` tab will let you style and create a design for your search results and search results page.

#### Search Layout

![Search Layout](https://i.imgur.com/UWplgup.png)

Starting with the **Search Layout** tab, you can select a theme for deciding the baseline look for your search page. You can select from:
1. `Classic` theme has clearly defined boxes for filters and facets making it a great fit for multi-category stores,
2. `Minimal` theme is a minimalistic version of classic,
3. `Geo` theme provides the building blocks for creating a geo search UI.

---

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
#### Filters

![Filters](https://imgur.com/5AxRfYG.png)

In the `Filters` tab, you can set the filters that should appear as facets in the storefront search.

![Adding a custom filter](https://imgur.com/UXwKxmh.png)

You can also add custom filters in this view. Click on the **Add Filter** button. In the **Data Field** dropdown, select one of the fields from your index. Give it a title and save. The filter options will be populated by data present in the attributes.

You can add filters for either:
1. **List** (good for text data that needs to be shown as facets),
2. **Range** (good for displaying price or other numeric information as facets), or 
3. **Date** (good for displaying date information)

---

#### Results

![Results Tab](https://imgur.com/39icKEZ.png)

The `Results` tab gives you control over the search UI for your store. It supports the following options:

- Enable or Disable **Popular Suggestions** along with the search dropdown,
- Show **Active Filters** on top of the search results page,
- **Show Results as** allows choosing whether to show the results in grid or list or map view,
- Enable **Results View Switcher** to allow end users to pick between grid and list view in the search UI,
- When using the Geo layout, you can choose between using GoogleMap or OpenStreetMap for your search UI,
- Toggle **Infinite Scroll** or **Pagination** on your search result pages,
- Set sort options picker to allow your end-users to sort search results by,
- Show highlighting of matching content in the search results with **Enable results highlighting**,
- Select what fields appear on the Product Cards in the search results. You will be able to set data for **Product Title**, **Product Description**, **Product Price**, **Product Image**, and **Redirect URL**.

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

![Edit code inline](https://i.imgur.com/Qc0R5V7.png)

Starting January 2022, you can edit your saved search configuration inline in a codesandbox.io editor.

Codesandbox provides a live preview of the current code - starting with the code generated by the UI Builder search configuration. You can fork this sandbox and persist your changes by updating its ID. When you open your Search UI inline editor next time, you will start off from the saved state.

Codesandbox also supports a direct integration with Github as well as code deployment with Netlify and Vercel, making it a perfect place to edit your code changes.


### Export Code to Shopify

![Export code](https://imgur.com/v3Pv4gz.png)

Once you are satisfied with the changes you've made, you can export the code to your Shopify store. Click on the bottom-left button to begin.

![Set API Credentials](https://i.imgur.com/xg7t1Zq.png)

You can set the **API Credentials** - they will be used by the exported code to query your appbase.io index.

![installation snippet](https://i.imgur.com/SWhRnSr.png)

You can follow the **Installation Instructions** for the exact steps to install this snippet into your Shopify (or Shopify Plus) store.

Once installed, you can head to the store and see the appbase.io generated search interface as your default search.

![Final Result - Grid View](https://i.imgur.com/BL268nd.png)
**Image:** Search interface in grid view

![Final Result](https://i.imgur.com/v8kQhVi.png)
**Image:** Search interface in list view


### Export Code to other Platforms

While we offer a first-class support for Shopify, one can export the generated storefront search code to any other platform of choice, such as Magento, Wordpress, Webflow, Wix. You can also install into a site.

In the Export Mode, select the export mode.

![UI%20Integrations%20Documentation%203dae67e206ec4b00826e3673675775af/common-1%201.png](https://i.imgur.com/R2UEryc.png)

**Embed Mode** offers the most convenient way to install the snippet.

**Hackable Mode** on the other hand exports the underlying source code in a way that makes it easy to extend the project further.
