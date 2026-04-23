'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[MOSI ErrorBoundary]', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="max-w-lg w-full">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Something went wrong</h2>
                    <p className="text-white/80 text-sm">
                      The application encountered an unexpected error
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {this.state.error && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Error Details
                    </p>
                    <p className="text-sm text-slate-700 font-mono break-words">
                      {this.state.error.message || 'Unknown error'}
                    </p>
                  </div>
                )}

                {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-slate-400 hover:text-slate-600 font-medium">
                      View stack trace
                    </summary>
                    <pre className="mt-2 p-3 bg-slate-900 text-slate-300 rounded-xl overflow-auto max-h-48 text-[10px]">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={this.handleReset}
                    className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={this.handleReload}
                    className="flex-1 h-12 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reload Page
                  </button>
                </div>

                <p className="text-xs text-slate-400 text-center">
                  If this problem persists, please contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
