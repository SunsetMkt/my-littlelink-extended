import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates HTML for link sections from JSON configuration
 */
function generateLinksHTML(linksConfig) {
    let html = "";

    linksConfig.sections.forEach((section) => {
        // Add section title
        html += `                    <h2>${section.title}</h2>\n\n`;

        // Add links
        section.links.forEach((link) => {
            if (link.type === "sensitive") {
                // Handle sensitive content module
                html += `                    <!-- Sensitive Content Module -->\n`;
                html += `                    <div\n`;
                html += `                        class="slide-container"\n`;
                html += `                        data-continue-url="${link.continueUrl}"\n`;
                html += `                    >\n`;
                html += `                        <!-- Trigger Button -->\n`;
                html += `                        <a\n`;
                html += `                            class="button ${link.buttonClass}"\n`;
                html += `                            href="${link.url}"\n`;
                html += `                        >\n`;
                html += `                            <img\n`;
                html += `                                class="icon${link.iconClass ? " " + link.iconClass : ""}"\n`;
                html += `                                aria-hidden="true"\n`;
                html += `                                src="${link.icon}"\n`;
                html += `                                alt="${link.iconAlt}"\n`;
                html += `                            />\n`;
                html += `                            ${link.text}\n`;
                html += `                        </a>\n\n`;
                html += `                        <!-- The Slide-Down Panel -->\n`;
                html += `                        <div class="sensitive-panel">\n`;
                html += `                            <div class="sensitive-panel__content">\n`;
                html += `                                ${link.panelContent}\n`;
                html += `                                <!--\n`;
                html += `                                <p>\n`;
                html += `                                    This link may contain content that is not\n`;
                html += `                                    appropriate for all audiences.\n`;
                html += `                                </p>\n`;
                html += `                                <button\n`;
                html += `                                    class="button button-sensitive sensitive-continue"\n`;
                html += `                                >\n`;
                html += `                                    Continue\n`;
                html += `                                </button>\n`;
                html += `                            --></div>\n`;
                html += `                        </div>\n`;
                html += `                    </div>\n\n`;
            } else {
                // Handle regular links
                html += `                    <!-- ${link.text} -->\n`;
                html += `                    <a\n`;
                html += `                        class="button ${link.buttonClass}"\n`;
                html += `                        href="${link.url}"\n`;
                html += `                        target="_blank"\n`;
                html += `                        rel="${link.rel || "noopener"}"\n`;
                html += `                        role="button"\n`;
                html += `                        ><img\n`;
                html += `                            class="icon${link.iconClass ? " " + link.iconClass : ""}"\n`;
                html += `                            aria-hidden="true"\n`;
                html += `                            src="${link.icon}"\n`;
                html += `                            alt="${link.iconAlt}"\n`;
                html += `                        />${link.text}</a\n`;
                html += `                    >\n\n`;
            }
        });
    });

    return html.trimEnd();
}

/**
 * Main function to generate links and update index.html
 */
function buildLinks() {
    try {
        // Read links configuration
        const linksPath = path.join(__dirname, "links.json");
        const linksConfig = JSON.parse(fs.readFileSync(linksPath, "utf8"));

        // Generate HTML
        const linksHTML = generateLinksHTML(linksConfig);

        return linksHTML;
    } catch (error) {
        console.error("Error building links:", error);
        throw error;
    }
}

export { buildLinks, generateLinksHTML };
