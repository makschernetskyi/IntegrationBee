import re

def normalize_basic(latex: str) -> str:
    # 1) Turn math‐italic "e" or \mathit{e} into plain e
    #    (also \mathrm{e} → e)
    latex = re.sub(r'\\mathit\{e\}', 'e', latex)
    latex = re.sub(r'\\mathrm\{e\}',   'e', latex)

    # 2) Replace any standalone Unicode 𝑒 (U+1D452) with ASCII e
    latex = latex.replace('𝑒', 'e')

    return latex