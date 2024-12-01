export function cleanLatex(latex: string): string {
    // Remove leading and trailing delimiters like \[ and \]
    latex = latex.trim();
    latex = latex.replace(/^\\\[(.*?)\\\]$/s, '$1');

    // Process \displaystyle{...}: remove \displaystyle{ and matching }, but keep content inside
    latex = removeDisplayStyle(latex);

    // Remove standalone \displaystyle commands
    latex = latex.replace(/\\displaystyle/g, '');

    // Remove comments (lines starting with %)
    latex = latex.replace(/%.*$/gm, '');

    // Remove \label{...} and \ref{...}
    latex = latex.replace(/\\label\{.*?\}/g, '');
    latex = latex.replace(/\\ref\{.*?\}/g, '');

    // Return the processed LaTeX string
    return latex;
}

function removeDisplayStyle(latex: string): string {
    const pattern = /\\displaystyle\{/g;
    let match;
    while ((match = pattern.exec(latex)) !== null) {
        const startIndex = match.index;
        const braceStartIndex = startIndex + match[0].length - 1; // Position of the opening '{'

        const braceEndIndex = findMatchingBrace(latex, braceStartIndex);

        if (braceEndIndex !== -1) {
            // Extract content inside the braces
            const contentInside = latex.substring(braceStartIndex + 1, braceEndIndex);

            // Replace \displaystyle{...} including braces with contentInside
            latex = latex.slice(0, startIndex) + contentInside + latex.slice(braceEndIndex + 1);

            // Adjust the lastIndex of the pattern to continue searching correctly
            pattern.lastIndex = startIndex + contentInside.length;
        } else {
            // No matching closing brace found; exit the loop to prevent infinite loop
            break;
        }
    }
    return latex;
}

function findMatchingBrace(str: string, startIndex: number): number {
    let stack = [];
    for (let i = startIndex; i < str.length; i++) {
        if (str[i] === '{') {
            stack.push('{');
        } else if (str[i] === '}') {
            stack.pop();
            if (stack.length === 0) {
                // Found the matching closing brace
                return i;
            }
        }
    }
    // No matching closing brace found
    return -1;
}
