import { createContext, useContext, useEffect, useReducer } from 'react';
import { mockTransactions } from '../data/mockData';
import {
  buildTransactionRecord,
  loadInitialState,
  saveRole,
  saveTheme,
  saveTransactions,
} from '../services/transactionService';
import { FILTER_DEFAULTS, ROLES, THEME_OPTIONS } from '../utils/constants';

const AppContext = createContext(null);

const baseState = {
  transactions: [],
  role: ROLES.ADMIN,
  filters: { ...FILTER_DEFAULTS },
  theme: THEME_OPTIONS.LIGHT,
  loading: false,
};

function createInitialState() {
  const data = loadInitialState(mockTransactions);

  return {
    ...baseState,
    transactions: data.transactions,
    role: data.role,
    theme: data.theme,
  };
}

function appReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        transactions: action.payload.transactions,
        role: action.payload.role,
        theme: action.payload.theme,
        loading: false,
      };
    case 'SET_ROLE':
      return {
        ...state,
        role: action.payload,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: { ...FILTER_DEFAULTS },
      };
    case 'UPSERT_TRANSACTION': {
      const existingIndex = state.transactions.findIndex(
        (transaction) => Number(transaction.id) === Number(action.payload.id),
      );

      if (existingIndex === -1) {
        return {
          ...state,
          transactions: [action.payload, ...state.transactions],
        };
      }

      const nextTransactions = [...state.transactions];
      nextTransactions[existingIndex] = action.payload;

      return {
        ...state,
        transactions: nextTransactions,
      };
    }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => Number(transaction.id) !== Number(action.payload),
        ),
      };
    case 'RESET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, undefined, createInitialState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    if (state.loading) {
      return;
    }

    saveTransactions(state.transactions);
    saveRole(state.role);
    saveTheme(state.theme);
  }, [state.loading, state.role, state.theme, state.transactions]);

  function setRole(role) {
    dispatch({
      type: 'SET_ROLE',
      payload: role,
    });
  }

  function toggleRole() {
    dispatch({
      type: 'SET_ROLE',
      payload: state.role === ROLES.ADMIN ? ROLES.USER : ROLES.ADMIN,
    });
  }

  function setTheme(theme) {
    dispatch({
      type: 'SET_THEME',
      payload: theme,
    });
  }

  function toggleTheme() {
    dispatch({
      type: 'SET_THEME',
      payload:
        state.theme === THEME_OPTIONS.LIGHT
          ? THEME_OPTIONS.DARK
          : THEME_OPTIONS.LIGHT,
    });
  }

  function updateFilters(partialFilters) {
    dispatch({
      type: 'SET_FILTERS',
      payload: partialFilters,
    });
  }

  function resetFilters() {
    dispatch({
      type: 'RESET_FILTERS',
    });
  }

  function saveTransaction(values) {
    const record = buildTransactionRecord(values, state.transactions);

    dispatch({
      type: 'UPSERT_TRANSACTION',
      payload: record,
    });
  }

  function removeTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  }

  function resetDemoData() {
    dispatch({
      type: 'RESET_TRANSACTIONS',
      payload: [],
    });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        canEdit: state.role === ROLES.ADMIN,
        setRole,
        toggleRole,
        setTheme,
        toggleTheme,
        updateFilters,
        resetFilters,
        saveTransaction,
        removeTransaction,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}
