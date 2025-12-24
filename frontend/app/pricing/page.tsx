import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PricingPage() {
  const pricingTiers = [
    {
      name: 'Digital Download',
      price: '$19.99',
      description: 'Perfect for printing at home or at a local print shop',
      features: [
        'High-resolution template (300 DPI)',
        'Color guide with paint recommendations',
        'Instant download after purchase',
        'Multiple file formats (PNG, PDF)',
        'Lifetime access to download',
      ],
      cta: 'Get Digital Download',
      popular: false,
    },
    {
      name: 'Physical Kit - Small',
      price: '$49.99',
      description: '8" x 10" canvas with all supplies included',
      features: [
        'Pre-printed 8" x 10" canvas',
        '12-15 paint colors',
        '3 paint brushes',
        'Color guide and instructions',
        'Free US shipping',
      ],
      cta: 'Order Small Kit',
      popular: false,
    },
    {
      name: 'Physical Kit - Medium',
      price: '$69.99',
      description: '12" x 16" canvas with all supplies included',
      features: [
        'Pre-printed 12" x 16" canvas',
        '15-20 paint colors',
        '4 paint brushes',
        'Color guide and instructions',
        'Free US shipping',
      ],
      cta: 'Order Medium Kit',
      popular: true,
    },
    {
      name: 'Physical Kit - Large',
      price: '$89.99',
      description: '16" x 20" canvas with all supplies included',
      features: [
        'Pre-printed 16" x 20" canvas',
        '20-24 paint colors',
        '5 paint brushes',
        'Color guide and instructions',
        'Free US shipping',
      ],
      cta: 'Order Large Kit',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-heading text-[#008080]">
              Fotopainter
            </Link>
            <div className="flex items-center space-x-4">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-heading text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the option that works best for you. All prices in USD.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${tier.popular ? 'border-2 border-[#A0522D] shadow-lg' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#A0522D] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-heading mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                </div>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </div>
              <ul className="space-y-3 mb-6 text-left">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#008080] mr-2 mt-1">✓</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard">
                <Button
                  variant={tier.popular ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-heading mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">What's included in a digital download?</h3>
              <p className="text-gray-600">
                You'll receive a ZIP file containing a high-resolution PNG template (300 DPI), 
                a color guide PDF with paint recommendations, and step-by-step instructions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">How long does shipping take?</h3>
              <p className="text-gray-600">
                Physical kits typically ship within 3-5 business days. US orders arrive in 5-7 business days. 
                International shipping takes 10-14 business days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I change my order after placing it?</h3>
              <p className="text-gray-600">
                Digital downloads can be cancelled within 24 hours. Physical kit orders can be modified 
                or cancelled before they enter production (usually within 24-48 hours).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What if I'm not satisfied?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for digital downloads. Physical kits can be returned 
                unopened within 14 days of delivery.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

