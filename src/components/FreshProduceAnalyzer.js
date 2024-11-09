import React, { useState } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react';
import Progress from '../components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const FreshProduceAnalyzer = () => {
  const [inputImage, setInputImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [detectedFruits, setDetectedFruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setInputImage(file);
    setResultImage(URL.createObjectURL(file));
  };

  const analyzeImage = async () => {
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', inputImage);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/fresh-image-analysis', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const { resultImage, detectedFruits } = response.data;
      
      setResultImage(`data:image/jpeg;base64,${resultImage}`);
      setDetectedFruits(detectedFruits);
    } catch (err) {
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Fresh Produce Analyzer
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Image Analysis</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full h-64 mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                {resultImage ? (
                  <img src={resultImage} alt="Result" className="w-full h-full object-cover" />
                ) : (
                  <label htmlFor="imageUpload" className="cursor-pointer text-center">
                    <Upload size={48} className="text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Upload an image</span>
                  </label>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <Button
                onClick={analyzeImage}
                disabled={!inputImage || loading}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Analyze Freshness
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Detected Fruits</CardTitle>
            </CardHeader>
            <CardContent>
              {detectedFruits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detectedFruits.map((fruit, index) => (
                    <Card key={index} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
                        <CardTitle className="text-xl font-semibold">{fruit.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Freshness</p>
                            <Progress 
                              value={fruit.freshnessIndex} 
                              className="h-2 bg-gray-200"
                              indicatorClassName={`bg-gradient-to-r from-red-500 via-yellow-500 to-green-500`}
                            />
                            <p className="text-sm text-gray-500 mt-1">{fruit.freshnessIndex}% Fresh</p>
                          </div>
                          <Alert variant="default" className="bg-green-50 border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <AlertTitle className="text-green-700">Condition</AlertTitle>
                            <AlertDescription className="text-green-600">{fruit.freshness}</AlertDescription>
                          </Alert>
                          <Alert variant="default" className="bg-blue-50 border-blue-200">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <AlertTitle className="text-blue-700">Shelf Life</AlertTitle>
                            <AlertDescription className="text-blue-600">{fruit.shelfLife}</AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">No fruits detected yet. Upload and analyze an image to see results.</p>
              )}
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FreshProduceAnalyzer;