# DABT Recertification CE Credit Calculator

An interactive calculator for ABT Diplomates to track Continuing Education (CE) credits toward their 5-year recertification requirement.

## Overview

The American Board of Toxicology (ABT) requires Diplomates to earn **100 CE credits over a 5-year recertification cycle** (average 20/year, minimum 10/year). Credits must come from **at least 2 of the 3 categories** each year.

This calculator helps you plan and track your credits across all three categories with real-time validation and cap enforcement.

## Features

- **27 activities** across 3 CE categories with accurate credit values per the ABT Recertification Manual
- **Configurable cycle start year** — maps Year 1–5 to your actual recertification calendar years
- **Automatic cap enforcement** — per-event (e.g., 5 credits/class), per-year (e.g., 3/yr for private study), and per-cycle (e.g., 16/cycle for ABT Lit Review)
- **Half-day / Full-day toggle** for professional meeting attendance (2 vs 4 credits)
- **Color-coded progress bar** — red < 50, yellow 50–79, green ≥ 80
- **Category diversity warnings** — alerts when < 2 categories are used in a year
- **Per-year mini-bars** with 10-credit minimum indicator
- **Free-text description field** — note conference names, hosts, or other details
- **Month picker** — constrained to the selected calendar year to prevent mismatches
- **CSV export** — download your full activity ledger with summary totals

## CE Categories

| Category | Description | Example Activities |
|----------|-------------|-------------------|
| 1 | Continuing Education | Graduate coursework, CE courses, webinars, presentations, private study |
| 2 | Professional Meeting Attendance | Toxicology society meetings, workshops, conferences |
| 3 | Professional Development | Peer review, publications, editorial roles, elected positions, volunteering |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Drfiya/ABT-recert.git
cd ABT-recert

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Use

1. **Set your cycle start year** using the "Cycle starts" dropdown in the header
2. **Select a year tab** (mapped to your calendar year)
3. **Choose a category** → **choose an activity** → **enter quantity**
4. Optionally add a **description** and **month**
5. Review the credit preview (caps are applied automatically)
6. Click **"+ Add to Ledger"**
7. Monitor your progress in the sidebar — total credits, per-category breakdown, per-year bars
8. **Export CSV** to download your complete activity log

## Tech Stack

- [React 18](https://react.dev/) — UI framework
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first styling
- [Vite 5](https://vitejs.dev/) — Build tool and dev server

## Data Source

Credit values and caps are based on the **ABT Recertification Manual (2023 edition)**, using the "Credits beginning 1/1/2017" column.

## License

MIT
