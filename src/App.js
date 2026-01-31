import { useEffect, useState } from 'react';
import './App.css';
import BudgetCard from './components/BudgetCard';
// import { budgetStats } from './data/mockData';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { fetchBudgetStats, fetchWithRetry } from './services/budgetApi';
import ErrorState from './components/ErrorState';

function App() {
  const [filter, setFilter] = useState('all'); // State: 'all' , 'Positive',
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [error, setError] = useState(null);

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

  //Filter logic 
  const filteredStats = data.filter((stat) => {
    if (filter === 'all') return true;
    if (filter === 'positive') return stat.growthPositive === true;
    if (filter === 'negative') return stat.growthPositive === false;
    return true;
  });
  return (
    <div className="App">
      <div className='header' >
        <h1>Budget Dashboard</h1>
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
      {!isLoading && !error && <ErrorState onRetry={loadBudgetData} />}

      {/* Empty state */}
      {!isLoading && filteredStats.length === 0 && <EmptyState /> }
        

      {/* Cards Grid */}
      {!isLoading && filteredStats.length > 0 && (
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