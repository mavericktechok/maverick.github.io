## 2026-04-14 - Interactive Brand Logos & Focus States
**Learning:** Logos should serve as a predictable home navigation mechanism. Additionally, native `:focus-visible` needs explicit definitions in many custom CSS resets or basic setups to ensure users navigating via keyboard can see what is currently focused, particularly for buttons and links.
**Action:** Always wrap top-level brand logos in `<a>` tags targeting the top of the page (`#hero` or `/`), and provide fallback `:focus-visible` outlines globally for interactive elements when establishing base styles.
## 2026-04-15 - Skip Navigation Link
**Learning:** For single-page sites with sticky navbars, adding a "Skip to main content" link at the very top of the DOM provides a massive accessibility win for keyboard and screen-reader users, allowing them to bypass repetitive navigation elements.
**Action:** Always include a visually hidden skip link (e.g. `position: absolute; top: -1000px;`) that becomes visible on `:focus` to facilitate quick navigation to the primary content section.
