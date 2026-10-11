export type ProductModule = {
  id: string;
  /** Homepage section id this module scrolls to */
  anchor: string;
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
    title: "Quality system",
    summary: "Improvement, documents, corrective action and audits, in the order they appear on the page.",
    modules: [
      {
        id: "continuous-improvements",
        anchor: "improvements",
        title: "Continuous Improvements",
        description:
          "Track initiatives, owners, and outcomes in one improvement pipeline.",
      },
      {
        id: "document-control",
        anchor: "document-control",
        title: "Document Control & Quality Records",
        menuLabel: "Document control & records",
        description:
          "Controlled documents and quality records with version history and approvals.",
      },
      {
        id: "capa-ncr",
        anchor: "capa",
        title: "CAPA NCR Management",
        menuLabel: "CAPA & NCR",
        description:
          "Investigate nonconformances and drive corrective and preventive action.",
      },
      {
        id: "internal-audit",
        anchor: "internal-audit",
        title: "Internal Audit",
        description:
          "Plan audits, capture findings, and close loops with accountable follow-up.",
      },
      {
        id: "competency-assessment",
        anchor: "competency",
        title: "Competency Assessment",
        description:
          "Assess and approve competency before staff perform critical tasks.",
      },
      {
        id: "employee-training",
        anchor: "training",
        title: "Employee Training",
        description:
          "Assign, deliver, and document training tied to roles and procedures.",
      },
    ],
  },
  {
    id: "operations",
    title: "The bench",
    summary: "Monitoring, assessment, logs, suggestions and delegated duties.",
    modules: [
      {
        id: "environment-monitoring",
        anchor: "monitoring",
        title:
          "Integrated Temperature and Humidity Monitoring with Automated Logsheets",
        menuLabel: "Temp & humidity monitoring",
        description:
          "Continuous environmental monitoring with automated log sheets and alerts.",
      },
      {
        id: "monthly-quality-assessment",
        anchor: "quality-assessment",
        title: "Monthly Quality Assessment",
        menuLabel: "Monthly quality assessment",
        description:
          "Structured monthly reviews with metrics, trends, and management input.",
      },
      {
        id: "calibration-maintenance",
        anchor: "calibration",
        title: "Calibration & Maintenance",
        description:
          "Schedules, work orders, and evidence for calibrated equipment and upkeep.",
      },
      {
        id: "temperature-log-sheets",
        anchor: "temperature-logs",
        title: "Temperature Log Sheets",
        description:
          "Digital log sheets for refrigerators, freezers, and critical storage.",
      },
      {
        id: "employee-suggestions",
        anchor: "suggestions",
        title: "Employee Suggestions",
        description:
          "Capture frontline ideas and route them through review and implementation.",
      },
      {
        id: "lab-director-delegation",
        anchor: "delegation",
        title: "Laboratory Director's Delegation of Duties",
        menuLabel: "Director delegation of duties",
        description:
          "Document delegated authority with clear scope, dates, and traceability.",
      },
    ],
  },
  {
    id: "workforce",
    title: "People and access",
    summary: "Inventory, roles, evaluation, personnel records and permissions.",
    modules: [
      {
        id: "inventory-management",
        anchor: "inventory",
        title: "Inventory Management",
        description:
          "Reagents and consumables by lot, location and quantity, with purchasing through to received.",
      },
      {
        id: "job-descriptions-kpis",
        anchor: "job-descriptions",
        title: "Job Descriptions with Key Performance Indicators",
        menuLabel: "Job descriptions & KPIs",
        description:
          "Maintain role definitions with measurable KPIs in one system of record.",
      },
      {
        id: "performance-evaluation",
        anchor: "performance",
        title: "Performance Evaluation",
        description:
          "Run evaluation cycles aligned with job expectations and quality goals.",
      },
      {
        id: "employee-records",
        anchor: "employee-records",
        title: "Employee Records",
        description:
          "Centralize personnel quality records required for inspections.",
      },
      {
        id: "access-control",
        anchor: "access-control",
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
