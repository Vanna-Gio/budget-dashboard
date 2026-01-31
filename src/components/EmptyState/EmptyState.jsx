import './EmptyState.css';

function EmptyState({ 
  icon = "📊", 
  title = "No results found",
  message = "Try adjusting your filters to see more data."
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;