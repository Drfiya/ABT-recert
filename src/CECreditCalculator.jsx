import { useState, useReducer, useMemo, useCallback, useEffect } from 'react';

// ─── DATA MODEL ────────────────────────────────────────────────────────────────
// Each activity: { id, name, credits, unit, capType, capValue, capLabel }
// capType: 'none' | 'perEvent' | 'perYear' | 'perCycle'

const CATEGORIES = [
    { id: 1, name: 'Continuing Education (CE)' },
    { id: 2, name: 'Professional Meeting/Conference Attendance' },
    { id: 3, name: 'Professional Development' },
];

const ACTIVITIES = [
    // ── Category 1: Continuing Education ──
    {
        id: '1-1',
        categoryId: 1,
        name: 'Graduate coursework (Master\'s/Doctorate, tox-related)',
        shortName: 'Graduate Coursework',
        credits: 5,
        unit: 'course',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '1-2',
        categoryId: 1,
        name: 'Teaching tox courses at accredited college/university',
        shortName: 'Teaching Tox Courses',
        credits: 5,
        unit: 'course',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '1-3',
        categoryId: 1,
        name: 'Attendance: formal CE courses, online CE courses, or webinars on tox topics',
        shortName: 'CE Course/Webinar Attendance',
        credits: 1,
        unit: 'hour',
        capType: 'perEvent',
        capValue: 5,
        capLabel: 'Capped at 5 credits per class',
    },
    {
        id: '1-4',
        categoryId: 1,
        name: 'Presentation of tox topics to civic organizations, high schools, etc.',
        shortName: 'Civic Tox Presentation',
        credits: 3,
        unit: 'presentation hour',
        capType: 'perEvent',
        capValue: 6,
        capLabel: 'Capped at 6 credits per presentation',
    },
    {
        id: '1-5',
        categoryId: 1,
        name: 'Presentation of tox topics at scientific meetings, CE courses, symposia, workshops, guest lectures',
        shortName: 'Scientific Meeting Presentation',
        credits: 3,
        unit: 'presentation hour',
        capType: 'perEvent',
        capValue: 6,
        capLabel: 'Capped at 6 credits per presentation',
    },
    {
        id: '1-6',
        categoryId: 1,
        name: 'Private study to expand tox knowledge',
        shortName: 'Private Study',
        credits: 1,
        unit: 'hour',
        capType: 'perYear',
        capValue: 3,
        capLabel: 'Capped at 3 credits per year',
    },
    {
        id: '1-7',
        categoryId: 1,
        name: 'ABT Literature Review questions (optional, beyond required)',
        shortName: 'ABT Lit Review',
        credits: 2,
        unit: 'article',
        capType: 'perCycle',
        capValue: 16,
        capLabel: 'Capped at 16 credits per 5-year recertification cycle',
    },

    // ── Category 2: Professional Meeting/Conference Attendance ──
    {
        id: '2-1',
        categoryId: 2,
        name: 'Attendance at toxicology professional society meetings, workshops, conferences',
        shortName: 'Meeting Attendance',
        credits: 2, // per half day; full day = 4
        unit: 'half day',
        capType: 'perYear',
        capValue: 10,
        capLabel: 'Capped at 10 credits per year',
        meetingAttendance: true, // special flag for half/full day toggle
    },

    // ── Category 3: Professional Development ──
    {
        id: '3-1',
        categoryId: 3,
        name: 'Invited peer-review of submitted journal article',
        shortName: 'Peer Review (Journal)',
        credits: 2,
        unit: 'article',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-2',
        categoryId: 3,
        name: 'Invited review of grant proposal or report',
        shortName: 'Grant/Report Review',
        credits: 2,
        unit: 'proposal/report',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-3',
        categoryId: 3,
        name: 'First/sole author — original research in peer-reviewed journal',
        shortName: 'First Author (Research)',
        credits: 4,
        unit: 'publication',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-4',
        categoryId: 3,
        name: 'Contributing author — original research in peer-reviewed journal',
        shortName: 'Contributing Author (Research)',
        credits: 2,
        unit: 'publication',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-5',
        categoryId: 3,
        name: 'First/sole author — review article or book chapter (peer-reviewed)',
        shortName: 'First Author (Review/Chapter)',
        credits: 4,
        unit: 'item',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-6',
        categoryId: 3,
        name: 'Contributing author — review article or book chapter (peer-reviewed)',
        shortName: 'Contributing Author (Review/Chapter)',
        credits: 2,
        unit: 'item',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-7',
        categoryId: 3,
        name: 'Editor-in-Chief, Editor, or Associate Editor of peer-reviewed journal/book/textbook',
        shortName: 'Editor (Journal/Book)',
        credits: 10,
        unit: 'year',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-8',
        categoryId: 3,
        name: 'Serving on peer-reviewed journal Editorial Board or as Editorial Advisor',
        shortName: 'Editorial Board Member',
        credits: 3,
        unit: 'year',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-9',
        categoryId: 3,
        name: 'First/sole author — poster at professional meeting',
        shortName: 'First Author (Poster)',
        credits: 3,
        unit: 'poster',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-10',
        categoryId: 3,
        name: 'Contributing author — poster at professional meeting',
        shortName: 'Contributing Author (Poster)',
        credits: 1,
        unit: 'poster',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-11',
        categoryId: 3,
        name: 'Elected position: national/international tox society',
        shortName: 'Elected (National/Intl)',
        credits: 5,
        unit: 'year',
        capType: 'perYear',
        capValue: null, // enforced via "one service claim per org per year" — handled by note
        capLabel: 'One service claim per organization per year',
        serviceRole: true,
    },
    {
        id: '3-12',
        categoryId: 3,
        name: 'Elected position: regional/local tox society',
        shortName: 'Elected (Regional/Local)',
        credits: 3,
        unit: 'year',
        capType: 'perYear',
        capValue: null,
        capLabel: 'One service claim per organization per year',
        serviceRole: true,
    },
    {
        id: '3-13',
        categoryId: 3,
        name: 'Elected position: specialty section of tox-related org',
        shortName: 'Elected (Specialty Section)',
        credits: 3,
        unit: 'year',
        capType: 'perYear',
        capValue: null,
        capLabel: 'One service claim per organization per year',
        serviceRole: true,
    },
    {
        id: '3-14',
        categoryId: 3,
        name: 'Appointed committee member of professional tox org',
        shortName: 'Appointed Committee Member',
        credits: 2,
        unit: 'year',
        capType: 'perYear',
        capValue: null,
        capLabel: 'One service claim per organization per year',
        serviceRole: true,
    },
    {
        id: '3-15',
        categoryId: 3,
        name: 'Service on national/international tox committees, workgroups, taskforces',
        shortName: 'Tox Committee Service',
        credits: 3,
        unit: 'year',
        capType: 'perYear',
        capValue: null,
        capLabel: 'One service claim per organization per year',
        serviceRole: true,
    },
    {
        id: '3-16',
        categoryId: 3,
        name: 'Full/Associate membership in professional scientific society (national level)',
        shortName: 'Society Membership',
        credits: 1,
        unit: 'society per year',
        capType: 'none',
        capValue: null,
        capLabel: null,
    },
    {
        id: '3-17',
        categoryId: 3,
        name: 'Volunteer/educate toxicology topics (K-12, non-tox orgs, public outreach)',
        shortName: 'Volunteer/Outreach',
        credits: 1,
        unit: 'hour',
        capType: 'perYear',
        capValue: 5,
        capLabel: 'Capped at 5 credits per year',
    },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────

const STORAGE_KEY_ENTRIES = 'dabt-recert-entries';
const STORAGE_KEY_CYCLE_START = 'dabt-recert-cycle-start';

/** Load saved entries from localStorage, or return an empty array. */
function loadSavedEntries() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_ENTRIES);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/** Load saved cycle start year, or return current year. */
function loadCycleStartYear() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_CYCLE_START);
        return raw ? Number(raw) : new Date().getFullYear();
    } catch {
        return new Date().getFullYear();
    }
}

let entryIdCounter = 0;

/**
 * Compute credits for a single entry, applying per-event caps.
 * Returns { credits, capNote } where capNote explains any cap applied.
 */
function computeEntryCredits(activity, quantity, isFullDay) {
    const effectiveCreditsPerUnit = activity.meetingAttendance && isFullDay
        ? 4
        : activity.credits;

    let raw = effectiveCreditsPerUnit * quantity;
    let capNote = null;

    // Per-event cap: clamp the single entry's credits
    if (activity.capType === 'perEvent' && activity.capValue != null) {
        if (raw > activity.capValue) {
            raw = activity.capValue;
            capNote = activity.capLabel;
        }
    }

    return { credits: raw, capNote };
}

/**
 * Given existing entries, compute remaining budget for per-year and per-cycle caps.
 * Returns { allowed, warning } — `allowed` is how many more credits can be added.
 */
function getRemainingBudget(activity, year, entries) {
    if (activity.capType === 'perYear' && activity.capValue != null) {
        const usedThisYear = entries
            .filter((e) => e.year === year && e.activityId === activity.id)
            .reduce((sum, e) => sum + e.credits, 0);
        const remaining = Math.max(0, activity.capValue - usedThisYear);
        const warning =
            remaining === 0
                ? `Year ${year} cap of ${activity.capValue} reached for ${activity.shortName}`
                : remaining <= activity.credits
                    ? `Only ${remaining} credit(s) remaining this year for ${activity.shortName}`
                    : null;
        return { remaining, warning };
    }

    if (activity.capType === 'perCycle' && activity.capValue != null) {
        const usedTotal = entries
            .filter((e) => e.activityId === activity.id)
            .reduce((sum, e) => sum + e.credits, 0);
        const remaining = Math.max(0, activity.capValue - usedTotal);
        const warning =
            remaining === 0
                ? `Cycle cap of ${activity.capValue} reached for ${activity.shortName}`
                : remaining <= activity.credits * 2
                    ? `Only ${remaining} credit(s) remaining this cycle for ${activity.shortName}`
                    : null;
        return { remaining, warning };
    }

    return { remaining: Infinity, warning: null };
}

/**
 * Clamp credits to per-year or per-cycle remaining budget.
 */
function applyBudgetCap(credits, activity, year, entries) {
    const { remaining } = getRemainingBudget(activity, year, entries);
    if (remaining === Infinity) return { credits, capNote: null };

    if (credits > remaining) {
        return {
            credits: remaining,
            capNote: activity.capLabel,
        };
    }
    return { credits, capNote: null };
}

// ─── REDUCER ───────────────────────────────────────────────────────────────────

function entriesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.entry];
        case 'DELETE':
            return state.filter((e) => e.id !== action.id);
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

// ─── SMALL UI COMPONENTS ───────────────────────────────────────────────────────

function ProgressBar({ value, max, label }) {
    const pct = Math.min(100, (value / max) * 100);
    const barColor =
        value >= 80 ? 'bg-green-500' : value >= 50 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div>
            <div className="flex justify-between text-sm font-medium mb-1">
                <span>{label}</span>
                <span>
                    {value} / {max}
                </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

function YearMiniBar({ year, label, credits }) {
    const meetsMin = credits >= 10;
    const pct = Math.min(100, (credits / 20) * 100);
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600 w-16 truncate" title={label}>{label}</span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${meetsMin ? 'bg-abt-green' : 'bg-red-400'
                        }`}
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className={`text-xs font-semibold w-8 text-right ${meetsMin ? 'text-abt-green' : 'text-red-500'}`}>
                {credits}
            </span>
            {!meetsMin && credits > 0 && (
                <span className="text-[10px] text-red-500 font-medium">Min 10</span>
            )}
        </div>
    );
}

function CategoryBadge({ categoryId }) {
    const colors = {
        1: 'bg-blue-100 text-blue-800',
        2: 'bg-emerald-100 text-emerald-800',
        3: 'bg-purple-100 text-purple-800',
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${colors[categoryId]}`}>
            Cat {categoryId}
        </span>
    );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function CECreditCalculator() {
    // ── Form state ──
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedActivityId, setSelectedActivityId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isFullDay, setIsFullDay] = useState(false);
    const [description, setDescription] = useState('');
    const [activityMonth, setActivityMonth] = useState('');
    const [cycleStartYear, setCycleStartYear] = useState(loadCycleStartYear);

    // Calendar year for the currently selected year tab
    const calendarYear = cycleStartYear + selectedYear - 1;
    const yearLabel = (y) => `${cycleStartYear + y - 1}`;

    // ── Entries (ledger) — initialized from localStorage ──
    const [entries, dispatch] = useReducer(entriesReducer, null, () => {
        const saved = loadSavedEntries();
        // Resume ID counter so new entries don't collide with saved ones
        if (saved.length > 0) {
            entryIdCounter = Math.max(...saved.map((e) => e.id));
        }
        return saved;
    });

    // ── Persist entries and cycleStartYear to localStorage ──
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(entries));
    }, [entries]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_CYCLE_START, String(cycleStartYear));
    }, [cycleStartYear]);

    // ── Derived data ──
    const filteredActivities = useMemo(
        () =>
            selectedCategoryId
                ? ACTIVITIES.filter((a) => a.categoryId === Number(selectedCategoryId))
                : [],
        [selectedCategoryId]
    );

    const selectedActivity = useMemo(
        () => ACTIVITIES.find((a) => a.id === selectedActivityId) || null,
        [selectedActivityId]
    );

    // Preview of credits before adding
    const preview = useMemo(() => {
        if (!selectedActivity || !quantity || Number(quantity) <= 0) {
            return { credits: 0, capNote: null, budgetWarning: null };
        }
        const qty = Number(quantity);
        let { credits, capNote } = computeEntryCredits(selectedActivity, qty, isFullDay);

        // Apply budget caps
        const budget = applyBudgetCap(credits, selectedActivity, selectedYear, entries);
        const budgetWarning = getRemainingBudget(selectedActivity, selectedYear, entries).warning;

        return {
            credits: budget.credits,
            capNote: capNote || budget.capNote,
            budgetWarning,
        };
    }, [selectedActivity, quantity, isFullDay, selectedYear, entries]);

    // ── Summaries ──
    const totalCredits = useMemo(
        () => entries.reduce((sum, e) => sum + e.credits, 0),
        [entries]
    );

    const creditsByCategory = useMemo(() => {
        const result = { 1: 0, 2: 0, 3: 0 };
        entries.forEach((e) => {
            result[e.categoryId] = (result[e.categoryId] || 0) + e.credits;
        });
        return result;
    }, [entries]);

    const creditsByYear = useMemo(() => {
        const result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        entries.forEach((e) => {
            result[e.year] = (result[e.year] || 0) + e.credits;
        });
        return result;
    }, [entries]);

    const categoriesByYear = useMemo(() => {
        const result = {};
        for (let y = 1; y <= 5; y++) {
            const cats = new Set(entries.filter((e) => e.year === y).map((e) => e.categoryId));
            result[y] = cats.size;
        }
        return result;
    }, [entries]);

    const yearEntries = useMemo(
        () => entries.filter((e) => e.year === selectedYear),
        [entries, selectedYear]
    );

    // ── Handlers ──
    const handleCategoryChange = useCallback((e) => {
        setSelectedCategoryId(e.target.value);
        setSelectedActivityId('');
        setQuantity('');
        setIsFullDay(false);
        setDescription('');
        setActivityMonth('');
    }, []);

    const handleActivityChange = useCallback((e) => {
        setSelectedActivityId(e.target.value);
        setQuantity('');
        setIsFullDay(false);
        setDescription('');
        setActivityMonth('');
    }, []);

    const handleAdd = useCallback(() => {
        if (!selectedActivity || !quantity || Number(quantity) <= 0 || preview.credits <= 0) return;

        const entry = {
            id: ++entryIdCounter,
            year: selectedYear,
            categoryId: selectedActivity.categoryId,
            activityId: selectedActivity.id,
            activityName: selectedActivity.shortName,
            quantity: Number(quantity),
            unit: selectedActivity.meetingAttendance
                ? isFullDay
                    ? 'full day'
                    : 'half day'
                : selectedActivity.unit,
            credits: preview.credits,
            capNote: preview.capNote,
            description: description.trim(),
            month: activityMonth,
        };

        dispatch({ type: 'ADD', entry });
        setQuantity('');
        setDescription('');
        setActivityMonth('');
    }, [selectedActivity, quantity, preview, selectedYear, isFullDay, description, activityMonth]);

    const handleDelete = useCallback((id) => {
        dispatch({ type: 'DELETE', id });
    }, []);

    /**
     * Export all entries (across all years) as a downloadable CSV file.
     */
    const handleDownloadCSV = useCallback(() => {
        if (entries.length === 0) return;

        const headers = ['Year', 'Calendar Year', 'Month', 'Category', 'Activity', 'Description', 'Quantity', 'Unit', 'Credits', 'Notes'];
        const rows = [...entries]
            .sort((a, b) => a.year - b.year || a.categoryId - b.categoryId)
            .map((e) => [
                `Year ${e.year}`,
                cycleStartYear + e.year - 1,
                e.month || '',
                `Category ${e.categoryId}`,
                e.activityName,
                e.description || '',
                e.quantity,
                e.unit,
                e.credits,
                e.capNote || '',
            ]);

        // Add summary rows
        rows.push([]);
        rows.push(['SUMMARY']);
        rows.push(['Total Credits', totalCredits]);
        for (let y = 1; y <= 5; y++) {
            rows.push([`Year ${y} (${cycleStartYear + y - 1}) Credits`, creditsByYear[y]]);
        }
        CATEGORIES.forEach((cat) => {
            rows.push([`Category ${cat.id} Credits`, creditsByCategory[cat.id]]);
        });

        const escapeCell = (val) => {
            const str = String(val ?? '');
            return str.includes(',') || str.includes('"') || str.includes('\n')
                ? `"${str.replace(/"/g, '""')}"`
                : str;
        };

        const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `DABT_CE_Credits_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }, [entries, totalCredits, creditsByYear, creditsByCategory, cycleStartYear]);

    // ── Year diversity warnings ──
    const yearDiversityWarnings = useMemo(() => {
        const warnings = [];
        for (let y = 1; y <= 5; y++) {
            const yearCredits = creditsByYear[y];
            const catCount = categoriesByYear[y];
            if (yearCredits > 0 && catCount < 2) {
                warnings.push(`Year ${y} (${cycleStartYear + y - 1}): Credits from only ${catCount} category — need at least 2`);
            }
        }
        return warnings;
    }, [creditsByYear, categoriesByYear, cycleStartYear]);

    // ────────────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* ── Header ── */}
            <header className="bg-navy text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                DABT Recertification CE Credit Calculator
                            </h1>
                            <p className="text-navy-100 text-sm mt-1 opacity-80">
                                Track your 100-credit, 5-year recertification requirement
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-navy-400/30 px-3 py-2 rounded-lg border border-white/10">
                                <label className="text-xs text-white/60 whitespace-nowrap">Cycle starts</label>
                                <select
                                    value={cycleStartYear}
                                    onChange={(e) => setCycleStartYear(Number(e.target.value))}
                                    className="bg-transparent text-white text-sm font-semibold border-none focus:ring-0 cursor-pointer appearance-none pr-1"
                                >
                                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 10 + i).map((yr) => (
                                        <option key={yr} value={yr} className="text-gray-900">{yr}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-2 bg-navy-400/30 px-4 py-2 rounded-lg border border-white/10">
                                <span className="text-3xl font-bold text-abt-green-light">{totalCredits}</span>
                                <span className="text-sm text-white/70">/ 100 credits</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ── Left Column: Input + Ledger ── */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* ── Year Tabs ── */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex gap-1">
                            {[1, 2, 3, 4, 5].map((y) => (
                                <button
                                    key={y}
                                    onClick={() => setSelectedYear(y)}
                                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${selectedYear === y
                                        ? 'bg-navy text-white shadow-md'
                                        : 'text-gray-500 hover:text-navy hover:bg-navy-50'
                                        }`}
                                >
                                    <span className="block">{yearLabel(y)}</span>
                                    <span className={`text-[10px] font-normal ${selectedYear === y ? 'text-white/60' : 'text-gray-400'}`}>Year {y}</span>
                                    {creditsByYear[y] > 0 && (
                                        <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${selectedYear === y ? 'bg-white/20' : 'bg-gray-100'
                                            }`}>
                                            {creditsByYear[y]}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* ── Input Panel ── */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-navy to-navy-400 px-5 py-3">
                                <h2 className="text-white font-semibold text-sm tracking-wide uppercase">
                                    Add CE Activity — {calendarYear} (Year {selectedYear})
                                </h2>
                            </div>
                            <div className="p-5 space-y-4">
                                {/* Category selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        CE Category
                                    </label>
                                    <select
                                        value={selectedCategoryId}
                                        onChange={handleCategoryChange}
                                        className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-navy-300 focus:border-navy transition-colors bg-white"
                                    >
                                        <option value="">Select a category…</option>
                                        {CATEGORIES.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                Category {c.id}: {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Activity selector */}
                                {selectedCategoryId && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Activity
                                        </label>
                                        <select
                                            value={selectedActivityId}
                                            onChange={handleActivityChange}
                                            className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-navy-300 focus:border-navy transition-colors bg-white"
                                        >
                                            <option value="">Select an activity…</option>
                                            {filteredActivities.map((a) => (
                                                <option key={a.id} value={a.id}>
                                                    {a.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Quantity + full/half day toggle */}
                                {selectedActivity && (
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Quantity ({selectedActivity.meetingAttendance
                                                    ? isFullDay ? 'full days' : 'half days'
                                                    : `${selectedActivity.unit}s`})
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                placeholder={`Enter # of ${selectedActivity.unit}s`}
                                                className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-navy-300 focus:border-navy transition-colors"
                                            />
                                        </div>

                                        {/* Meeting attendance: half-day / full-day toggle */}
                                        {selectedActivity.meetingAttendance && (
                                            <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsFullDay(false)}
                                                    className={`px-4 py-2.5 font-medium transition-colors ${!isFullDay
                                                        ? 'bg-navy text-white'
                                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Half Day
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsFullDay(true)}
                                                    className={`px-4 py-2.5 font-medium transition-colors ${isFullDay
                                                        ? 'bg-navy text-white'
                                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Full Day
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Description + Month */}
                                {selectedActivity && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Description <span className="text-gray-400 font-normal">(optional)</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="e.g., SOT Annual Meeting, Spring 2025"
                                                className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-navy-300 focus:border-navy transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Month <span className="text-gray-400 font-normal">(optional)</span>
                                            </label>
                                            <input
                                                type="month"
                                                value={activityMonth}
                                                onChange={(e) => setActivityMonth(e.target.value)}
                                                min={`${calendarYear}-01`}
                                                max={`${calendarYear}-12`}
                                                className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-navy-300 focus:border-navy transition-colors"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Preview + warnings */}
                                {selectedActivity && quantity && Number(quantity) > 0 && (
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Credits to be added:</span>
                                            <span className="text-xl font-bold text-navy">{preview.credits}</span>
                                        </div>
                                        {preview.capNote && (
                                            <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-md px-3 py-2 border border-amber-200">
                                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                </svg>
                                                <span>{preview.capNote}</span>
                                            </div>
                                        )}
                                        {preview.budgetWarning && (
                                            <div className="flex items-start gap-2 text-xs text-orange-700 bg-orange-50 rounded-md px-3 py-2 border border-orange-200">
                                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                                </svg>
                                                <span>{preview.budgetWarning}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Add button */}
                                <button
                                    onClick={handleAdd}
                                    disabled={!selectedActivity || !quantity || Number(quantity) <= 0 || preview.credits <= 0}
                                    className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-abt-green hover:bg-abt-green-dark text-white shadow-sm hover:shadow-md active:scale-[0.98]"
                                >
                                    + Add to Ledger
                                </button>
                            </div>
                        </div>

                        {/* ── Ledger Table ── */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-navy to-navy-400 px-5 py-3 flex items-center justify-between">
                                <h2 className="text-white font-semibold text-sm tracking-wide uppercase">
                                    Activity Ledger — {calendarYear} (Year {selectedYear})
                                </h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-white/60">
                                        {yearEntries.length} {yearEntries.length === 1 ? 'entry' : 'entries'}
                                    </span>
                                    <button
                                        onClick={handleDownloadCSV}
                                        disabled={entries.length === 0}
                                        title="Download all activities as CSV"
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export CSV
                                    </button>
                                </div>
                            </div>

                            {yearEntries.length === 0 ? (
                                <div className="py-12 text-center text-gray-400">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-sm">No activities logged for Year {selectedYear}</p>
                                    <p className="text-xs mt-1">Use the form above to add CE activities</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-gray-200">
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cat</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
                                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Credits</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                                                <th className="px-4 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {yearEntries.map((entry) => (
                                                <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-4 py-3">
                                                        <CategoryBadge categoryId={entry.categoryId} />
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        {entry.activityName}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[180px] truncate" title={entry.description}>
                                                        {entry.description || '—'}
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-xs text-gray-500 whitespace-nowrap">
                                                        {entry.month || '—'}
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-gray-600">
                                                        {entry.quantity} {entry.unit}{entry.quantity !== 1 ? 's' : ''}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-abt-green/10 text-abt-green font-bold text-sm">
                                                            {entry.credits}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-amber-600 max-w-[200px]">
                                                        {entry.capNote || '—'}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            onClick={() => handleDelete(entry.id)}
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500"
                                                            title="Delete entry"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Right Sidebar: Summary ── */}
                    <div className="space-y-6">
                        {/* Overall Progress */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-5">
                            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                                Cycle Progress
                            </h3>
                            <ProgressBar value={totalCredits} max={100} label="Total CE Credits" />

                            {totalCredits >= 100 && (
                                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2 border border-green-200">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">100-credit requirement met!</span>
                                </div>
                            )}
                        </div>

                        {/* Category Breakdown */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                                Credits by Category
                            </h3>
                            {CATEGORIES.map((cat) => (
                                <div key={cat.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CategoryBadge categoryId={cat.id} />
                                        <span className="text-xs text-gray-500 hidden xl:inline">{cat.name.split(' ')[0]}</span>
                                    </div>
                                    <span className="font-bold text-gray-800">{creditsByCategory[cat.id]}</span>
                                </div>
                            ))}
                        </div>

                        {/* Per-Year Breakdown */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
                            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                                Credits by Year
                            </h3>
                            <p className="text-xs text-gray-500">Minimum 10 credits per year required</p>
                            {[1, 2, 3, 4, 5].map((y) => (
                                <YearMiniBar key={y} year={y} label={yearLabel(y)} credits={creditsByYear[y]} />
                            ))}
                        </div>

                        {/* Warnings */}
                        {yearDiversityWarnings.length > 0 && (
                            <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 space-y-2">
                                <h3 className="font-semibold text-amber-800 text-sm uppercase tracking-wide flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    Category Diversity
                                </h3>
                                <p className="text-xs text-amber-700">
                                    Credits must come from at least 2 of 3 categories each year.
                                </p>
                                {yearDiversityWarnings.map((w, i) => (
                                    <p key={i} className="text-xs text-amber-800 font-medium">⚠ {w}</p>
                                ))}
                            </div>
                        )}

                        {/* Quick Reference */}
                        <div className="bg-navy-50 rounded-xl border border-navy-100 p-5 space-y-2">
                            <h3 className="font-semibold text-navy text-sm uppercase tracking-wide">
                                Quick Reference
                            </h3>
                            <ul className="text-xs text-gray-600 space-y-1.5">
                                <li className="flex items-start gap-1.5">
                                    <span className="text-navy font-bold">•</span>
                                    <span>100 total credits over 5-year cycle</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="text-navy font-bold">•</span>
                                    <span>Average 20 credits/year, minimum 10/year</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="text-navy font-bold">•</span>
                                    <span>Credits from ≥ 2 categories each year</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="text-navy font-bold">•</span>
                                    <span>Service roles: one claim per org per year</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
