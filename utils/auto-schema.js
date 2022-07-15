const fs = require("fs");
const https = require("https");


/**
 * BUILD_CONFIG will store configuration regarding the building of the
 * schema pages.
 * 
 * Any engine changed (disabled/enabled) should be done here as well as
 * path changes, name changes etc.
 * 
 * An object in the following array can have the following fields:
 * 
 * - engine: The engine for which the reference should be generated.
 * This should be the string that is used to filter the properties.
 * - path: The path to the file where the final markdown content should be written. 
 * - mdPrefix: markdown prefix to be added before the generated schema. (defaults to empty string)
 * - enabled: Whether or not the engine is enabled.
 */
BUILD_CONFIG = [
    {
        engine: "all",
        path: "./content/docs/search/reactivesearch-api/reference/index.md",
        mdPrefix: "---\ntitle: \'API Reference\'\nmeta_title: \'ReactiveSearch API Reference\'\nmeta_description: \'ReactiveSearch API Reference. Learn about all the props and how to use them.\'\nkeywords:\n    - concepts\n    - appbase\n    - elasticsearch\n    - reactivesearch\nsidebar: \'docs\'\n---\n\nThis guide helps you to learn more about the each property of `ReactiveSearch` API and explains that how to use those properties to build the query for different use-cases.\n\n`ReactiveSearch API` request body can be divided into two parts, `query` and `settings`. The `query` key is an `Array` of objects where each object represents a `ReactiveSearch` query to retrieve the results. Settings(`settings`) is an optional key which can be used to control the search experience. Here is an example of the request body of `ReactiveSearch` API to get the results for which the `title` field matches with `iphone`.\n\n```js\n{\n    query: [{\n        id: \"phone-search\",\n        dataField: \"title\",\n        size: 10,\n        value: \"iphone\"\n    }],\n    settings: { // optional\n        recordAnalytics: true, // to enable the analytics\n        enableQueryRules: true, // to enable the query rules\n    }\n}\n```",
        enabled: true
    },
    {
        engine: "elasticsearch",
        path: "./context/docs/search/reactivesearch-api/elasticsearch.md",
        enabled: false
    }
]

function parseRSReference() {
	/**
	 * Parse the RS schema json and build a reference.md file
	 * out of it.
	 * 
	 * Schema for RS will be used from: https://github.com/appbaseio/reactivesearch-api/blob/feat/dev/schema/latest/schema.json
	 */
	rsSchemaURL = "https://raw.githubusercontent.com/appbaseio/reactivesearch-api/feat/rs-api-schema/schema/latest/schema.json"

	// Fetch the JSON
    https.get(rsSchemaURL,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                
                // Finally, we can parse the markdown
                //
                // Parse the top level properties first.
                // We will keep writing as we parse the values.

                BUILD_CONFIG.forEach(value => {
                    if (!value.enabled) return

                    if (value.path == undefined) {
                        console.error("`path` cannot be empty or invalid: ", value.path)
                        return
                    }

                    if (value.engine == undefined || value.engine == "") {
                        value.engine = "all"
                    }

                    if (value.mdPrefix == undefined) {
                        value.mdPrefix = ""
                    }

                    var originalString = `${value.mdPrefix}\n\n`

                    var markdownStr = parsePropertiesFromLevel(json, 1, originalString, null, value.engine, json.required)

                    fs.writeFile(value.path, markdownStr, err => {
                        if (err) {console.log(err)}
                    })
                })

                
            } catch (error) {
                console.error(error.message, error.stack);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message, error.stack);
    });
}

function parsePropertiesFromLevel(propertyContainer, level, markdownStr, key, engine, previousReqProps) {
    var preservedOrder = propertyContainer.preservedOrder
    var properties = propertyContainer.properties
    var enginesSupported = propertyContainer.engine
    var requiredProps = propertyContainer.required

    // Set the previous required props to empty if it's undefined
    if (previousReqProps == undefined || previousReqProps == null) {
        previousReqProps = []
    }

    // Determine whether or not filter should be applied based on engine.
    //
    // If the `engine` flag is passed as something other than `all`, it will be
    // considered a filterable value.
    //
    // Moreover, another check is added to make sure that the engine field of the current
    // property is present and not of length 0.
    const shouldFilterOnEngine = engine != "all" && (enginesSupported != undefined && enginesSupported.length != 0)

    if (properties == undefined && propertyContainer.items != undefined) {
        properties = propertyContainer.items.properties
        preservedOrder = propertyContainer.items.preservedOrder
        requiredProps = propertyContainer.items.required
    }

    if (requiredProps == undefined) {
        requiredProps = []
    }

    // If engine is supposed to be checked, check it and return if it's not
    // supported.
    if (shouldFilterOnEngine && !enginesSupported.includes(engine)) {
        return markdownStr
    }

    const nextLevel = level + 1

    // Add the title in the markdownStr
    var propTitle = propertyContainer["title"]

    if (propTitle == undefined && key != undefined) {
        propTitle = key
    }

    if (propTitle != undefined) {
        var isRequired = false

        // Handle `required` mark as well.
        if (previousReqProps.includes(key)) {
            isRequired = true
        }

        markdownStr += `${"#".repeat(level)} ${propTitle} ${isRequired ? " *required": ""}\n\n`

        // Handle engine support and show it properly
        markdownStr += "**Supported Engines**\n"
        markdownStr += `${ enginesSupported != undefined ? enginesSupported.join(", ") : "Not dependent on engine, works for all."}\n\n`

        // Else, parse the property fields accordingly.
        var propMarkdownDesc = propertyContainer["markdownDescription"]

        if (propMarkdownDesc != undefined) {
            markdownStr += propMarkdownDesc + "\n\n"
        }

        var playgroundURL = propertyContainer["playgroundURL"]
        if (playgroundURL != undefined) {
            markdownStr += "**Try out an example in ReactiveSearch Playground**\n"
            markdownStr += `<iframe src="${playgroundURL}"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>\n\n`
        }
    }

    // If properties is present for the container, recurse into that level
    // else ignore.

    if (properties != undefined && preservedOrder != undefined) {
        // If `properties` is present, preservedOrder should be present
        // as well.

        // We will just iterate it in order and extract using recursion.
        preservedOrder.forEach((preservedKey) => {
            markdownStr = parsePropertiesFromLevel(properties[preservedKey], nextLevel, markdownStr, preservedKey, engine, requiredProps)
        })
    }

    return markdownStr
}


parseRSReference()