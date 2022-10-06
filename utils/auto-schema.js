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
 * - mdPrefix: path to markdown file for prefix to be added before the generated schema. (defaults to empty string)
 * - enabled: Whether or not the engine is enabled.
 */
BUILD_CONFIG = [
    {
        engine: "all",
        path: "content/docs/search/reactivesearch-api/reference/index.md",
        mdPrefix: "src/templates/markdown/reference/index.md",
        enabled: true
    },
    {
        engine: "elasticsearch",
        path: "content/docs/search/reactivesearch-api/reference/elasticsearch.md",
        mdPrefix: "src/templates/markdown/reference/elasticsearch.md",
        enabled: true
    },
    {
        engine: "mongodb",
        path: "content/docs/search/reactivesearch-api/reference/mongodb.md",
        mdPrefix: "src/templates/markdown/reference/mongodb.md",
        enabled: true
    },
    {
        engine: "solr",
        path: "content/docs/search/reactivesearch-api/reference/solr.md",
        mdPrefix: "src/templates/markdown/reference/solr.md",
        enabled: true
    },
    {
        engine: "opensearch",
        path: "content/docs/search/reactivesearch-api/reference/opensearch.md",
        mdPrefix: "src/templates/markdown/reference/opensearch.md",
        enabled: true
    },
]

PIPELINE_BUILD_CONFIG = [
    {
        enabled: true,
        path: "content/docs/pipelines/API/reference.md",
        mdPrefix: "src/templates/markdown/reference/pipelines.md"
    }
]

function parseRSReference() {
    /**
     * Parse the RS schema json and build a reference.md file
     * out of it.
     * 
     * Schema for RS will be used from: https://github.com/appbaseio/reactivesearch-api/blob/feat/dev/schema/latest/schema.json
     */
    rsSchemaURL = "https://raw.githubusercontent.com/appbaseio/reactivesearch-api/dev/schema/latest/schema.json"

    // Fetch the JSON
    https.get(rsSchemaURL, (res) => {
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

                    var originalString = ""

                    if (value.mdPrefix != undefined) {
                        // Make sure that the file exists
                        if (!fs.existsSync(value.mdPrefix)) {
                            console.error("invalid path passed for the `mdPrefix` value. Should be a valid markdown file.")
                            return
                        }

                        // Read the file content and parse it.
                        fileContent = fs.readFileSync(value.mdPrefix);
                        originalString = fileContent + "\n\n"
                    }


                    var markdownStr = parsePropertiesFromLevel(json, 1, originalString, null, value.engine, json.required)

                    fs.writeFile(value.path, markdownStr, err => {
                        if (err) { console.log(err) }
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

function parsePropertiesFromLevel(propertyContainer, level, markdownStr, key, engine, previousReqProps, isPipeline = false) {
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

    // If pipeline, then preservedOrder would not be present
    if (isPipeline && properties != undefined) {
        preservedOrder = Object.keys(properties)
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

        markdownStr += `${"#".repeat(level)} ${propTitle}\n\n`

        if (isRequired) {
            markdownStr += `**This is a required field**\n\n`
        }

        // Handle engine support and show it properly
        if (!isPipeline) {
            markdownStr += "**Supported Engines**\n"
            markdownStr += `${enginesSupported != undefined ? enginesSupported.join(", ") : "Not dependent on engine, works for all."}\n\n`
        }

        // Else, parse the property fields accordingly.
        var propMarkdownDesc = propertyContainer["markdownDescription"]

        if (propMarkdownDesc != undefined) {
            markdownStr += propMarkdownDesc + "\n\n"
        } else if (isPipeline) {
            // Try to parse the description into markdown
            var propDesc = propertyContainer["description"]
            if (propDesc != undefined) {
                markdownStr += propDesc + "\n\n"
            }
        }

        // If property has `enum`, add that in the list of supported values.
        propertyEnum = propertyContainer["enum"]
        if (propertyEnum != undefined) {
            markdownStr += "**Following values are supported for this field**\n\n"

            supportedValues = ""
            propertyEnum.forEach((value, index) => {
                propertyEnum[index] = "`" + value + "`"
            })

            markdownStr += propertyEnum.join(", ") + "\n\n"
        }

        // If engine is `all`, set it to `elasticsearch`
        if (engine == "all") engine = "elasticsearch"

        var playgroundURL = propertyContainer["playgroundURL"]
        if (playgroundURL != undefined && playgroundURL[engine] != undefined) {
            markdownStr += "**Try out an example in ReactiveSearch Playground**\n"
            markdownStr += `<iframe src="${playgroundURL[engine]}"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>\n\n`
        }
    }

    // If properties is present for the container, recurse into that level
    // else ignore.

    if (properties != undefined && preservedOrder != undefined) {
        // If `properties` is present, preservedOrder should be present
        // as well.

        // We will just iterate it in order and extract using recursion.
        preservedOrder.forEach((preservedKey) => {
            markdownStr = parsePropertiesFromLevel(properties[preservedKey], nextLevel, markdownStr, preservedKey, engine, requiredProps, isPipeline)
        })
    }

    return markdownStr
}

function parsePipelineReference() {
    /**
     * Parse the pipeline API reference jsonschema file
     * and accordingly generate an API reference markdown file that can
     * be added in the Docs.
     * 
     * Schema for RS will be used from: https://github.com/appbaseio/reactivesearch-api/blob/feat/dev/schema/latest/pipelines-schema.json
     */

    rsSchemaURL = "https://raw.githubusercontent.com/appbaseio/reactivesearch-api/dev/schema/latest/pipelines-schema.json"

    // Fetch the JSON
    https.get(rsSchemaURL, (res) => {
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

                PIPELINE_BUILD_CONFIG.forEach(value => {
                    if (!value.enabled) return

                    if (value.path == undefined) {
                        console.error("`path` cannot be empty or invalid: ", value.path)
                        return
                    }

                    var originalString = ""

                    if (value.mdPrefix != undefined) {
                        // Make sure that the file exists
                        if (!fs.existsSync(value.mdPrefix)) {
                            console.error("invalid path passed for the `mdPrefix` value. Should be a valid markdown file.")
                            return
                        }

                        // Read the file content and parse it.
                        fileContent = fs.readFileSync(value.mdPrefix);
                        originalString = fileContent + "\n\n"
                    }

                    var markdownStr = parsePropertiesFromLevel(json, 1, originalString, null, value.engine, json.required, true)

                    fs.writeFile(value.path, markdownStr, err => {
                        if (err) { console.log(err) }
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

module.exports = {
    parse: parseRSReference,
    parsePipeline: parsePipelineReference,
}
