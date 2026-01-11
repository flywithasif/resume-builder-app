// src/components/Pricing.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap } from 'lucide-react';

const Pricing = () => {
  const COLORS = {
    ink: "#2C3333",
    primary: "#395B64",
    muted: "#A5C9CA",
    surface: "#E7F6F2",
  };

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      icon: Star,
      color: COLORS.muted,
      features: [
        '1 Resume Template',
        'Basic Resume Builder',
        'PDF Download',
        'Email Support',
        '1 Resume'
      ],
      limitations: [
        'Limited templates',
        'Basic customization',
        'No cover letters'
      ]
    },
    {
      name: 'Premium',
      price: '₹49',
      period: '7 Days',
      icon: Crown,
      color: COLORS.primary,
      popular: true,
      features: [
        '20+ Professional Templates',
        'Advanced Resume Builder',
        'PDF & Word Download',
        'Cover Letter Templates',
        'Unlimited Resumes',
        'Priority Support',
        'ATS Optimization',
        'Custom Colors & Fonts'
      ]
    },
    {
      name: 'Pro',
      price: '₹190',
      period: 'per year',
      icon: Zap,
      color: COLORS.ink,
      features: [
        'Everything in Premium',
        'LinkedIn Profile Optimization',
        'Interview Preparation',
        'Career Coaching Session',
        'Resume Review by Experts',
        'Job Application Tracking',
        'Salary Negotiation Guide',
        'White-label Option'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to premium features until the end of your billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with our service, contact us within 30 days for a full refund.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and other secure payment methods through Stripe.'
    },
    {
      question: 'Can I download my resume in different formats?',
      answer: 'Premium and Pro users can download resumes in PDF and Word formats. Free users can download in PDF only.'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: COLORS.surface }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: COLORS.ink }}>
            Choose the Perfect Plan for You
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: COLORS.primary }}>
            Start with our free plan and upgrade when you need more features. 
            All plans include our core resume builder with professional templates.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl shadow-lg p-8 bg-white ${plan.popular ? 'ring-2' : ''}`}
              style={{ ringColor: plan.color }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-sm font-medium text-white"
                    style={{ background: COLORS.primary }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <plan.icon className="h-12 w-12 mx-auto mb-4" style={{ color: plan.color }} />
                <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.ink }}>{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold" style={{ color: COLORS.ink }}>{plan.price}</span>
                  <span className="ml-2" style={{ color: COLORS.primary }}>/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: COLORS.primary }} />
                    <span style={{ color: COLORS.ink }}>{feature}</span>
                  </li>
                ))}
                {plan.limitations && plan.limitations.map((limitation, limitIndex) => (
                  <li key={limitIndex} className="flex items-start opacity-60">
                    <span className="mr-3">×</span>
                    <span className="line-through" style={{ color: COLORS.muted }}>{limitation}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{
                  background: plan.popular ? COLORS.primary : COLORS.surface,
                  color: plan.popular ? "#fff" : COLORS.ink
                }}
              >
                {plan.name === 'Free' ? 'Get Started Free' : `Choose ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.ink }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xl" style={{ color: COLORS.primary }}>
            Everything you need to know about our pricing and features
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.ink }}>
                {faq.question}
              </h3>
              <p style={{ color: COLORS.primary }}>
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ background: COLORS.primary, color: "#fff" }}
        className="text-white py-16"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Perfect Resume?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have landed their dream jobs with our platform
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
            style={{ background: "#fff", color: COLORS.primary }}
          >
            Start Building Now
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
