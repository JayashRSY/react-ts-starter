import { useState } from "react";
import { Link } from "react-router-dom";
import { Bike, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const BikesList = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - in a real app, this would come from an API
  const bikes = [
    { id: 1, name: "City Cruiser", type: "City", price: 25, rating: 4.8, location: "Downtown" },
    { id: 2, name: "Mountain Explorer", type: "Mountain", price: 35, rating: 4.9, location: "Uptown" },
    { id: 3, name: "Road Master", type: "Road", price: 30, rating: 4.7, location: "Westside" },
    { id: 4, name: "Electric City", type: "Electric", price: 45, rating: 4.9, location: "Downtown" },
    { id: 5, name: "Hybrid Commuter", type: "Hybrid", price: 28, rating: 4.6, location: "Eastside" },
    { id: 6, name: "Kids Adventure", type: "Kids", price: 15, rating: 4.5, location: "Southside" },
  ];

  // Filter bikes based on search and price range
  const filteredBikes = bikes.filter(bike => 
    bike.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    bike.price >= priceRange[0] && 
    bike.price <= priceRange[1]
  );

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Available Bikes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 space-y-6 p-6 bg-muted/30 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input 
                  id="search" 
                  placeholder="Search bikes..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Label>Price Range ($/hour)</Label>
                <div className="pt-4 px-2">
                  <Slider 
                    defaultValue={[0, 100]} 
                    max={100} 
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <Label>Bike Types</Label>
                <div className="space-y-2 mt-2">
                  {["City", "Mountain", "Road", "Electric", "Hybrid", "Kids"].map(type => (
                    <div key={type} className="flex items-center">
                      <input type="checkbox" id={type} className="mr-2" />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bikes grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBikes.length > 0 ? (
              filteredBikes.map(bike => (
                <Card key={bike.id} className="overflow-hidden group">
                  <div className="relative h-48 bg-muted">
                    <img 
                      src={`https://source.unsplash.com/random/300x200?bike,bicycle&sig=${bike.id}`} 
                      alt={bike.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{bike.name}</h3>
                      <span className="font-bold text-primary">${bike.price}/hr</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{bike.location}</span>
                      <span className="mx-2">•</span>
                      <span>{bike.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-sm mr-1">Rating:</span>
                        <span className="font-medium">{bike.rating}</span>
                      </div>
                      <Link to={`/bikes/${bike.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Bike className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No bikes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikesList;