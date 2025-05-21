import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Bike, Clock } from "lucide-react";
import { toast } from "sonner";

const MyBookings = () => {
  // This would come from your API in a real application
  const [bookings, setBookings] = useState([
    {
      id: "b1",
      bikeId: "bike1",
      bikeName: "City Cruiser",
      startDate: "2023-11-15",
      endDate: "2023-11-17",
      totalPrice: 89.97,
      location: "Downtown Station",
      status: "active"
    },
    {
      id: "b2",
      bikeId: "bike3",
      bikeName: "Mountain Explorer",
      startDate: "2023-12-05",
      endDate: "2023-12-07",
      totalPrice: 119.97,
      location: "Hill View Point",
      status: "upcoming"
    },
    {
      id: "b3",
      bikeId: "bike7",
      bikeName: "Road Master",
      startDate: "2023-10-20",
      endDate: "2023-10-22",
      totalPrice: 99.97,
      location: "Central Park",
      status: "completed"
    }
  ]);

  const handleCancelBooking = (bookingId: string) => {
    // In a real app, you would call an API to cancel the booking
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? {...booking, status: "cancelled"} : booking
    ));
    toast.success("Booking cancelled successfully");
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-gray-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">You don't have any bookings yet.</p>
          <Button className="mt-4" asChild>
            <a href="/bikes">Browse Bikes</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{booking.bikeName}</CardTitle>
                  {getStatusBadge(booking.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {booking.startDate} to {booking.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{booking.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Pickup at 9:00 AM</span>
                </div>
                <p className="font-semibold text-lg pt-2">${booking.totalPrice.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/20 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/bikes/${booking.bikeId}`}>View Bike</a>
                </Button>
                {booking.status === "upcoming" && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel
                  </Button>
                )}
                {booking.status === "completed" && (
                  <Button variant="outline" size="sm">
                    Leave Review
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;