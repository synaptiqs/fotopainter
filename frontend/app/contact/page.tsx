'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { api } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await api.submitContact(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link href="/pricing" className="text-gray-700 hover:text-[#008080] transition-colors">
                Pricing
              </Link>
              <Link href="/dashboard">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-heading text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-lg mb-4 text-heading">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:support@fotopainter.com" className="text-[#008080] hover:underline">
                    support@fotopainter.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Response Time</p>
                  <p>We typically respond within 24 hours</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-lg mb-4 text-heading">FAQ</h3>
              <p className="text-gray-600 text-sm mb-4">
                Check out our frequently asked questions for quick answers.
              </p>
              <Link href="#">
                <Button variant="ghost" size="sm" className="w-full">
                  View FAQ
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

