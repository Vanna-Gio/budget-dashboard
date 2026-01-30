import './App.css';
import BudgetCard from './components/BudgetCard';
import './components/BudgetCard.css';
import { budgetStats } from './data/mockData';

function App() {
  return (
    <div className="App">
      <h1>Budget Dashboard</h1>
      <div className="card-grid">
        {budgetStats.map((stat) =>(
            <BudgetCard
              key={stat.id}
              {...stat}
          />
        ))}
        
        
      </div>
    </div>
  );
}

export default App;