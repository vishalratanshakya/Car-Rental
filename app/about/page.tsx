import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary/5 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl mb-6">
              About VehicleHub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are on a mission to redefine the vehicle rental experience by providing premium, reliable, and affordable mobility solutions for everyone.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded with a simple vision, VehicleHub started as a small fleet of reliable cars. Over the years, we have grown into a nationwide service offering everything from economical hatchbacks to luxury sedans and premium two-wheelers.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that renting a vehicle should be as easy as driving your own. That's why we focus on transparency, seamless booking, and top-notch customer support.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-center text-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Transparent pricing with no hidden fees
                </li>
                <li className="flex items-center text-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Wide selection of well-maintained vehicles
                </li>
                <li className="flex items-center text-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  24/7 dedicated customer support
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop" 
                alt="Our journey" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">5K+</div>
                <div className="text-primary-foreground/80">Vehicles</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-primary-foreground/80">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-foreground/80">Cities</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9</div>
                <div className="text-primary-foreground/80">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
