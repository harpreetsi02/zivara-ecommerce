export default function PageWrapper({ children, className = "" }) {
  return (
    <div className={`w-full shadow-2xl md:max-w-[75%] md:mx-auto ${className}`}>
      {children}
    </div>
  );
}