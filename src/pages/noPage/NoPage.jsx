import React from 'react'
import { Home, Search, ArrowLeft, FileQuestion } from 'lucide-react'

const NoPage = () => {
  const handleGoBack = () => {
    window.history.back()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-slate-200 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-24 h-24 text-slate-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        {/* Search Bar */}
        {/* <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search for pages..." 
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
          <button 
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Help Links */}
        {/* <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Need help? Try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="/about"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Contact
            </a>
            <a
              href="/help"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Help Center
            </a>
            <a
              href="/sitemap"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Sitemap
            </a>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default NoPage