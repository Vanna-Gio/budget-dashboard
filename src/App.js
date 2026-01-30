import './App.css';
import BudgetCard from './components/BudgetCard';
import './components/BudgetCard.css';

function App() {
  return (
    <div className="App">
      <h1>Budget Dashboard</h1>
      <div className="card-grid">
        <BudgetCard 
          icon="💰"
          title="Total Budget"
          amount="$2,450,000"
          growth="+12.5% from last quarter"
          growthPositive={true}
        />
        <BudgetCard 
          icon="📊"
          title="Active Projects"
          amount="47"
          growth="-3 from last month"
          growthPositive={false}
        />
        <BudgetCard 
          icon="✅"
          title="Completed"
          amount="128"
          growth="+8 this quarter"
          growthPositive={true}
        />
      </div>
    </div>
  );
}

export default App;