const fs = require("fs");
const https = require("https");


/**
 * BUILD_CONFIG will store configuration regarding the building of the
 * schema pages.
 * 
 * Any engine changed (disabled/enabled) should be done here as well as
 * path changes, name changes etc.
 */
BUILD_CONFIG = [
    {
        engine: "all",
        path: "./content/docs/search/reactivesearch-api/reference/index.md",
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
                var markdownStr = parsePropertiesFromLevel(json, 1, "")

                fs.writeFile("sample.md", markdownStr, err => {
                    if (err) {console.log(err)}
                })
            } catch (error) {
                console.error(error.message, error.stack);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message, error.stack);
    });
}

function parsePropertiesFromLevel(propertyContainer, level, markdownStr, key) {
    var preservedOrder = propertyContainer.preservedOrder
    var properties = propertyContainer.properties

    if (properties == undefined && propertyContainer.items != undefined) {
        properties = propertyContainer.items.properties
        preservedOrder = propertyContainer.items.preservedOrder
    }

    const nextLevel = level + 1

    // Add the title in the markdownStr
    var propTitle = propertyContainer["title"]

    if (propTitle == undefined && key != undefined) {
        propTitle = key
    }

    if (propTitle != undefined) {
        markdownStr += `${"#".repeat(level + 1)} ${propTitle}\n\n`

        // Else, parse the property fields accordingly.
        var propMarkdownDesc = propertyContainer["markdownDescription"]

        if (propMarkdownDesc != undefined) {
            markdownStr += propMarkdownDesc + "\n\n"
        }

        // TODO: Handle engine support
        // TODO: Handle `required` mark as well.
    }

    // If properties is present for the container, recurse into that level
    // else ignore.

    if (properties != undefined && preservedOrder != undefined) {
        // If `properties` is present, preservedOrder should be present
        // as well.

        // We will just iterate it in order and extract using recursion.
        preservedOrder.forEach((preservedKey) => {
            markdownStr = parsePropertiesFromLevel(properties[preservedKey], nextLevel, markdownStr, preservedKey)
        })
    }

    return markdownStr
}


parseRSReference()