import { 
  ChevronDownIcon, 
  PhoneIcon, 
  ChatBubbleLeftIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import { useState } from 'react';

function Help() {
  const [openSection, setOpenSection] = useState(null);

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'Order History' section. Alternatively, use the tracking number provided in your shipping confirmation email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply to certain products."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team immediately if you need to make changes."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions or get in touch with our support team
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 transform transition-transform ${
                      openSection === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSection === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Available Mon-Fri, 9am-5pm</p>
            <a href="tel:1-800-123-4567" className="text-blue-500 hover:underline">
              1-800-123-4567
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">24/7 Support Available</p>
            <button className="text-green-500 hover:underline">Start Chat</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Response within 24 hours</p>
            <a href="mailto:support@store.com" className="text-purple-500 hover:underline">
              support@store.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help; 