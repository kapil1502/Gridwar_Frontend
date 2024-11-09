import React from 'react';
import { Link } from 'react-router-dom';
import { Fuel, Package2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

// Placeholder components for demonstration
const FreshProduceAnalyzer = () => <div>Fresh Produce Analyzer Component</div>;
const ProductExtractor = () => <div>Product Extractor Component</div>;

const Homescreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Welcome to FreshTech</h1>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-6 w-6 text-green-500" />
              <span>Fresh Produce Analyzer</span>
            </CardTitle>
            <CardDescription>Analyze and track the freshness of your produce</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/fresh-produce-analyzer"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Go to Analyzer
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-6 w-6 text-blue-500" />
              <span>Product Extractor</span>
            </CardTitle>
            <CardDescription>Extract and manage product information efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/product-extractor"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Go to Extractor
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Homescreen;