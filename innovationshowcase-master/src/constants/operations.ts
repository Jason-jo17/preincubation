// src/constants/operations.ts

export const OPERATIONS = {
  dataProcessing: {
    name: 'Data Processing',
    operations: [
      { id: 'data-entry', name: 'Automated Data Entry' },
      { id: 'data-validation', name: 'Data Validation' },
      { id: 'data-transformation', name: 'Data Transformation' },
      { id: 'data-migration', name: 'Data Migration' },
      { id: 'data-cleaning', name: 'Data Cleaning' },
      { id: 'data-enrichment', name: 'Data Enrichment' },
    ]
  },
  communication: {
    name: 'Communication',
    operations: [
      { id: 'email-automation', name: 'Email Automation' },
      { id: 'sms-notifications', name: 'SMS Notifications' },
      { id: 'whatsapp-integration', name: 'WhatsApp Integration' },
      { id: 'slack-alerts', name: 'Slack Alerts' },
      { id: 'report-generation', name: 'Report Generation' },
      { id: 'document-generation', name: 'Document Generation' },
    ]
  },
  analysis: {
    name: 'Analysis',
    operations: [
      { id: 'predictive-analytics', name: 'Predictive Analytics' },
      { id: 'sentiment-analysis', name: 'Sentiment Analysis' },
      { id: 'trend-analysis', name: 'Trend Analysis' },
      { id: 'anomaly-detection', name: 'Anomaly Detection' },
      { id: 'forecasting', name: 'Forecasting' },
      { id: 'classification', name: 'Classification' },
    ]
  },
  workflow: {
    name: 'Workflow',
    operations: [
      { id: 'approval-routing', name: 'Approval Routing' },
      { id: 'task-assignment', name: 'Task Assignment' },
      { id: 'status-tracking', name: 'Status Tracking' },
      { id: 'escalation', name: 'Escalation' },
      { id: 'scheduling', name: 'Scheduling' },
      { id: 'reminder-system', name: 'Reminder System' },
    ]
  },
  integration: {
    name: 'Integration',
    operations: [
      { id: 'api-connector', name: 'API Connector' },
      { id: 'database-sync', name: 'Database Sync' },
      { id: 'file-transfer', name: 'File Transfer' },
      { id: 'webhook-handler', name: 'Webhook Handler' },
      { id: 'erp-integration', name: 'ERP Integration' },
      { id: 'crm-integration', name: 'CRM Integration' },
    ]
  },
  aiCapabilities: {
    name: 'AI Capabilities',
    operations: [
      { id: 'nlp-processing', name: 'NLP Processing' },
      { id: 'image-recognition', name: 'Image Recognition' },
      { id: 'chatbot', name: 'Chatbot / Conversational AI' },
      { id: 'recommendation-engine', name: 'Recommendation Engine' },
      { id: 'content-generation', name: 'Content Generation' },
      { id: 'ocr', name: 'OCR / Document Understanding' },
    ]
  },
} as const;
