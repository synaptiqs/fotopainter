import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-heading text-[#008080]">
                Fotopainter
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/pricing" className="text-gray-700 hover:text-[#008080] transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#008080] transition-colors">
                Contact
              </Link>
              <Link href="/dashboard">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F5F5F5] to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading text-gray-900 mb-6">
              Transform Your Photos into
              <span className="text-[#008080]"> Paint-by-Number Art</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              AI-powered platform that turns your favorite memories into beautiful, 
              personalized paint-by-number artworks. Perfect for gifts or your own creative journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="primary" size="lg">
                  Upload Your Photo
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading text-gray-900 mb-4">
              See the Magic
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch how we transform ordinary photos into stunning paint-by-number templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} hover className="text-center">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Before/After Example {i}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Example {i}</h3>
                <p className="text-gray-600 text-sm">
                  Beautiful transformation showcasing our AI processing
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to your personalized artwork
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-[#008080] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-xl mb-3 text-heading">Upload Your Photo</h3>
              <p className="text-gray-600">
                Simply drag and drop your favorite photo or choose from your device. 
                We support JPEG, PNG, and WebP formats.
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-16 h-16 bg-[#008080] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-xl mb-3 text-heading">AI Processing</h3>
              <p className="text-gray-600">
                Our AI analyzes your image and creates a custom paint-by-number template 
                with intelligent color palette recommendations.
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-16 h-16 bg-[#008080] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-xl mb-3 text-heading">Get Your Art</h3>
              <p className="text-gray-600">
                Choose digital download for instant access or order a physical paint kit 
                with everything you need to start painting.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                text: 'I turned my wedding photo into a paint-by-number and it\'s now hanging in our living room. Absolutely beautiful!',
                rating: 5,
              },
              {
                name: 'John D.',
                text: 'The AI did an amazing job creating the template. The colors are perfect and the instructions are clear.',
                rating: 5,
              },
              {
                name: 'Emily R.',
                text: 'Perfect gift for my mom! She loved painting her favorite family photo. The physical kit was high quality.',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <Card key={i} hover>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <p className="font-semibold text-gray-900">— {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-[#008080] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Choose the option that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white text-gray-900">
              <h3 className="text-2xl font-bold mb-2 text-heading">Digital Download</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$19.99</span>
              </div>
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="text-[#008080] mr-2">✓</span>
                  High-resolution template (300 DPI)
                </li>
                <li className="flex items-center">
                  <span className="text-[#008080] mr-2">✓</span>
                  Color guide with paint recommendations
                </li>
                <li className="flex items-center">
                  <span className="text-[#008080] mr-2">✓</span>
                  Instant download after purchase
                </li>
              </ul>
              <Link href="/dashboard">
                <Button variant="primary" size="md" className="w-full">
                  Get Started
                </Button>
              </Link>
            </Card>
            
            <Card className="relative bg-white text-gray-900 border-2 border-[#A0522D]">
              <div className="absolute top-4 right-4 bg-[#A0522D] text-white px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-heading">Physical Kit</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">From $49.99</span>
              </div>
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="text-[#008080] mr-2">✓</span>
                  Pre-printed canvas with template
                </li>
                <li className="flex items-center">
                  <span className="text-[#008080] mr-2">✓</span>
                  All paint colors included
                </li>
                <li className="flex items-center">
                  <span className="text-[#008080] mr-2">✓</span>
                  Brushes and instructions
                </li>
                <li className="flex items-center">
                  <span className="text-[#008080] mr-2">✓</span>
                  Free shipping (US)
                </li>
              </ul>
              <Link href="/dashboard">
                <Button variant="primary" size="md" className="w-full">
                  Order Kit
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-heading mb-4">Fotopainter</h3>
              <p className="text-gray-400 text-sm">
                Transform your photos into beautiful paint-by-number artworks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Fotopainter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
