import React from 'react';

const Input = React.forwardRef(({ type = "text", className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`border rounded p-2 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };