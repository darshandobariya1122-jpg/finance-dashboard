export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.USER]: 'Viewer',
};

export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const TRANSACTION_TYPES = ['income', 'expense'];

export const CATEGORY_OPTIONS = [
  'Salary',
  'Freelance',
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Travel',
  'Investment',
  'Education',
  'Insurance',
  'Other',
];

export const FILTER_DEFAULTS = {
  search: '',
  category: 'all',
  type: 'all',
  startDate: '',
  endDate: '',
  sortBy: 'date-desc',
};

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'amount-desc', label: 'Amount high to low' },
  { value: 'amount-asc', label: 'Amount low to high' },
  { value: 'category-asc', label: 'Category A-Z' },
  { value: 'category-desc', label: 'Category Z-A' },
];

export const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-dashboard-transactions',
  ROLE: 'finance-dashboard-role',
  THEME: 'finance-dashboard-theme',
};

export const SIDEBAR_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'insights', label: 'Insights' },
  { id: 'transactions', label: 'Transactions' },
];

export const CATEGORY_COLORS = {
  Salary: '#0f766e',
  Freelance: '#10b981',
  Food: '#f59e0b',
  Transport: '#3b82f6',
  Housing: '#f97316',
  Utilities: '#8b5cf6',
  Healthcare: '#ef4444',
  Entertainment: '#ec4899',
  Shopping: '#a855f7',
  Travel: '#14b8a6',
  Investment: '#0891b2',
  Education: '#6366f1',
  Insurance: '#64748b',
  Other: '#94a3b8',
};

export const SUMMARY_CARD_CONFIG = [
  {
    key: 'income',
    title: 'Total Income',
    accent: 'var(--success-500)',
    tone: 'positive',
  },
  {
    key: 'expense',
    title: 'Total Expense',
    accent: 'var(--danger-500)',
    tone: 'negative',
  },
  {
    key: 'balance',
    title: 'Total Balance',
    accent: 'var(--brand-500)',
    tone: 'neutral',
  },
];
