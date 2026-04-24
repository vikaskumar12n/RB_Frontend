import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
 
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const faqs = [
  {
    q: "How do I create my first resume?",
    a: "Click on 'Build My Resume' from the homepage, choose a template, and fill in your details. Your resume will be ready in minutes.",
  },
  {
    q: "Can I download my resume for free?",
    a: "Yes! You can download your resume in PDF format for free. Premium templates and advanced features require a Pro plan.",
  },
  {
    q: "Is my data safe and private?",
    a: "Absolutely. We never share your personal information with third parties. Your data is encrypted and stored securely.",
  },
  {
    q: "Can I edit my resume after downloading?",
    a: "Yes, your resume is saved to your account. You can come back anytime, make edits, and re-download it.",
  },
  {
    q: "What file formats are supported for download?",
    a: "We support PDF and DOCX formats. PDF is recommended for job applications as it preserves formatting.",
  },
];

const categories = ["General"];

// ✅ Yup validation schema
const schema = yup.object({
  fullname: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  subject: yup
    .string()
    .notOneOf([""], "Please select a topic")
    .required("Please select a topic"),
  message: yup
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message too long (max 1000 characters)")
    .required("Message is required"),
});

export default function HelpPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("General");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  // ✅ react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const messageValue = watch("message", "");
 
 const onSubmit = async (data) => {
  // ✅ Footer jaisa same login check
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    window.dispatchEvent(new CustomEvent("openAuthModal", {
      detail: {
        tab: "login",
        onSuccess: () => {
          // login ke baad automatic form submit ho jayega
          handleSubmit(onSubmit)();
        }
      }
    }));
    return;
  }

  try {
    const res = await axios.post("http://13.202.253.175:3000/api/query", data);
    if (res?.status === 201 || res?.data?.success === true) {
      toast.success("Query saved successfully", { icon: "✅" });
      setSubmitted(true);
      reset({ fullname: "", email: "", subject: "", message: "" });
    } else {
      toast.error(res?.data?.message || "Something went wrong");
    }
  } catch (error) {
    toast.error("Server error, try again later");
  }
};
  const handleReset = () => {
    reset();
    setSubmitted(false);
  };
 
  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {errors[field].message}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">

      {/* ── Hero ── */}
      <div
        className="relative px-6 py-20 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2e3a53 0%, #2e3a53 60%, #2e3a53 100%)" }}
      >
        <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full opacity-10 bg-white" />

        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-blue-500/30 border border-blue-300/40 text-blue-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Help &amp; Support
          </span>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            How can we <span className="text-blue-200">help you?</span>
          </h1>
          <p className="text-white text-sm mb-8 leading-relaxed">
            Search our knowledge base or send us a query — we typically reply within 24 hours.
          </p>
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-white border border-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>
      </div>

      {/* ── Quick Help Cards ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Resume Guide",
              desc: "Step-by-step guide to building your first resume.",
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              ),
            },
            {
              title: "Template Help",
              desc: "How to choose and customise the right template.",
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
              ),
            },
            {
              title: "Export & Download",
              desc: "Download your resume in PDF or DOCX format.",
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              ),
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                {card.icon}
              </div>
              <div className="font-semibold text-black text-sm mb-1">{card.title}</div>
              <div className="text-xs text-black leading-relaxed">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-14 pb-14">

        {/* ── FAQ ── */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-xl font-bold text-blue-900">Frequently Asked Questions</h2>
          </div>
          <p className="text-sm text-black mb-5 ml-4">Browse by category or read all answers below.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === cat
                    ? "bg-blue-900 text-white border-blue-600 shadow-sm"
                    : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-all ${openFaq === i ? "border-blue-500 shadow-sm" : "border-slate-100"
                  }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-50 transition-colors"
                >
                  {faq.q}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-all ${openFaq === i ? "bg-blue-900" : "bg-blue-50"
                    }`}>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${openFaq === i ? "rotate-180 text-white" : "text-blue-500"}`}
                      fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-blue-600 pt-3 bg-blue-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Query Form ── */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-xl font-bold text-blue-900">Send Us a Query</h2>
          </div>
          <p className="text-sm text-black mb-8 ml-4">
            Can't find your answer? We'll get back to you within 24 hours.
          </p>

          {submitted ? (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-6 py-14 text-center">
              <div className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-lg mb-1">Query Submitted!</h3>
              <p className="text-sm text-black mb-5">We've received your message and will reply within 24 hours.</p>
              <button
                onClick={handleReset}
                className="text-xs text-black font-semibold underline underline-offset-2"
              >
                Submit another query
              </button>
            </div>
          ) : (
            // ✅ handleSubmit(onSubmit) — react-hook-form ka handler
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register("fullname")}
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl bg-blue-50/40 focus:outline-none focus:ring-2 focus:bg-white placeholder-slate-300 text-slate-700 transition-all ${errors.name
                        ? "border-red-400 focus:ring-red-300"
                        : "border-blue-100 focus:ring-blue-400"
                      }`}
                  />
                  <ErrorMsg field="name" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    {...register("email")}
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl bg-blue-50/40 focus:outline-none focus:ring-2 focus:bg-white placeholder-slate-300 text-slate-700 transition-all ${errors.email
                        ? "border-red-400 focus:ring-red-300"
                        : "border-blue-100 focus:ring-blue-400"
                      }`}
                  />
                  <ErrorMsg field="email" />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1.5">
                  Subject
                </label>
                <select
                  {...register("subject")}
                  className={`w-full px-4 py-2.5 text-sm border rounded-xl bg-blue-50/40 focus:outline-none focus:ring-2 focus:bg-white text-slate-600 transition-all ${errors.subject
                      ? "border-red-400 focus:ring-red-300"
                      : "border-blue-100 focus:ring-blue-400"
                    }`}
                >
                  <option value="">Select a topic</option>
                  <option>Account Issue</option>
                  <option>Template Help</option>
                  <option>Billing Query</option>
                  <option>Export Problem</option>
                  <option>Other</option>
                </select>
                <ErrorMsg field="subject" />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your issue or question in detail..."
                  {...register("message")}
                  className={`w-full px-4 py-2.5 text-sm border rounded-xl bg-blue-50/40 focus:outline-none focus:ring-2 focus:bg-white placeholder-slate-300 text-slate-700 resize-none transition-all ${errors.message
                      ? "border-red-400 focus:ring-red-300"
                      : "border-blue-100 focus:ring-blue-400"
                    }`}
                />
                {/* ✅ Character counter */}
                <div className="flex items-start justify-between mt-1">
                  <ErrorMsg field="message" />
                  <span className={`text-xs ml-auto ${messageValue.length > 900 ? "text-red-400" : "text-slate-400"}`}>
                    {messageValue.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #2e3a53, #2e3a53)" }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Query →"
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Contact Strip ── */}
        <div
          className="rounded-2xl px-8 py-7 flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between items-center"
          style={{ background: "linear-gradient(135deg, #2e3a53 0%, #2e3a53 60%, #2e3a53 100%)" }}
        >
          {[
            {
              label: "Email Us", value: "support@edumitrahub.com",
              icon: (<svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
            },
            {
              label: "Live Chat", value: "Mon–Fri, 9am–6pm",
              icon: (<svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
            },
            {
              label: "Call Us", value: "+91 98765 43210",
              icon: (<svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
            },
          ].map((c, i) => (
            <div key={c.label} className={`flex items-center gap-3 ${i !== 2 ? "md:border-r md:border-blue-500/40 md:pr-12" : ""}`}>
              <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                {c.icon}
              </div>
              <div>
                <div className="text-xs text-blue-300 font-medium">{c.label}</div>
                <div className="text-sm text-white font-semibold">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}