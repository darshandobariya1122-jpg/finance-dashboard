import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  filterTransactions,
  getCategoryExpenseTotals,
  getMonthlySeries,
  getTotals,
  sortTransactions,
} from '../utils/calculations';

function useTransactions() {
  const app = useAppContext();
  const filteredTransactions = useMemo(
    () => filterTransactions(app.transactions, app.filters),
    [app.transactions, app.filters],
  );
  const visibleTransactions = useMemo(
    () => sortTransactions(filteredTransactions, app.filters.sortBy),
    [filteredTransactions, app.filters.sortBy],
  );
  const totals = useMemo(() => getTotals(visibleTransactions), [visibleTransactions]);
  const allTotals = useMemo(() => getTotals(app.transactions), [app.transactions]);
  const expenseByCategory = useMemo(
    () => getCategoryExpenseTotals(visibleTransactions),
    [visibleTransactions],
  );
  const monthlySeries = useMemo(
    () => getMonthlySeries(visibleTransactions),
    [visibleTransactions],
  );

  return {
    ...app,
    visibleTransactions,
    totals,
    allTotals,
    expenseByCategory,
    monthlySeries,
    resultCount: visibleTransactions.length,
    totalCount: app.transactions.length,
  };
}

export default useTransactions;
