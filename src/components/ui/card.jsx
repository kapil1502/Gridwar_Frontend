// import React from 'react';

// export const Card = ({ children, className = '' }) => {
//   return (
//     <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardHeader = ({ children, className = '' }) => {
//   return <div className={`p-4 border-b ${className}`}>{children}</div>;
// };

// export const CardTitle = ({ children, className = '' }) => {
//   return (
//     <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
//       {children}
//     </h2>
//   );
// };

// export const CardContent = ({ children, className = '' }) => {
//   return <div className={`p-4 ${className}`}>{children}</div>;
// };

import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }