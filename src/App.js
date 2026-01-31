import { useCallback, useEffect, useState } from 'react';
import './App.css';
import BudgetCard from './components/BudgetCard';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { fetchBudgetStats, fetchWithRetry } from './services/budgetApi';
import ErrorState from './components/ErrorState';
import SortDropdown from './components/SortDropdown';
import SearchBar from './components/SearchBar';

function App() {
  const [filter, setFilter] = useState('all'); // State: 'all' , 'Positive',
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Fetch data from API
  const loadBudgetData = async () => {
    setIsLoading(true)
    setError(null);


    try {
      // Use retry logic for better reliability
      const budgetData = await fetchWithRetry(fetchBudgetStats);
      setData(budgetData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading budget data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect (() => {
    loadBudgetData();
  }, []);

  // Search handler with useCallback to prevent re-renders
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Sort handler
  const handleSort = (sortOption) => {
    setSortBy(sortOption);
  }

  // Filter, Search, and sort logic
  const getFilteredAndSortedStates = ()  =>{
    let results = [...data];

    // 1. Apply filter (dall/positive/negative)
    
    results = results.filter((stat) => {
      if (filter === 'all') return true;
      if (filter === 'positive') return stat.growthPositive === true;
      if (filter === 'negative') return stat.growthPositive === false;
      return true;
    });

    //2. Apply Search
    if (searchQuery) {
      results = results.filter((stat) => 
        stat.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    //3. Apply sort
    if(sortBy === 'amount-high'){
      results.sort((a, b) => {
        const amountA = parseInt(a.amount.replace(/[^0-9]/g, ''));
        const amountB = parseInt(b.amount.replace(/[^0-9]/g, ''));
        return amountB - amountA;
      });
    } else if (sortBy === 'amount-low'){
      results.sort((a,b) => {
        const amountA = parseInt(a.amount.replace(/[^0-9]/g, ''));
        const amountB = parseInt(b.amount.replace(/[^0-9]/g, ''));
        return amountA - amountB;
      });
    } else if (sortBy === 'title-asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));

    }else if (sortBy === 'title-desc') {
      results.sort((a, b) => b.title.localeCompare(a.title));
    }

    return results;
  }
  const filteredStats = getFilteredAndSortedStates();

  
  return (
    <div className="App">
      <div className='header' >
        <h1>Budget Dashboard</h1>

        {/* Search and Sort Controls */}
        <div className='controls'>
          <SearchBar onSearch= {handleSearch} />
          <SortDropdown onSort={handleSort} currentSort={sortBy} />
        </div>

        {/*  Filter Buttons */}
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            disabled={isLoading || error}
            >
              All ({data.length})
            </button>
          <button 
            className={filter === 'positive' ? 'active' : ''}
            onClick={() => setFilter('positive')}
            disabled={isLoading || error}
            >
              Growth 
            </button>
          <button 
            className={filter === 'negative' ? 'active' : ''}
            onClick={() => setFilter('negative')}
            disabled={isLoading || error}
            >
              Declining
            </button>
        </div>
      </div>
      {/* Loading State */}
      {isLoading && <LoadingSpinner />}
      
      {/* Error State */}
      {!isLoading && error && <ErrorState onRetry={loadBudgetData} />}

      {/* Empty state */}
      {!isLoading && !error && filteredStats.length === 0 && (
        <EmptyState
          title='No matching results'
          message={searchQuery
            ? `No projects found matching "${searchQuery}"`
            : "Try adjusting your filters to see more data."
          }
         /> 
         )}
        

      {/* Cards Grid */}
      {!isLoading && !error && filteredStats.length > 0 && (
        <div className='card-grid'>
          {filteredStats.map((stat, index) => (
            <BudgetCard 
              key={stat.id}
              {...stat}
              index={index} // pass array index to component
              />
          ))}
        </div>
      )}
      
    </div>
  );
}

export default App;