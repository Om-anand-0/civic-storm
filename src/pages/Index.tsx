
import { Button } from "@/components/ui/button";
import { Flag, AlertTriangle, Activity, Users, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Make Your Community Better With <span className="text-civic-blue">CivicStorm</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Report issues in your neighborhood and track their progress. Help create safer, cleaner streets for everyone.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/report">
                  <Button size="lg" className="w-full sm:w-auto">
                    Report an Issue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Sign Up / Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1517985587571-53cb52a56e5c?w=800&auto=format&fit=crop" 
                alt="City streets" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How CivicStorm Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple process to report and track issues in your community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-civic-blue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flag className="h-8 w-8 text-civic-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
              <p className="text-gray-600">
                Submit detailed reports about civic problems or road hazards in your community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-civic-blue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-civic-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Follow the status of your reports from submission to resolution.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-civic-blue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-civic-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">See Results</h3>
              <p className="text-gray-600">
                Celebrate resolved issues and the positive impact on your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Types Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Can You Report?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Flag className="h-6 w-6 text-civic-blue mr-3" />
                <h3 className="text-xl font-semibold">Civic Issues</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Garbage and trash problems</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Potholes and road damage</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Broken streetlights</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Graffiti and vandalism</span>
                </li>
              </ul>
              <Link to="/report">
                <Button className="mt-6">
                  Report Civic Issue
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-civic-blue mr-3" />
                <h3 className="text-xl font-semibold">Road Hazards</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Accident-prone areas</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Dangerous turns and intersections</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Missing streetlights</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-civic-blue mr-2"></div>
                  <span>Flooding or water hazards</span>
                </li>
              </ul>
              <Link to="/report?type=hazard">
                <Button className="mt-6">
                  Report Road Hazard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Make a Difference in Your Community
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Your reports help local authorities identify and address problems more efficiently. Together, we can create cleaner, safer, and more beautiful neighborhoods.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-civic-blue bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Users className="h-5 w-5 text-civic-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Community-Driven</h3>
                    <p className="text-gray-600">
                      Join thousands of active citizens making their voices heard.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-civic-blue bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Activity className="h-5 w-5 text-civic-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Track Progress</h3>
                    <p className="text-gray-600">
                      Follow your reports from submission to resolution.
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/auth">
                <Button className="mt-8">
                  Get Started Now
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&auto=format&fit=crop" 
                alt="Community members" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
