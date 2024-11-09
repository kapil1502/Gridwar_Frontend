import React, { useState } from 'react';
import axios from "axios";
import { Upload, AlertCircle, Camera, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/label';

const ProductExtraction = () => {
  const [images, setImages] = useState({ front: null, back: null, side: null });
  const [processedImage, setProcessedImage] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (type) => (event) => {
    const file = event.target.files[0];
    setImages(prev => ({ ...prev, [type]: file }));
  };

  const removeImage = (type) => {
    setImages(prev => ({ ...prev, [type]: null }));
  };

  const resetStates = () => {
    setImages({ front: null, back: null, side: null });
    setProcessedImage(null);
    setItemInfo(null);
    setError(null);
  };

  const handleImageUpload = async () => {
    if (!images.front) {
      setError("Front image is required");
      return;
    }

    setLoading(true);
    resetStates();

    const formData = new FormData();
    Object.entries(images).forEach(([key, value]) => {
      if (value) formData.append(`${key}_image`, value);
    });

    try {
      const [detectionResponse, extractionResponse] = await Promise.all([
        axios.post("http://127.0.0.1:5000/image-text-detection", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        }),
        axios.post("http://127.0.0.1:5000/image-text-extraction", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
      ]);

      setProcessedImage(detectionResponse.data.image);
      setItemInfo(extractionResponse.data.item_information);
    } catch (error) {
      console.error("Error processing images:", error);
      setError("An error occurred while processing the images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-3xl font-bold text-center">
            Product Information Extraction
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {['front', 'back', 'side'].map((type) => (
              <div key={type} className="relative">
                <Label htmlFor={`${type}-image`} className="block mb-2 font-medium text-gray-700 capitalize">
                  {type} Image
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {images[type] ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(images[type])}
                          alt={`${type} preview`}
                          className="mx-auto h-32 w-32 object-cover rounded"
                        />
                        <button
                          onClick={() => removeImage(type)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor={`${type}-image`}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <Input
                              id={`${type}-image`}
                              name={`${type}-image`}
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange(type)}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleImageUpload} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" disabled={loading}>
            {loading ? (
              <span className="animate-spin mr-2">⌛</span>
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Processing...' : 'Upload and Process'}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processedImage && (
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
              <CardTitle className="text-xl font-semibold">Processed Image</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <img src={`data:image/jpeg;base64,${processedImage}`} alt="Processed" className="w-full" />
            </CardContent>
          </Card>
        )}

        {itemInfo && (
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <CardTitle className="text-xl font-semibold">Item Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(JSON.parse(itemInfo)).map(([key, value]) => (
                  <li key={key} className="bg-gray-100 p-3 rounded-md shadow transition duration-300 ease-in-out hover:shadow-md">
                    <span className="font-medium text-indigo-600">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductExtraction;


// import React, { useState } from 'react';
// import axios from "axios";
// import "./ProductExtraction.css";
// import { Upload, AlertCircle, Camera } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
// import { Button } from '../components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Input } from '../components/ui/Input';
// import { Label } from '../components/ui/label';

// const ProductExtraction = () => {
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [sideImage, setSideImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [processedImage, setProcessedImage] = useState(null);
//   const [itemInfo, setItemInfo] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFrontImageChange = event => {
//     setFrontImage(event.target.files[0])
//     setSelectedImage(event.target.files[0])
//   }

//   const handleBackImageChange = event => {
//     setBackImage(event.target.files[0])
//   }

//   const handleSideImageChange = event => {
//     setSideImage(event.target.files[0])
//   }

//   const resetStates = () => {
//     setFrontImage(null);
//     setBackImage(null);
//     setSideImage(null);
//     setProcessedImage(null);
//     setItemInfo(null);
//     setError(null);
//     setSelectedImage(null);
//   };

//  const handleImageUpload = async () => {
//     if (!frontImage) {
//       setError("Front image is required");
//       return;
//     }

//     setLoading(true); // Staring the loading procedure
//     resetStates();

//     const formData = new FormData();
//     formData.append('front_image', frontImage);
//     formData.append('image', frontImage)
//     if (backImage) formData.append('back_image', backImage);
//     if (sideImage) formData.append('side_image', sideImage);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/image-text-detection", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       })
//       console.log(response.data['image'])
//       setProcessedImage(response.data.image)

//       const anotherResponse =  await axios.post("http://127.0.0.1:5000/image-text-extraction", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       })
//       setItemInfo(anotherResponse.data.item_information)
//     } catch (error) {
//       console.error("Error detecting text:", error)
//       setError("An error occurred while processing the image.")
//     }
//     finally {
//            setLoading(false);
//          }
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-primary"> Product Information Extraction Using OCR </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           <input type="file" accept="image/*" onChange={handleFrontImageChange} />
//           <input type="file" accept="image/*" onChange={handleBackImageChange} />
//           <input type="file" accept="image/*" onChange={handleSideImageChange} />
//           </div>

//           <Button onClick={handleImageUpload} className="w-full" disabled={loading}>
//             {loading ? (
//               <span className="animate-spin mr-2">⌛</span>
//             ) : (
//               <Upload className="mr-2 h-4 w-4" />
//             )}
//             {loading ? 'Processing...' : 'Upload and Process'}
//           </Button>
//         </CardContent>
//       </Card>

//       {error && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {processedImage && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold">Processed Image</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <img src={`data:image/jpeg;base64,${processedImage}`} alt="Processed" className="w-full rounded-md shadow-md" />
//             </CardContent>
//           </Card>
//         )}

//         {itemInfo && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold">Item Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 {Object.entries(JSON.parse(itemInfo)).map(([key, value]) => (
//                   <li key={key} className="bg-gray-100 p-2 rounded-md">
//                     <span className="font-medium">{key}:</span> {value}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductExtraction;