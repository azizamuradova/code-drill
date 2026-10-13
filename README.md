# CodeDrill — UI design prototype

Static HTML/CSS prototype for a CodingBat-style practice site. It's only meant as a visual reference for building the real React frontend. The data is hard-coded and the interactions are faked.

Open `index.html` in a browser; every page links to the others.

| Page | File | What it shows |
|---|---|---|
| Home | `index.html` | Hero, "continue where you left off", topic preview, features |
| Problem categories | `categories.html` | All categories grouped by level, filters, progress per category |
| Category (problem list) | `category.html` | Sidebar of categories + problem list with solved/attempted state |
| Problem | `problem.html` | Split view: statement/examples/hint on the left, code editor + test results table on the right. **Run** shows a partial fail and **Submit** shows all tests passing. |
| Dashboard | `dashboard.html` | Profile + level/XP, stat tiles, activity heatmap, difficulty donut, category progress, plus **History** and **Achievements** tabs |
| New problem | `new-problem.html` | 4-step form (basics, description, code, test cases) with live learner preview and checklist |

## Design system

Everything lives in `assets/styles.css`:

- **Tokens**: colors, radii and shadows are CSS variables on `:root`. Dark mode overrides them (it follows the OS setting, and the moon button toggles it).
- **Fonts**: Inter (UI) and JetBrains Mono (code, method names).
- **Components**: `.btn` (`-primary`, `-success`, `-ghost`, `-sm`, `-lg`), `.card`, `.badge` (`easy`/`medium`/`hard`/`accent`), `.progress`, `.tabs`, `.segmented`, `.table`, `.input`/`.select`/`.textarea`, `.status` (`ok`/`fail`/`partial`), `.check`, `.achv`.
- **Breakpoints**: 1024px (columns stack), 720px (phone: hamburger nav, single column).

## Suggested React component split

`Header`, `CategoryCard`, `ProblemListItem`, `DifficultyBadge`, `ProgressBar`, `CodeEditor` (swap the textarea for Monaco or CodeMirror), `TestResultsTable`, `StatCard`, `ActivityHeatmap`, `AchievementCard`, `TestCaseRow`.

`assets/app.js` only exists for the prototype (theme toggle, tabs, editor line numbers). Replace it with React state.
