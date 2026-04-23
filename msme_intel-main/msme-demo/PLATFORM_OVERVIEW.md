# MSME Intelligence Platform: Platform Overview & Outline

## 1. Platform Mission & Objective
The **MSME Intelligence Platform** is a strategic tool designed for financial institutions (Banks), government bodies, and ecosystem enablers to **identify, assess, and accelerate** high-potential MSMEs. By leveraging AI-driven data processing of Udyam exports and self-reported data, the platform bridges the gap between raw regional data and actionable growth roadmaps.

---

## 2. Role-Based Access Control (RBAC)

The demo environment supports five distinct personas, each with a tailored dashboard and set of capabilities:

| Role | Name | Primary Objective | Access Level |
| :--- | :--- | :--- | :--- |
| **admin** | **Administrator** | Full platform governance and user management. | **ROOT**: Access to all slugs and settings. |
| **analyst** | **Strategic Analyst** | Processing regional data and identifying macro trends. | **FULL DATA**: Intelligence upload, funnel management, and company deep-dives. |
| **expert** | **Domain Expert** | Validating technical roadmaps and sector-specific theses. | **VALIDATION**: Expert review portal, regional intel, and programs. |
| **company_owner** | **MSME Owner** | Maintaining company profile and tracking growth milestones. | **SELF-SERVICE**: Limited to the `/portal` for their specific company. |
| **viewer** | **Public / Viewer** | High-level ecosystem monitoring. | **READ-ONLY**: Dashboard, Sectors, Ecosystem, and Programs. |

---

## 3. Navigation & Slug Architecture

Each component of the platform is mapped to a specific URL slug. Below is a deep-dive into each module:

### 📊 **Dashboard** (`/dashboard`)
*   **What's in it**: High-level KPIs (Total Companies, Avg Growth Rate, Portfolio Value), Funnel Conversion charts, Sector Distribution, Top Performers, and Recent Activity Feed.
*   **Target Audience**: All roles (Read-only for Viewers).

### 🧠 **Intelligence Engine** (`/intelligence`)
*   **What's in it**: The ingestion point for bulk regional data (Udyam exports). Analysts upload XLSX/CSV files, and the platform uses AI to perform **Gap Analysis**, **Cluster Mapping**, and **Opportunity Matrixing**.
*   **Target Audience**: Analysts and Admins.

### 🌪️ **Analysis Funnel** (`/funnel`)
*   **What's in it**: A detailed 6-stage lifecycle tracking system:
    1.  **Upload**: initial data ingestion.
    2.  **Thesis Score**: Initial potential assessment.
    3.  **Financials**: Deep-dive into fiscal health.
    4.  **RAG Classification**: Red/Amber/Green status based on risk.
    5.  **Gap Analysis**: Identifying specific infrastructure or skill deficits.
    6.  **Roadmap**: Final strategic growth plan generation.
*   **Target Audience**: Analysts and Admins.

### 🏢 **Company Master** (`/companies`)
*   **What's in it**: A filterable database of every company in the ecosystem. Includes search capabilities and direct links to individual company deep-dive pages (e.g., `/companies/aeq-001`).
*   **Target Audience**: Analysts, Admins, and Experts.

### 📄 **Sector Thesis** (`/sectors`)
*   **What's in it**: Industry-specific deep-dives (e.g., Aerospace, Precision Engineering). Contains market data, growth drivers, sub-sector breakdowns, and policy analysis relevant to each sector.
*   **Target Audience**: All roles.

### 🕸️ **Ecosystem & Regional Intel** (`/ecosystem`, `/regional`)
*   **What's in it**: Network visualizations showing the interconnectivity between MSMEs, tier-1 suppliers, and government facilities. The `/regional` slug provides geographic heatmaps of industrial clusters.
*   **Target Audience**: All roles.

### 🎯 **Programs & Challenges** (`/programs`)
*   **What's in it**: List of active government initiatives, bank programs, and specific industrial challenges MSMEs can apply for.
*   **Target Audience**: All roles (Public engagement).

### ✅ **Expert Review Portal** (`/experts`)
*   **What's in it**: A specialized validation interface where domain experts review and sign off on company roadmaps and assessments.
*   **Target Audience**: Experts, Analysts, and Admins.

### 🏠 **MSME Portal** (`/portal/company`)
*   **What's in it**: A private, authenticated space for the MSME owner to verify their self-reported data, view their current roadmap, and download assessment reports.
*   **Target Audience**: Company Owners only.

---

## 4. The Intelligence Lifecycle (Data Flow)

The platform operates on a clear linear data flow:

1.  **Ingestion**: Regional data (Udyam/CSV) is uploaded via the **Intelligence Engine**.
2.  **Triaging**: AI classifies companies based on sector and growth potential (Thesis Score).
3.  **Assessment**: Companies move through the **Analysis Funnel**, undergoing financial and gap analysis.
4.  **Validation**: **Domain Experts** review the assessment results.
5.  **Output**: A **Strategic Roadmap** is generated for the MSME, while **Banks** receive a RAG-classified portfolio view for credit/support decision-making.
