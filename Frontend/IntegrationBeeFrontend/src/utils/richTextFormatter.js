
import {scriptRegex} from "./regexPatterns.js";

export default function (richText) {
    //richText is a string in html format

    if(!richText){
        return ''
    }

    //allow <br> tags
    richText = richText.replaceAll("&lt;br&gt;", "<br>")


    // Remove script tags and their content
    richText = richText.replace(scriptRegex, '');

    return richText

}