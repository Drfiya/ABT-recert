import { Link } from 'react-router-dom';

// ─── FEATURE CARD ──────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, description }) {
    return (
        <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-navy/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy to-navy-400 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
    );
}

// ─── CATEGORY PILL ─────────────────────────────────────────────────────────────

function CategoryPill({ number, label, color }) {
    return (
        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${color} bg-white shadow-sm`}>
            <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
                {number}
            </span>
            <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
    );
}

// ─── LANDING PAGE ──────────────────────────────────────────────────────────────

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* ── Navigation ── */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-navy to-navy-400 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-navy tracking-tight">DABT Recert Tracker</span>
                    </div>
                    <Link
                        to="/calculator"
                        className="px-5 py-2.5 rounded-lg bg-abt-green hover:bg-abt-green-dark text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97]"
                    >
                        Open Calculator →
                    </Link>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-abt-green/10 text-abt-green text-xs font-semibold mb-6 border border-abt-green/20">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                ABT-Compliant Credit Tracking
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                                Track your DABT
                                <span className="block text-navy">recertification credits</span>
                                <span className="block text-abt-green">with confidence.</span>
                            </h1>
                        </div>
                        <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                            An interactive calculator built for ABT Diplomates to plan, log,
                            and monitor CE credits across all three categories over your 5-year
                            recertification cycle.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/calculator"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-navy hover:bg-navy-400 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-navy/20 hover:shadow-xl hover:shadow-navy/30 active:scale-[0.97]"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Start Tracking Credits
                            </Link>
                            <a
                                href="https://www.abtox.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-navy/30 text-gray-600 hover:text-navy font-semibold text-base transition-all duration-200"
                            >
                                Visit ABT Website
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Hero visual — abstract dashboard preview */}
                    <div className="hidden lg:block relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-navy/5 to-abt-green/5 rounded-3xl blur-2xl" />
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                            {/* Mini dashboard preview */}
                            <div className="bg-gradient-to-r from-navy to-navy-400 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                    </div>
                                    <span className="text-white/40 text-xs font-mono">CE Credit Calculator</span>
                                </div>
                            </div>
                            <div className="p-6 space-y-5">
                                {/* Fake progress bar */}
                                <div>
                                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                                        <span>Total CE Credits</span>
                                        <span className="font-semibold text-gray-700">72 / 100</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[72%] bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" />
                                    </div>
                                </div>
                                {/* Fake category bars */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: 'Cat 1', value: 28, color: 'bg-blue-500' },
                                        { label: 'Cat 2', value: 20, color: 'bg-emerald-500' },
                                        { label: 'Cat 3', value: 24, color: 'bg-purple-500' },
                                    ].map((c) => (
                                        <div key={c.label} className="text-center">
                                            <div className="h-20 bg-gray-50 rounded-lg flex items-end justify-center pb-1">
                                                <div
                                                    className={`w-8 ${c.color} rounded-t-md transition-all`}
                                                    style={{ height: `${(c.value / 30) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] text-gray-400 mt-1 block">{c.label}</span>
                                            <span className="text-xs font-bold text-gray-700">{c.value}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Fake table rows */}
                                <div className="space-y-2">
                                    {['SOT Annual Meeting', 'Peer Review — J. Toxicol', 'CE Webinar Series'].map((name) => (
                                        <div key={name} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                                            <span className="text-xs text-gray-600">{name}</span>
                                            <span className="text-xs font-bold text-abt-green">+4</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Key Numbers ── */}
            <section className="bg-navy">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: '100', label: 'Total credits required' },
                            { number: '5', label: 'Year cycle' },
                            { number: '10', label: 'Minimum credits/year' },
                            { number: '3', label: 'Credit categories' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-3xl sm:text-4xl font-bold text-abt-green-light">{stat.number}</div>
                                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features Grid ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need to stay on track</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Built specifically for ABT Diplomates, with every rule and cap from the
                        Recertification Manual encoded into the calculator.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        title="Automatic Cap Enforcement"
                        description="Per-event, per-year, and per-cycle caps are applied automatically. Warnings appear before you exceed any limit."
                    />
                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        title="Calendar Year Mapping"
                        description="Set your cycle start year and every tab, date picker, and export maps to your actual recertification dates."
                    />
                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
                        title="Visual Progress Tracking"
                        description="Color-coded progress bars, per-year mini-bars, and category breakdowns give you instant visibility."
                    />
                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                        title="Category Diversity Alerts"
                        description="Get warned if you're only earning credits from one category in a year — ABT requires at least two."
                    />
                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                        title="CSV Export"
                        description="Download your complete activity ledger with summary totals — perfect for submitting with your recertification paperwork."
                    />
                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                        title="27 Activities Covered"
                        description="Every CE activity from the ABT Recertification Manual is included across all three credit categories."
                    />
                </div>
            </section>

            {/* ── Categories Section ── */}
            <section className="bg-gradient-to-b from-navy-50/50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Three categories of CE credit</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Credits must come from at least 2 of these 3 categories each year
                            of your recertification cycle.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CategoryPill number={1} label="Continuing Education" color="border-blue-200" />
                        <CategoryPill number={2} label="Meeting Attendance" color="border-emerald-200" />
                        <CategoryPill number={3} label="Professional Development" color="border-purple-200" />
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="relative bg-gradient-to-br from-navy to-navy-400 rounded-3xl px-8 sm:px-16 py-16 text-center overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-abt-green/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Ready to track your credits?
                        </h2>
                        <p className="text-white/70 max-w-lg mx-auto mb-8">
                            Start logging your CE activities today. No account needed —
                            everything runs in your browser.
                        </p>
                        <Link
                            to="/calculator"
                            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-abt-green hover:bg-abt-green-dark text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-xl active:scale-[0.97]"
                        >
                            Launch Calculator
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-gray-100 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy to-navy-400 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">DABT Recert Tracker</span>
                        </div>
                        <div className="text-center sm:text-right space-y-1">
                            <p className="text-xs text-gray-400">
                                Built by <span className="font-medium text-gray-600">Dr. Lutfiya Miller, Ph.D., DABT</span>
                            </p>
                            <p className="text-xs text-gray-400">
                                Credit values per the ABT Recertification Manual (2023 edition)
                            </p>
                            <p className="text-xs text-gray-300">
                                Not affiliated with the American Board of Toxicology. For informational use only.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
