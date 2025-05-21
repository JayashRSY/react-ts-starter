import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Star, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BikeDetails = () => {
  const { bikeId } = useParams<{ bikeId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock data - in a real app, this would come from an API based on bikeId
  const bike = {
    id: bikeId,
    name: "Mountain Explorer Pro",
    type: "Mountain",
    price: 35,
    rating: 4.9,
    location: "Downtown Hub",
    description: "Experience the thrill of mountain trails with our premium Mountain Explorer Pro. This bike features a lightweight aluminum frame, 27-speed Shimano gears, and hydraulic disc brakes for superior control on any terrain.",
    features: [
      "Aluminum frame",
      "27-speed Shimano gears",
      "Hydraulic disc brakes",
      "Front suspension",
      "Tubeless-ready wheels",
      "Adjustable seat post"
    ],
    specifications: {
      frame: "Aluminum Alloy",
      fork: "RockShox XC 30",
      shifters: "Shimano Deore",
      brakes: "Shimano Hydraulic Disc",
      wheels: "29-inch Tubeless Ready",
      tires: "Maxxis Ardent 2.25"
    },
    images: [
      `https://source.unsplash.com/random/600x400?mountain,bike&sig=1${bikeId}`,
      `https://source.unsplash.com/random/600x400?mountain,bike&sig=2${bikeId}`,
      `https://source.unsplash.com/random/600x400?mountain,bike&sig=3${bikeId}`,
      `https://source.unsplash.com/random/600x400?mountain,bike&sig=4${bikeId}`
    ],
    reviews: [
      { id: 1, user: "Alex Johnson", rating: 5, comment: "Excellent bike, smooth ride on rough terrain." },
      { id: 2, user: "Sarah Miller", rating: 4, comment: "Great bike overall, though the seat could be more comfortable." },
      { id: 3, user: "Michael Chen", rating: 5, comment: "Perfect for weekend adventures. The gears shift seamlessly." }
    ]
  };

  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image gallery */}
        <div className="lg:w-3/5">
          <div className="mb-4 rounded-lg overflow-hidden bg-muted">
            <img 
              src={bike.images[selectedImage]} 
              alt={bike.name} 
              className="w-full h-[400px] object-cover" 
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {bike.images.map((image, index) => (
              <div 
                key={index} 
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${bike.name} view ${index + 1}`} className="w-full h-20 object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Bike details */}
        <div className="lg:w-2/5">
          <h1 className="text-3xl font-bold mb-2">{bike.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="ml-1 font-medium">{bike.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{bike.location}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">{bike.description}</p>
          
          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Rental Price</span>
              <span className="text-2xl font-bold text-primary">${bike.price}/hour</span>
            </div>
            <Link to={`/booking/${bike.id}`}>
              <Button className="w-full" size="lg">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="text-primary h-5 w-5" />
                <div>
                  <h3 className="font-medium">Availability</h3>
                  <p className="text-sm text-muted-foreground">24/7 Pickup</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Shield className="text-primary h-5 w-5" />
                <div>
                  <h3 className="font-medium">Insurance</h3>
                  <p className="text-sm text-muted-foreground">Included</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Tabs for features, specs, reviews */}
      <div className="mt-12">
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="p-4">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {bike.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="specifications" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(bike.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium capitalize">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-4">
            <div className="space-y-4">
              {bike.reviews.map(review => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BikeDetails;