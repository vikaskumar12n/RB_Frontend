import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../helper/loader";

const AboutUs = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setLoading(true);

       setTimeout(() => {
  window.scrollTo(0, 0);
  navigate("/myresume");
  setLoading(false);
}, 500);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { num: "2M+", label: "Resumes Created" },
        { num: "150+", label: "Countries Reached" },
        { num: "94%", label: "Interview Success" },
        { num: "50+", label: "Expert Templates" },
    ];

    const missions = [
        {
            title: "ATS-Optimised Templates",
            desc: "Every template is tested against top Applicant Tracking Systems so your resume passes the filter before a human sees it.",
            bg: "bg-blue-50", iconColor: "text-blue-700",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            ),
        },
        {
            title: "Ready in Minutes",
            desc: "Our smart editor auto-formats everything so you focus on your content, not the design.",
            bg: "bg-blue-50", iconColor: "text-blue-700",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
        },
        {
            title: "AI-Powered Suggestions",
            desc: "Get real-time writing suggestions tailored to your industry, role, and years of experience.",
            bg: "bg-amber-50", iconColor: "text-blue-700",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            ),
        },
        {
            title: "Career Expert Network",
            desc: "Access resume reviews from certified career coaches who've helped thousands land roles at top companies.",
            bg: "bg-pink-50", iconColor: "text-blue-700",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
    ];

    const team = [
        { initials: "AR", name: "Arjun Rawat", role: "Co-founder & CEO", bio: "Former recruiter at Deloitte. Saw first-hand how great candidates got rejected over bad resumes. Built the solution.", avatarBg: "bg-blue-100", avatarText: "text-blue-800" },
        { initials: "PS", name: "Priya Sharma", role: "Head of Design", bio: "5+ years crafting product experiences at startups. Believes every resume should look like it was designed by a pro.", avatarBg: "bg-blue-100", avatarText: "text-blue-800" },
        { initials: "RK", name: "Rahul Kumar", role: "Lead Engineer", bio: "Full-stack developer passionate about fast, accessible tools. Keeps the editor snappy and exports pixel-perfect.", avatarBg: "bg-blue-100", avatarText: "text-blue-800" },
    ];

    const values = [
        { label: "Simplicity first", color: "bg-blue-500" },
        { label: "Accessible to all", color: "bg-blue-500" },
        { label: "Privacy respected", color: "bg-blue-500" },
        { label: "Continuous improvement", color: "bg-blue-500" },
        { label: "User success = our success", color: "bg-blue-500" },
        { label: "Honest, no dark patterns", color: "bg-blue-500" },
    ];

    return (

        <>

            {loading && <Loader />}
            <div className="min-h-screen bg-white text-slate-800 font-sans">

                {/* ── Hero ── */}
                <section
                    className="relative overflow-hidden text-center px-6 py-20"
                    style={{ background: "linear-gradient(135deg, #1c398e 0%, #1c398e 60%, #1e3a8a 100%)" }}
                >
                    {/* decorative circles */}
                    <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-10 bg-white" />
                    <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full opacity-10 bg-white" />
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(99,153,34,0.18) 0%, transparent 60%)" }}
                    />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
                            style={{ background: "rgba(7,153,34,0.1)", border: "1px solid rgba(99,153,34,0.4)", color: "white" }}>
                            <span className="w-2 h-2 rounded-full bg-blue-800 inline-block" />
                            Resume Builder — About Us
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            Build Resumes That <span className="text-blue-900">Get You Hired</span>
                        </h1>
                        <p className="text-base text-white/60 leading-relaxed">
                            We're on a mission to help every job seeker create a professional, standout resume in minutes — not hours.
                        </p>
                    </div>
                </section>

                {/* ── Stats ── */}
                <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-white border border-slate-300 rounded-2xl p-5 text-center shadow-sm">
                                <div className="text-3xl font-bold text-blue-700">{s.num}</div>
                                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Mission ── */}
                <section className="max-w-4xl mx-auto px-6 py-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-2">Our Mission</p>
                    <h2 className="text-3xl font-bold mb-3">Why we built this</h2>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-lg mb-8">
                        Great opportunities shouldn't be missed because of a poorly formatted resume. We built Resume Builder so anyone — freshers to senior executives — can present their best self.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {missions.map((m) => (
                            <div key={m.title} className="bg-slate-50 border border-slate-300 rounded-xl p-6">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${m.bg} ${m.iconColor}`}>
                                    {m.icon}
                                </div>
                                <h3 className="font-semibold text-sm mb-2 text-slate-800">{m.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-slate-100 mx-6" />

                {/* ── Team ── */}
                <section className="max-w-4xl mx-auto px-6 py-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">The Team</p>
                    <h2 className="text-3xl font-bold mb-3">People behind the product</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        A small team of designers, engineers, and career experts who obsess over helping people land their dream jobs.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {team.map((t) => (
                            <div key={t.name} className="border border-slate-300 rounded-2xl p-6 text-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ${t.avatarBg} ${t.avatarText}`}>
                                    {t.initials}
                                </div>
                                <div className="font-semibold text-slate-800">{t.name}</div>
                                <div className="text-xs text-blue-600 font-medium mt-0.5 mb-3">{t.role}</div>
                                <p className="text-xs text-slate-500 leading-relaxed">{t.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-slate-100 mx-6" />

                {/* ── Values ── */}
                <section className="max-w-4xl mx-auto px-6 pt-5 pb-15">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Our Values</p>
                    <h2 className="text-3xl font-bold mb-8">What we stand for</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {values.map((v) => (
                            <div key={v.label} className="flex items-center gap-3 bg-slate-100 border border-slate-300 rounded-xl px-4 py-3">
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${v.color}`} />
                                <span className="text-sm font-medium text-slate-700">{v.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <div className="mx-6 mb-16 rounded-2xl text-center px-8 py-14"
                    style={{ background: "linear-gradient(135deg, #1c398e 0%, #1c398e 60%, #1e3a8a 100%)" }}
                >

                    <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-10 bg-white" />
                    <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full opacity-10 bg-white" />
                    <h2 className="text-3xl font-bold text-white mb-3">Ready to land your next job?</h2>
                    <p className="text-sm text-white/60 mb-6">
                        Join 2 million+ professionals who've built their resume with us. It's free to start.
                    </p>
                    <button
                        onClick={handleClick}
                        className="bg-white text-black font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
                    >
                        Build My Resume — Free
                    </button>
                </div>

            </div>
        </>
    );
};

export default AboutUs;