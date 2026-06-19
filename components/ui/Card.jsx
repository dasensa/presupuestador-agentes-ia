export default function Card({ children, hover = false, className = '', ...props }) {
  return (
    <div
      className={`ds-card${hover ? '-hover' : ''} p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
