import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import * as z from "zod";
// TODO: Replace with actual constants or import from your utils/constants
const CATEGORIES = ["Shopping", "Travel", "Dining"];
const CREDIT_CARDS = [
  { id: "card1", name: "Card One", bank: "Bank A" },
  { id: "card2", name: "Card Two", bank: "Bank B" },
];
const PLATFORMS = ["Amazon", "Flipkart", "Swiggy"];
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Upload, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Form schema
const formSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
  platform: z.string().min(1, "Please select a platform"),
  category: z.string().min(1, "Please select a category"),
  userCards: z.array(z.string()).default([]),
});

export default function CardRecommender() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recommendationResult, setRecommendationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      amount: 0,
      platform: "",
      category: "",
      userCards: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // TODO: Replace with your real API endpoint
      const res = await fetch('/api/cards/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setRecommendationResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Credit Card Recommender
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Find the perfect credit card for your purchase and maximize your rewards with our AI-powered recommendation system.
          </p>
        </div>

        <div className={`grid gap-8 ${recommendationResult ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-3xl mx-auto w-full'}`}>
          <div className={recommendationResult ? 'md:col-span-2' : 'col-span-1'}>
            <Card className="shadow-lg border-t-4 border-t-blue-500">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                  Transaction Details
                </CardTitle>
                <CardDescription className="text-base">
                  Enter your purchase details to get personalized card recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Amount (₹)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter amount"
                                className="focus-visible:ring-blue-500"
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              How much are you planning to spend?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Platform</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="focus-visible:ring-blue-500">
                                  <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
                                {PLATFORMS.map((platform: string) => (
                                  <SelectItem key={platform} value={platform}>
                                    {platform}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs">
                              Where are you making this purchase?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-blue-500">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CATEGORIES.map((category: string) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">
                            What category does this purchase fall under?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="userCards"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-sm font-semibold">Your Credit Cards</FormLabel>
                            <FormDescription className="text-xs">
                              Select the credit cards you currently have
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {CREDIT_CARDS.map((card: { id: string; name: string; bank: string }) => (
                              <FormField
                                key={card.id}
                                control={form.control}
                                name="userCards"
                                render={({ field }) => {
                                  const isSelected = field.value?.includes(card.id);
                                  return (
                                    <FormItem
                                      key={card.id}
                                      className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-all cursor-pointer ${
                                        isSelected ? 'bg-blue-50 border-blue-200' : ''
                                      }`}
                                      onClick={() => {
                                        const currentValue = field.value || [];
                                        const newValue = isSelected
                                          ? currentValue.filter((id: string) => id !== card.id)
                                          : [...currentValue, card.id];
                                        field.onChange(newValue);
                                      }}
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={isSelected}
                                          className={isSelected ? 'text-blue-500 border-blue-500' : ''}
                                          onCheckedChange={(checked) => {
                                            const currentValue = field.value || [];
                                            const newValue = checked
                                              ? [...currentValue, card.id]
                                              : currentValue.filter((id: string) => id !== card.id);
                                            field.onChange(newValue);
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none flex-1">
                                        <FormLabel className="text-sm font-medium leading-none">
                                          {card.name}
                                        </FormLabel>
                                        <FormDescription className="text-xs text-muted-foreground">
                                          {card.bank}
                                        </FormDescription>
                                      </div>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Analyzing..."
                      ) : (
                        <>
                          Get Recommendation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 sticky top-8">
            {recommendationResult && (
              <Card className="shadow-lg border-t-4 border-t-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    Best Card for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-green-700">{recommendationResult.bestCard.name}</h3>
                      <p className="text-sm text-muted-foreground">{recommendationResult.bestCard.bank}</p>
                    </div>
                    <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Potential Cashback</span>
                        <span className="font-semibold text-green-600">₹{recommendationResult.savingsAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Card Type</span>
                        <span className="font-medium">{recommendationResult.bestCard.type}</span>
                      </div>
                    </div>
                    {recommendationResult.bestCard.benefits && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Key Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {recommendationResult.bestCard.benefits.map((benefit: string, index: number) => (
                            <li key={index} className="text-sm">{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Credit Card Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your credit cards and track your spending
              </p>
            </div>
            
            <Link to="/dashboard/cards/statement-upload">
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Statement
              </Button>
            </Link>
          </div>
          
          {/* Rest of your existing credit card page content */}
          
          {/* Add a card promoting the statement upload feature */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-100 dark:border-blue-800/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload Credit Card Statements</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload your credit card statements to automatically track expenses, analyze spending patterns, and get insights.
                  </p>
                  <Link to="/dashboard/cards/statement-upload">
                    <Button variant="outline" className="border-blue-200 dark:border-blue-800">
                      Upload Statement
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {recommendationResult && (
            <Card className="shadow-lg border-t-4 border-t-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="h-5 w-5 text-green-500" />
                  Best Card for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-green-700">{recommendationResult.bestCard.name}</h3>
                    <p className="text-sm text-muted-foreground">{recommendationResult.bestCard.bank}</p>
                  </div>
                  <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Potential Cashback</span>
                      <span className="font-semibold text-green-600">₹{recommendationResult.savingsAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Card Type</span>
                      <span className="font-medium">{recommendationResult.bestCard.type}</span>
                    </div>
                  </div>
                  {recommendationResult.bestCard.benefits && (
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Key Benefits</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {recommendationResult.bestCard.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="text-sm">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
