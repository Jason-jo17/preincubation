// src/constants/functionalities.ts

export const FUNCTIONALITIES = [
  // Inventory & Stock
  { id: 'inventory-tracking', name: 'Inventory Tracking', category: 'Inventory' },
  { id: 'stock-alerts', name: 'Stock Level Alerts', category: 'Inventory' },
  { id: 'reorder-automation', name: 'Automatic Reordering', category: 'Inventory' },
  
  // Sales & CRM
  { id: 'lead-management', name: 'Lead Management', category: 'Sales' },
  { id: 'quote-generation', name: 'Quote Generation', category: 'Sales' },
  { id: 'order-processing', name: 'Order Processing', category: 'Sales' },
  { id: 'customer-segmentation', name: 'Customer Segmentation', category: 'Sales' },
  
  // Finance
  { id: 'invoice-automation', name: 'Invoice Automation', category: 'Finance' },
  { id: 'expense-tracking', name: 'Expense Tracking', category: 'Finance' },
  { id: 'payment-reconciliation', name: 'Payment Reconciliation', category: 'Finance' },
  { id: 'financial-reporting', name: 'Financial Reporting', category: 'Finance' },
  
  // HR & Operations
  { id: 'attendance-tracking', name: 'Attendance Tracking', category: 'HR' },
  { id: 'leave-management', name: 'Leave Management', category: 'HR' },
  { id: 'payroll-processing', name: 'Payroll Processing', category: 'HR' },
  { id: 'recruitment-automation', name: 'Recruitment Automation', category: 'HR' },
  
  // Production
  { id: 'production-planning', name: 'Production Planning', category: 'Production' },
  { id: 'quality-control', name: 'Quality Control', category: 'Production' },
  { id: 'maintenance-scheduling', name: 'Maintenance Scheduling', category: 'Production' },
  { id: 'equipment-monitoring', name: 'Equipment Monitoring', category: 'Production' },
  
  // Customer Service
  { id: 'ticket-management', name: 'Ticket Management', category: 'Support' },
  { id: 'feedback-collection', name: 'Feedback Collection', category: 'Support' },
  { id: 'faq-automation', name: 'FAQ Automation', category: 'Support' },
  { id: 'complaint-resolution', name: 'Complaint Resolution', category: 'Support' },
  
  // Compliance & Legal
  { id: 'compliance-tracking', name: 'Compliance Tracking', category: 'Compliance' },
  { id: 'audit-logging', name: 'Audit Logging', category: 'Compliance' },
  { id: 'document-management', name: 'Document Management', category: 'Compliance' },
  { id: 'license-renewal', name: 'License Renewal Tracking', category: 'Compliance' },
] as const;
