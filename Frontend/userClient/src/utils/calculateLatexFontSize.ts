export function calculateLatexFontSize(latexString:string, baseFontSize = 16, minFontSize = 36, baselineComplexity = 50) {
    // Assign weights to elements based on visual complexity
  const complexityWeights = {
    "\\int": 2, // Integral signs
    "\\pmatrix": 5, // Matrices add significant complexity
    "\\text": 1, // Plain text
    "\\sin": 1, // Trigonometric functions
    "\\tan": 1,
    "\\left": 0.5, // Braces
    "\\right": 0.5,
    "\\cdot": 0.2, // Dots are minor
    "\\,": 0, // Spacing commands
  };

  // Calculate weighted complexity
  let complexityScore = 0;
  for (const [key, weight] of Object.entries(complexityWeights)) {
    const occurrences = (latexString.match(new RegExp(key, "g")) || []).length;
    complexityScore += occurrences * weight;
  }

  // Fallback for unweighted parts (e.g., raw text, numbers)
  const fallbackLength = latexString.replace(/\\[a-zA-Z]+/g, "").length;
  complexityScore += fallbackLength / 10;

  // Scale font size based on complexity
  const scalingFactor = Math.sqrt(baselineComplexity / Math.max(complexityScore, baselineComplexity));
  const adjustedFontSize = baseFontSize * scalingFactor;

  // Ensure the font size does not drop below the minimum
  return Math.max(adjustedFontSize, minFontSize);
  }
  