# CashCanvas - Finance Dashboard

A responsive frontend dashboard for visualizing and managing
financial transactions, built as part of a frontend development
assessment. The goal was to demonstrate clean UI architecture,
component design, and state management in React.

## Overview

This project is a React-based single-page application (SPA). I used React Context and `localStorage` to simulate a database. This means all your additions, edits, and deletions are saved locally in your browser and persist across page reloads.

## Features

- **Role-Based Views**: You can toggle between an _Admin_ and a _Viewer_ using
  the sidebar dropdown. Admins can add, edit, or delete transactions, while
  Viewers have read-only access.
- **Data Visualization**: Uses Recharts to render out income vs. expense bar
  charts, top category donut charts, and a running balance area chart. The
  charts automatically recalculate based on the mock transaction ledger.
- **Transaction Management**: A full table view with pagination, searchable
  columns, and category filtering.
- **Insights & Analytics**: Highlights top spending category, best income month,
  savings ratio, and financial health observations derived from the transaction data.
- **CSV Export**: Admins can export the current transaction list as a `.csv` file.
- **Responsive Layout**: Works across desktop, tablet, and mobile views. The
  sidebar collapses into a hamburger menu on smaller screens.
- **Light / Dark Mode**: Fully supported theme toggling using Tailwind's dark
  mode classes.

## Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React Context API

## Set Up

Follow these steps to run the project locally.

### Prerequisites

Node.js.

### Installation

1. Clone the repository and navigate into the project folder:

```bash
git clone https://github.com/VishalValvi-83/finance-dashboard-interface.git
cd finance-dashboard-interface
```

2. Install the dependencies:

```bash
npm install
```

3. Start the Vite development server:

```bash
npm run dev
```

4. Navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Project Structure

- `src/components/`: Reusable UI elements split by feature (dashboard, insights, transactions, modals).
- `src/context/`: Contains `AppContext.jsx`, which handles the global state logic and localStorage syncing.
- `src/data/`: Contains `mockData.js`, which serves as the initial seed data for the transaction ledger.
- `src/index.css`: Contains CSS variables that define the overarching design system and themes.

## Key Design Decisions

- **No Redux**: Since the state footprint is relatively small (just a transaction array and some UI flags), I opted for the native React Context API to keep things simple and avoid unnecessary boilerplate.
- **CSS Variables for Theming**: I defined custom hex codes in `index.css` mapped to `--app-` variables. Tailwind then consumes these. This made implementing dark mode a lot easier than littering the JSX with `dark:` classes everywhere.
