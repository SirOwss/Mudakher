import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Smartphone, Mail } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  const handleAuth = async (action: 'login' | 'signup') => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mudakhar</h1>
          <p className="text-muted-foreground">Your money understands you before you ask</p>
        </div>

        {/* Auth Form */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome to Mudakhar</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-4">
                  {/* Auth Method Toggle */}
                  <div className="flex gap-2 p-1 bg-muted rounded-lg">
                    <Button
                      variant={authMethod === 'email' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMethod('email')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant={authMethod === 'phone' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMethod('phone')}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="identifier">
                        {authMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </Label>
                      <Input
                        id="identifier"
                        type={authMethod === 'email' ? 'email' : 'tel'}
                        placeholder={authMethod === 'email' ? 'you@example.com' : '+1 (555) 123-4567'}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant="hero"
                    onClick={() => handleAuth('login')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-sm">
                      Forgot your password?
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-4">
                  {/* Auth Method Toggle */}
                  <div className="flex gap-2 p-1 bg-muted rounded-lg">
                    <Button
                      variant={authMethod === 'email' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMethod('email')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant={authMethod === 'phone' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMethod('phone')}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signupIdentifier">
                        {authMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </Label>
                      <Input
                        id="signupIdentifier"
                        type={authMethod === 'email' ? 'email' : 'tel'}
                        placeholder={authMethod === 'email' ? 'you@example.com' : '+1 (555) 123-4567'}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a strong password"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant="hero"
                    onClick={() => handleAuth('signup')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-4 w-4 text-success mr-2" />
            <span className="text-sm font-medium text-success">Bank-Grade Security</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your financial data is protected with 256-bit encryption and never stored without your permission.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;