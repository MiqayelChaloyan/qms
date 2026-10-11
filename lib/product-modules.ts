export type ProductModule = {
  id: string;
  title: string;
  /** Shorter label for navigation menus */
  menuLabel?: string;
  description: string;
};

export type ProductCategory = {
  id: string;
  title: string;
  summary: string;
  modules: ProductModule[];
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "quality-compliance",
    title: "Quality & compliance",
    summary: "Core QMS workflows, audits, and improvement cycles.",
    modules: [
      {
        id: "continuous-improvements",
        title: "Continuous Improvements",
        description:
          "Track initiatives, owners, and outcomes in one improvement pipeline.",
      },
      {
        id: "document-control",
        title: "Document Control & Quality Records",
        menuLabel: "Document control & records",
        description:
          "Controlled documents and quality records with version history and approvals.",
      },
      {
        id: "capa-ncr",
        title: "CAPA NCR Management",
        menuLabel: "CAPA & NCR",
        description:
          "Investigate nonconformances and drive corrective and preventive action.",
      },
      {
        id: "internal-audit",
        title: "Internal Audit",
        description:
          "Plan audits, capture findings, and close loops with accountable follow-up.",
      },
      {
        id: "monthly-quality-assessment",
        title: "Monthly Quality Assessment",
        menuLabel: "Monthly quality assessment",
        description:
          "Structured monthly reviews with metrics, trends, and management input.",
      },
    ],
  },
  {
    id: "workforce",
    title: "Workforce & training",
    summary: "People, roles, competency, and performance in the lab.",
    modules: [
      {
        id: "employee-training",
        title: "Employee Training",
        description:
          "Assign, deliver, and document training tied to roles and procedures.",
      },
      {
        id: "competency-assessment",
        title: "Competency Assessment",
        description:
          "Assess and approve competency before staff perform critical tasks.",
      },
      {
        id: "performance-evaluation",
        title: "Performance Evaluation",
        description:
          "Run evaluation cycles aligned with job expectations and quality goals.",
      },
      {
        id: "job-descriptions-kpis",
        title: "Job Descriptions with Key Performance Indicators",
        menuLabel: "Job descriptions & KPIs",
        description:
          "Maintain role definitions with measurable KPIs in one system of record.",
      },
      {
        id: "employee-records",
        title: "Employee Records",
        description:
          "Centralize personnel quality records required for inspections.",
      },
      {
        id: "employee-suggestions",
        title: "Employee Suggestions",
        description:
          "Capture frontline ideas and route them through review and implementation.",
      },
      {
        id: "lab-director-delegation",
        title: "Laboratory Director's Delegation of Duties",
        menuLabel: "Director delegation of duties",
        description:
          "Document delegated authority with clear scope, dates, and traceability.",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations & environment",
    summary: "Monitoring, equipment, logs, and inventory.",
    modules: [
      {
        id: "environment-monitoring",
        title:
          "Integrated Temperature and Humidity Monitoring system with Automated Logsheets",
        menuLabel: "Temp & humidity monitoring",
        description:
          "Continuous environmental monitoring with automated log sheets and alerts.",
      },
      {
        id: "temperature-log-sheets",
        title: "Temperature Log Sheets",
        description:
          "Digital log sheets for refrigerators, freezers, and critical storage.",
      },
      {
        id: "calibration-maintenance",
        title: "Calibration & Maintenance",
        description:
          "Schedules, work orders, and evidence for calibrated equipment and upkeep.",
      },
      {
        id: "inventory-management",
        title: "Inventory Management",
        description:
          "Track reagents, consumables, and lot control for the laboratory.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & access",
    summary: "Who can see and do what across the platform.",
    modules: [
      {
        id: "access-control",
        title: "Access Control",
        description:
          "Role-based permissions aligned to lab structure and regulatory needs.",
      },
    ],
  },
];

export const ALL_PRODUCT_MODULES = PRODUCT_CATEGORIES.flatMap(
  (category) => category.modules,
);
