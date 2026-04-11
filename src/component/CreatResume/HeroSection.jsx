import { useState } from "react";
import React from "react";
import BusinessAnalystTemplate from "../../template/BussinessTemplate/BusinessAnalystTemplate"; 
import MBATemplate from "../../template/BussinessTemplate/MBATemplate";
import AccountantTemplate from "../../template/Accountant/ProfessionalAccountant";
import SeniorAccountantTemplate from "../../template/Accountant/SeniorAccountant";
import CPATemplate from "../../template/Accountant/CPAResume";
import RetailCashierTemplate from "../../template/Cashier/RetailCashier";
import SeniorCashierTemplate from "../../template/Cashier/SeniorCashier";
import SoftwareDevTemplate from "../../template/Engineer/SoftwareEnn";
import ElectronicEngineerTemplate from "../../template/Engineer/ElectronicEnn";
import CivilEngineerTemplate from "../../template/Engineer/CivilEnn";
import MechanicalEngineerTemplate from "../../template/Engineer/Mechnical";
import UIUXDesignerTemplate from "../../template/Designer/UXDesigner";
import GraphicDesignerTemplate from "../../template/Designer/GraficDesigner";
import ProductDesignerTemplate from "../../template/Designer/ProductDesigner";
import FullStackMinimalTemplate from "../../template/Developer/FullStackDeveloper";
import FrontendDevTemplate from "../../template/Developer/FrontendDeveloper";
import MobileDevTemplate from "../../template/Developer/MobileDeveloper";
import BackendDevTemplate from "../../template/Developer/BackendDeveloper";
import ProjectManagerTemplate from "../../template/Manager/ProjectManager";
import BusinessDevTemplates from "../../template/BussinessTemplate/BusinessDevTemplate";
import OperationsManagerTemplate from "../../template/Manager/operatorManager";
import NurseResumeTemplate from "../../template/Nurse/RegisteredNurse";
import ICUNurseSimpleTemplate from "../../template/Nurse/ICUNurse";
import NursingFresherTemplate from "../../template/Nurse/FresherNurse";
import TechInternTemplate from "../../template/Intern/TechIntern";
import BusinessInternTemplate from "../../template/Intern/BussinessIntern";
import DesignInternTemplate from "../../template/Intern/DesignInter";
import SchoolTeacherTemplate from "../../template/Teacher/SchoolTeacher";
import CollegeProfessorTemplate from "../../template/Teacher/SchoolProfessior";
const templates = [
  { id: 1, name: "Software Engineer", component: <SoftwareDevTemplate /> },
  { id: 2, name: "Frontend Developer", component: <FrontendDevTemplate /> },
  { id: 3, name: "Backend Developer", component: <BackendDevTemplate /> },
  { id: 4, name: "Full stack developer", component: <FullStackMinimalTemplate /> },
  { id: 5, name: "CPATemplate", component: <CPATemplate /> },
  { id: 6, name: "Senior Accountant", component: <SeniorAccountantTemplate /> },
  { id: 7, name: "Senior Cashier", component: <SeniorCashierTemplate /> },
  { id: 8, name: "Product designer", component: <ProductDesignerTemplate /> },
  { id: 9, name: "Project Md", component: <ProjectManagerTemplate /> },
  { id: 10, name: "Mobile Developer", component: <MobileDevTemplate /> },
  { id: 11, name: "BDE", component: <BusinessDevTemplates /> },
  { id: 12, name: "Operator manager", component: <OperationsManagerTemplate /> },
  { id: 13, name: "Nurse", component: <NurseResumeTemplate /> },
  { id: 14, name: "ICU Nurse", component: <ICUNurseSimpleTemplate /> },
  { id: 15, name: "Nurse", component: <NursingFresherTemplate /> },
  { id: 16, name: "Intern", component: <TechInternTemplate /> },
  { id: 17, name: "Bussiness", component: <BusinessInternTemplate /> },
  { id: 18, name: "Desiner", component: <DesignInternTemplate /> },
  { id: 19, name: "Teacher", component: <SchoolTeacherTemplate /> },
  { id: 20, name: "Professor", component: <CollegeProfessorTemplate /> },
  { id: 21, name: "UI & UX", component: <UIUXDesignerTemplate /> },
  { id: 22, name: "Mechanical", component: <MechanicalEngineerTemplate /> },
  { id: 23, name: "Civil", component: <CivilEngineerTemplate /> },
  { id: 24, name: "Electronic", component: <ElectronicEngineerTemplate /> },
  { id: 25, name: "Business Analys", component: <BusinessAnalystTemplate /> },
  { id: 26, name: "Professor", component: <CollegeProfessorTemplate /> },
  { id: 27, name: "Retail Cashier", component: <RetailCashierTemplate /> },
  { id: 28, name: "Graphic designer", component: <GraphicDesignerTemplate /> },
  { id: 29, name: "MBA", component: <MBATemplate /> },
  { id: 30, name: "Acountant", component: <AccountantTemplate /> },
];

const ResumeIllustration = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-orange-200 opacity-70" />
    <div className="absolute right-24 top-1/2 -translate-y-1/4 w-36 h-36 rounded-full bg-orange-300 opacity-50" />
    <div className="relative z-10 right-4">
      <div className="relative bg-white rounded-lg shadow-xl w-44 h-52 border-l-8 border-purple-600 p-4 flex flex-col gap-3">
        <div className="w-3/4 h-2.5 bg-slate-700 rounded-sm mt-2" />
        <div className="w-full h-2 bg-slate-300 rounded-sm" />
        <div className="w-5/6 h-2 bg-slate-300 rounded-sm" />
        <div className="w-full h-2 bg-slate-300 rounded-sm mt-1" />
        <div className="w-4/5 h-2 bg-slate-300 rounded-sm" />

        <div className="absolute -top-5 -right-5 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>

        <div className="absolute -bottom-4 -right-3 flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="flex gap-1 -mt-1">
            <div className="w-3 h-5 bg-blue-600" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
            <div className="w-3 h-5 bg-blue-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
import { useSearch } from "../../helper/SearchContext";
export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(templates);
 const { setSearchQuery } = useSearch(); // ✅ context

  
  const handleSearch = () => {
    if (!search.trim()) return;

    setSearchQuery(search.trim()); // ✅ CategoryNav ko bata do

    // ✅ #category section pe smooth scroll
    const el = document.getElementById("category");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <section className="w-full pt-30 min-h-[400px] px-8 py-14 flex items-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start justify-between gap-10">
        
        {/* ✅ LEFT: Text + Search + Results */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl text-gray-900 leading-tight mb-4">
            Free Resume Samples and Examples
          </h1>
          <p className="text-gray-600 text-xl mb-7 leading-relaxed">
            Use professionally written and formatted resume samples that will
            get you the job you want. Search over 100 HR approved resume
            examples.
          </p>
 
            <div className="flex items-center gap-0 w-full max-w-2xl">
            <div className="flex items-center flex-1 border border-gray-300 bg-white rounded-l-md px-3 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <svg
                className="w-4 h-4 text-gray-400 mr-2 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                className="w-full outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search resume samples (e.g. Developer, Nurse)"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-900 ml-2 text-white text-sm font-semibold px-6 py-3 rounded-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* ✅ RIGHT: Illustration — alag column mein */}
        <div className="flex-shrink-0 w-64 h-64 md:w-72 md:h-72">
          <ResumeIllustration />
        </div>
      </div>
    </section>
  );
}