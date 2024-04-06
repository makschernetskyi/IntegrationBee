
import {scriptRegex} from "./regexPatterns.js";

export default function (richText) {
    //richText is a string in html format

    //allow <br> tags
    richText = richText.replace("&lt;br&gt;", "<br>")


    // Remove script tags and their content
    richText = richText.replace(scriptRegex, '');

    return richText

}