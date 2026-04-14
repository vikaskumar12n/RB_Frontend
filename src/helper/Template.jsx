import BusinessAnalystTemplate from "../template/BussinessTemplate/BusinessAnalystTemplate"; 
import MBATemplate from "../template/BussinessTemplate/MBATemplate";
import AccountantTemplate from "../template/Accountant/ProfessionalAccountant";
import SeniorAccountantTemplate from "../template/Accountant/SeniorAccountant";
import CPATemplate from "../template/Accountant/CPAResume";
import RetailCashierTemplate from "../template/Cashier/RetailCashier";
import SeniorCashierTemplate from "../template/Cashier/SeniorCashier";
import SoftwareDevTemplate from "../template/Engineer/SoftwareEnn";
import ElectronicEngineerTemplate from "../template/Engineer/ElectronicEnn";
import CivilEngineerTemplate from "../template/Engineer/CivilEnn";
import MechanicalEngineerTemplate from "../template/Engineer/Mechnical";
import UIUXDesignerTemplate from "../template/Designer/UXDesigner";
import GraphicDesignerTemplate from "../template/Designer/GraficDesigner";
import ProductDesignerTemplate from "../template/Designer/ProductDesigner";
import FullStackMinimalTemplate from "../template/Developer/FullStackDeveloper";
import FrontendDevTemplate from "../template/Developer/FrontendDeveloper";
import MobileDevTemplate from "../template/Developer/MobileDeveloper";
import BackendDevTemplate from "../template/Developer/BackendDeveloper";
import ProjectManagerTemplate from "../template/Manager/ProjectManager";
import BusinessDevTemplates from "../template/BussinessTemplate/BusinessDevTemplate";
import OperationsManagerTemplate from "../template/Manager/operatorManager";
import NurseResumeTemplate from "../template/Nurse/RegisteredNurse";
import ICUNurseSimpleTemplate from "../template/Nurse/ICUNurse";
import NursingFresherTemplate from "../template/Nurse/FresherNurse";
import TechInternTemplate from "../template/Intern/TechIntern";
import BusinessInternTemplate from "../template/Intern/BussinessIntern";
import DesignInternTemplate from "../template/Intern/DesignInter";
import SchoolTeacherTemplate from "../template/Teacher/SchoolTeacher";
import CollegeProfessorTemplate from "../template/Teacher/SchoolProfessior";
import React from "react";

export const templates = [
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

 