---
title: 'SEO Checklist'
meta_title: 'Search Engine Optimization'
meta_description: 'Search Engine Optimization'
keywords:
    - reactivesearch
    - seo
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

SEO means Search Engine Optimization and is the process used to optimize a website's technical configuration, content relevance and link popularity so its pages can become easily findable, more relevant and popular towards user search queries, and as a consequence, search engines rank them better.

For your website to appear in a search engine’s results, the search engine needs to be able to discover, crawl, parse, and render the key pages of your site.

When building your search experience with client-side JavaScript, you may worry that search engines can’t crawl or render your URLs and that this may hurt your ranking. While some search engines are getting better at processing sites with client-side JavaScript search, you can also do a lot to optimize your website for search engines without sacrificing the user experience.

## Your search result pages are directly accessible through a URL

As users interact with your search interface, the URL should dynamically update and reflect the refinements they’ve selected and their actions.

This allows them to share links to your website, enhancing the overall usability of your search and encouraging [backlinking](https://wikipedia.org/wiki/Backlink).

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/SearchBox?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="searchbox"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   
Try opening the code sandbox in a new tab and see how the URLs are changing with every significant search interaction.

The approach clearly improves the user experience, but there are concerns or well-spread myths about dynamic URLs that require busting.

[_#1 Myth: "Dynamic URLs cannot be crawled."_](https://developers.google.com/search/blog/2008/09/dynamic-urls-vs-static-urls#myth:-dynamic-urls-cannot-be-crawled)

[_#2 Myth: "Dynamic URLs are okay if you use fewer than three parameters."_](https://developers.google.com/search/blog/2008/09/dynamic-urls-vs-static-urls#myth:-dynamic-urls-are-okay-if-you-use-fewer-than-three-parameters)

Having read the above references we can safely conclude that Dynamic URLs don't necessarily hurt your SEO and should be favored.

Your widgets use crawlable a tags with href attributes

Search Engines can follow your links only if they use proper `<a>` tags with resolvable URLs.

✅ Dos:

`<a href="https://example.com">`

`<a href="/relative/path/file">`

Note that links are also crawlable when you use JavaScript to insert them into a page dynamically as long as it uses the markup shown above.

🚫 Don'ts:

`<a routerLink="some/path">`

`<span href="https://example.com">`

`<a onclick="goto('https://example.com')">`

> This is relevant when you have opted to use custom markup.

## Your URLs are readable

A site's URL structure should be as simple as possible. Consider organizing your content so that URLs are constructed logically and in a manner that is most intelligible to humans.

![Urls should be readable](https://neilpatel.com/wp-content/uploads/2017/08/image6-1.png)

For every ReactiveSearch component/ widget, the basic routing configuration injects every search refinement into the URL as a [query string](https://en.wikipedia.org/wiki/Query_string) parameter. These parameters are inferred from the global search state.

```html
https://fwmwo.csb.app/?BookName=Paradise

// The below information is saved legibly in the URL params above
// componentId = 'BookName'
// component's value = 'Paradise'

// you can visit the above mentioned app to see how the URls are handled out of the box
```

✅ Dos

- Simple, descriptive words in the URL

	`https://en.wikipedia.org/wiki/Aviation`

- Localized words in the URL, if applicable.

	`https://www.example.com/lebensmittel/pfefferminz`

- Use UTF-8 encoding as necessary. For example, the following example uses UTF-8 encoding for Arabic characters in the URL:

	`https://www.example.com/%D9%86%D8%B9%D9%86%D8%A7%D8%B9/%D8%A8%D9%82%D8%A7%D9%84%D8%A9`

🚫 Don'ts

- Using non-ASCII characters in the URL:

	`https://www.example.com/نعناع , https://www.example.com/杂货/薄荷 , etc.`

- Unreadable, long ID numbers in the URL:

	`https://www.example.com/index.php?id_sezione=360&sid=3a5ebc944f41daa6f849f730f1`


Although ReactiveSearch by default uses on query-strings for the Search UIs, but also provides support for customisation to switch to path based routing.

ReactiveBase supports two props to allow users control how the URL of the search UI behaves.

- getSearchParams

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables you to customize the evaluation of query-params-string from the url (or) any other source. If this function is not set, the library will use `window.location.search` as the search query-params-string for parsing selected-values. This can come handy if the URL is using hash values.

- setSearchParams

| Type | Optional |
|------|----------|
|  `Function` |   Yes   |

Enables you to customize setting of the query params string in the url by providing the updated query-params-string as the function parameter. If this function is not set, the library will set the `window.history` via `pushState` method.

In our example attached below,

We leverage `setSearchParams` to receive a URL decorated with query params and manipulate the query params to generate a human-friendly route, finally applying it using [`window.history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) method.

```js
setSearchParams = (urlWithQueryParams) => {
  // build URL with category and sub-category path
  window.history.pushState({ path: urlWithPath }, '', urlWithPath);
}
```

On the other hand `getSearchParams` callback is used to parse the path based URL and turn into library supported URL with query params.

```js
getSearchParams = () => {
  // extract query params from the path
  // path $host/Best%20%Buy/Mobile?color=red&page=2
  // Extract query params: category=Best%2-Buy&sub-category=Mobile&color=red&page=2
  return newURLwithAllParams
}
```

Voila 🎊 Try selecting the category and the subcategory in the example to see the route's path changing.

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/PathBasedRouting?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="path-based-routing"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


## Your URLs reflect the structure of your website

Some search engines use your [URL structure](https://en.wikipedia.org/wiki/Query_string) to infer the architecture of your website, understand the context of a page, and enhance its relevance to a particular search query.



Well-structured URLs offer users a quick hint about the page topic and how the page fits within the website.

<img src="https://neilpatel.com/wp-content/uploads/2017/08/image5.png" style="margin: auto;"/>

For example, if a website has categories and sub-categories, each category should be reachable through `https://mywebsite.com/<category>/` and each sub-category through `https://mywebsite.com/<category>/<sub-category>`.

✅ Dos

- `https://mywebsite.com/Car-Equipment/`

- `https://mywebsite.com/Women-Clothing/T-Shirts/`

🚫 Don'ts

- `https://mywebsite.com/search?category=Cars-Equipement`

- `https://mywebsite.com/search?categorylvl1=Clothing&categoryLvl2=T-shirts`


## Your robots.txt file

A robots.txt file tells search engine crawlers which URLs the crawler can access on your site. This is used mainly to avoid overloading your site with requests. [Know more](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

If you use canonical URLs and a sitemap, there is no need to change your [robots.txt](https://www.robotstxt.org/).

## You use canonical URLs to indicate primary content

A canonical URL is [the most representative page from a set of duplicate pages](https://support.google.com/webmasters/answer/139066) on your site.

When users search for "iphones” in a search engine, you want them to find https://mywebsite.com/Mobiles/Apple/ rather than:

`https://mywebsite.com/Mobiles/?query=iphone&free-shipping=true&page=4
`

Here, all three pages have similar content. As a result, you need to tell search engine bots which URL to reference as the primary page (canonical URL).

To do this, add a `rel="canonical"` link that points to the canonical URL on all possible duplicate pages. In the following example, all links need to have a `link` element pointing to the primary page.

- `https://mywebsite.com/Women-Clothing/T-Shirts/?page=42`
- `https://mywebsite.com/Women-Clothing/T-Shirts/?brand=lacoste`
- `https://mywebsite.com/Women-Clothing/T-Shirts/?query=round%20Collar`

```html
### Are mobile pages duplicates?

Yes, the mobile version of a page counts as duplicate content. Make sure your mobile pages have a canonical link in their `head`, indicating the desktop page as the primary page.

You can also reference the mobile page from the primary page with the following tag:

```html
<head>
  <!-- ... -->
  <link rel="alternate" media="only screen and (max-width: 640px)">
</head>
```

## Handling paginated content

If you’re using the `pagination` widget or the “show more” button of the `MultiList` facet, make sure that:

1. Your widget uses `<a>` tags with an href attribute,

```html
<!-- Pagination -->
<ul>
  <li><a href="https://mywebsite.com/Women-Clothing/T-Shirts/?page=1">1</a></li>
  <li><a href="https://mywebsite.com/Women-Clothing/T-Shirts/?page=2">2</a></li>
  <!-- ... -->
</ul>

<!-- "Show more" button -->
<a href="https://mywebsite.com/Women-Clothing/T-Shirts/?page=2">Show more</a>

```

2. Each page can be accessed directly through a URL.

3. Each page URL has a canonical link to its primary page.

If your pagination occurs on scroll (as is the case with the ReactiveList component when `infiniteScroll` prop is set to `true`), make sure you still provide a “show more” link that uses plain URLs.

Some search engines use the HTML `link` elements with attributes `rel="next"` and `rel="prev"` in the `<head>` of your page to infer the relationship between component URLs in a paginated series. These elements can be helpful, but they’re [not an indexing signal](https://webmasters.googleblog.com/2011/09/pagination-with-relnext-and-relprev.html) for all search engines.


## Your category URLs are referenced in a sitemap

A sitemap is an XML file that tells search engine crawlers which pages are central to your site. Having a sitemap is particularly recommended for large websites with many unrelated pages.

When deciding which pages to put in your sitemap, a good rule is to include only your canonical pages.

## Your canonical pages have unique titles and descriptions

The `title` and `description` meta tags give search engine users important insight into the content of a search result and its relevance. This information often determines which search engine result a person clicks on, so it’s crucial to use high-quality titles and descriptions in your web pages.

## Your component’s markup is semantic

ReactiveSearch components provide a default semantic markup that should cover most cases, but if you are using props to customize your UI, make sure to properly use markup according to its meaning and purpose.

For example, use heading elements (h1 to h6) for headings, paragraph elements (p) for paragraphs, list elements (ul, ol, or dl) for lists, tables (table) for data tables. Semantic markup helps search engines identify and categorize your content with minimal effort.

### Do’s and don’ts

✅ Dos

```html
<h1>foo</h1>
<p>foo bar.</p>
<p>baz scribble.</p>

```

🚫 Don'ts

```html
<p class"heading">foo</p>
foo bar.<br><br>
baz scribble.


```

## Your website is mobile-friendly

Due to the increasing number of users who browse the web on mobile, [more search engines value mobile-friendly websites](https://developers.google.com/search/mobile-sites/mobile-first-indexing) and only index content visible on a mobile device.

Therefore, your mobile and desktop sites must share the same content, structured data, title, and description meta tags.

ReactiveSearch components are mobile friendly out-of-the-box 😎🤝, if the user chooses to render custom UI then it is the responsibility of the user to handle the responsiveness of the components.

## Your site is using a pre-rendering technique

The first question is, "Why do we even need to pre-render an HTML page"?

In the CSR technique, which has come into our lives with modern browsers, websites send very little HTML response to connection requests. This HTML response contains JavaScript codes that make up the content of the page. _Unless these JavaScript codes are executed, the website is a blank page._ The browser renders these JavaScript files, creates the content, and presents the web page to us.

🚫✋🏻 But wait ✋🏻🚫, The server sends little to no HTML but a script to be executed on the client side which in turn is responsible for generating the HTML. The crawlers have got a problem with this. The crawlers primarily like HTML and don't wait to execute JS to parse the content of the page.

<img src="https://miro.medium.com/max/700/1*JOsWWcKet04OMzbirZgTeA.png" style="margin:auto;"/>

Not all search engine crawlers can process JavaScript successfully or immediately. Fortunately, there are many ways around it.

**Server-side rendering (SSR)**

<img src="https://www.datocms-assets.com/18376/1650547784-1647199989-javascript-seo-ssr-ve-csr3.png" style="margin:auto;"/>

This technique fetches your data and renders a JavaScript website on the server before sending it to the browser. This process is commonly implemented through modern frameworks such as `React`, `Angular`, and `Vue`.

**Let's help you out 🤝**

`Reactivesearch` internally runs on a redux store. With Server Side Rendering, you can handle the initial render when a user (or search engine crawler) first requests your app. To achieve the relevant results on an initial render, we need to pre-populate the redux store of ReactiveSearch.

Visit our docs [here to know more](https://docs.reactivesearch.io/docs/reactivesearch/v3/advanced/ssr/#usage).

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ssr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="ssr"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>