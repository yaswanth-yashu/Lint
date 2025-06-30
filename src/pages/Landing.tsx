import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Shield, BarChart3, FileText, Users, ArrowRight, CheckCircle, Sparkles, Brain, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Layout/Navbar';
import { BackgroundEffects } from '../components/UI/BackgroundEffects';
import { GlassCard } from '../components/UI/GlassCard';
import { AnimatedButton } from '../components/UI/AnimatedButton';

export const Landing: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced Gemini 2.0 Flash AI analyzes your code for patterns, smells, and technical debt with unprecedented accuracy.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Reports',
      description: 'Get detailed PDF reports with debt scores, file-by-file analysis, and prioritized recommendations.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your code is processed securely with enterprise-grade encryption. No data is stored permanently.',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3
    },
    {
      icon: Target,
      title: 'Actionable Insights',
      description: 'Receive specific, actionable recommendations to improve code quality and reduce maintenance costs.',
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    },
    {
      icon: Code2,
      title: 'Multi-Language Support',
      description: 'Supports JavaScript, TypeScript, Python, Java, C++, and many other popular programming languages.',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.5
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share reports with your team, track improvements over time, and maintain code quality standards.',
      color: 'from-teal-500 to-blue-500',
      delay: 0.6
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Your Code',
      description: 'Drag and drop your project files or select them from your computer. We support all major programming languages.',
      icon: Code2,
      color: 'from-blue-600 to-purple-600'
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your codebase for technical debt, code smells, security issues, and performance problems.',
      icon: Zap,
      color: 'from-purple-600 to-pink-600'
    },
    {
      step: '03',
      title: 'Get Your Report',
      description: 'Receive a comprehensive PDF report with debt scores, detailed findings, and actionable recommendations.',
      icon: FileText,
      color: 'from-pink-600 to-red-600'
    }
  ];

  const stats = [
    { label: 'Code Files Analyzed', value: '1M+', icon: FileText },
    { label: 'Issues Detected', value: '500K+', icon: Target },
    { label: 'Happy Developers', value: '10K+', icon: Users },
    { label: 'Languages Supported', value: '15+', icon: Code2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-500">
      <BackgroundEffects />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Hero Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-800/20 rounded-full mb-8"
            >
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Powered by Gemini 2.0 Flash AI
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tech Debt Analysis
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Identify technical debt, code smells, and architectural issues in your codebase. 
              Get actionable insights powered by advanced AI analysis and comprehensive reports.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to="/dashboard">
                <AnimatedButton size="lg" icon={ArrowRight}>
                  Start Free Analysis
                </AnimatedButton>
              </Link>
              
              <AnimatedButton variant="secondary" size="lg" icon={FileText}>
                View Sample Report
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Code Analysis
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform analyzes your codebase thoroughly to identify technical debt, 
              performance issues, and architectural problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.6 }}
              >
                <GlassCard className="p-8 h-full">
                  <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl inline-block mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get professional code analysis in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center relative"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 transform -translate-x-1/2 z-0" />
                )}
                
                <GlassCard className="p-8 relative z-10">
                  <div className="relative mb-6">
                    <div className={`bg-gradient-to-r ${step.color} text-white text-xl font-bold w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      {step.step}
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl inline-block">
                      <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Improve Your Code Quality?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of developers who trust our platform to identify and fix technical debt. 
              Start your free analysis today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/dashboard">
                <AnimatedButton size="lg" icon={ArrowRight}>
                  Start Free Analysis
                </AnimatedButton>
              </Link>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Secure & private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No credit card</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};