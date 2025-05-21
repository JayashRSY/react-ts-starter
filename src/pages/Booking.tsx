import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/separator";

const Booking = () => {
  const { bikeId } = useParams<{ bikeId: string }>();
  const navigate = useNavigate();
  
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    helmet: false,
    lock: false,
    basket: false
  });
  
  // Mock data - in a real app, this would come from an API based on bikeId
  const bike = {
    id: bikeId,
    name: "Mountain Explorer Pro",
    type: "Mountain",
    price: 35,
    location: "Downtown Hub",
    image: `https://source.unsplash.com/random/300x200?mountain,bike&sig=${bikeId}`
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Booking details:", { bikeId, ...bookingDetails });
    // Navigate to checkout
    navigate("/checkout");
  };
  
  // Calculate rental duration and total price
  const calculateTotal = () => {
    // This is a simplified calculation
    // In a real app, you would calculate based on actual dates and times
    const basePrice = bike.price * 4; // Assuming 4 hours for this example
    const extrasPrice = (
      (bookingDetails.helmet ? 5 : 0) + 
      (bookingDetails.lock ? 3 : 0) + 
      (bookingDetails.basket ? 2 : 0)
    );
    return {
      basePrice,
      extrasPrice,
      total: basePrice + extrasPrice
    };
  };
  
  const { basePrice, extrasPrice, total } = calculateTotal();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Book Your Bike</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Rental Period
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      name="startDate" 
                      type="date" 
                      required 
                      value={bookingDetails.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate" 
                      name="endDate" 
                      type="date" 
                      required 
                      value={bookingDetails.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input 
                      id="startTime" 
                      name="startTime" 
                      type="time" 
                      required 
                      value={bookingDetails.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input 
                      id="endTime" 
                      name="endTime" 
                      type="time" 
                      required 
                      value={bookingDetails.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Additional Equipment</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="helmet" 
                        name="helmet" 
                        checked={bookingDetails.helmet}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="helmet">Helmet</Label>
                    </div>
                    <span>+$5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="lock" 
                        name="lock" 
                        checked={bookingDetails.lock}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="lock">Bike Lock</Label>
                    </div>
                    <span>+$3</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="basket" 
                        name="basket" 
                        checked={bookingDetails.basket}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="basket">Basket</Label>
                    </div>
                    <span>+$2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" size="lg" className="w-full">
              Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="w-20 h-20 object-cover rounded-md" 
                />
                <div>
                  <h3 className="font-medium">{bike.name}</h3>
                  <p className="text-sm text-muted-foreground">{bike.type} • {bike.location}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price (4 hours)</span>
                  <span>${basePrice}</span>
                </div>
                {extrasPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Additional Equipment</span>
                    <span>${extrasPrice}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
              
              <div className="mt-6 bg-muted/30 p-3 rounded-md flex items-start gap-2">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  A security deposit of $100 will be held but not charged unless there is damage to the bike.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;