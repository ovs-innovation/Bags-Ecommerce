import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  AlertTriangle,
  Server,
  Database,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { ADMIN_CONFIG } from '../constants/config';
import { healthService } from '../services/api';

export const DashboardPage = () => {
  const [healthData, setHealthData] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [healthError, setHealthError] = useState(null);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    setHealthError(null);
    try {
      const data = await healthService.checkHealth();
      setHealthData(data.data);
    } catch (err) {
      setHealthError(err.message || 'Backend unreachable');
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const stats = [
    { label: 'Gross Revenue', value: '₹0.00', status: 'Phase 9 Metric', icon: TrendingUp, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Pending Orders', value: '0', status: 'Phase 7 Integration', icon: ShoppingCart, color: 'text-blue-700 bg-blue-50' },
    { label: 'Catalog Products', value: '0', status: 'Phase 4 Setup', icon: Package, color: 'text-stone-800 bg-stone-100' },
    { label: 'Low Stock Items', value: '0', status: 'Inventory Guard', icon: AlertTriangle, color: 'text-amber-700 bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          {ADMIN_CONFIG.brandName} Executive Control Room
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Standalone administrator portal for store management, catalog control, and order fulfillment.
        </p>
      </div>

      {/* Backend & DB Health Connection Diagnostics */}
      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-base font-semibold text-stone-900">
                Shared Backend & Database Connection Diagnostics
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Demonstrates independent Admin app (port 5174) communicating with the shared Node.js/Express API (port 5000).
            </p>
          </div>

          <button
            onClick={fetchHealth}
            disabled={loadingHealth}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded transition-colors self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? 'animate-spin' : ''}`} />
            <span>Refresh Diagnostics</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {/* Admin App */}
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Admin App</span>
              <h4 className="text-sm font-semibold text-stone-900">Vite + React 19</h4>
              <p className="text-xs text-stone-500 mt-0.5">Port 5174 (Standalone)</p>
            </div>
          </div>

          {/* Backend API */}
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-start space-x-3">
            <Server className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Central API</span>
              <h4 className="text-sm font-semibold text-stone-900">
                {loadingHealth ? 'Connecting...' : healthData ? 'Healthy (Port 5000)' : 'Unreachable'}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                {healthData ? `Uptime: ${healthData.uptimeSeconds}s` : healthError || 'Connecting...'}
              </p>
            </div>
          </div>

          {/* Database */}
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-start space-x-3">
            <Database className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Database Layer</span>
              <h4 className="text-sm font-semibold text-stone-900">
                {loadingHealth ? 'Checking...' : healthData?.database === 'connected' ? 'MongoDB Connected' : 'Disconnected'}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                {healthData?.database === 'connected' ? 'kosha_ecommerce active' : 'Waiting for connection'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                  {item.label}
                </span>
                <div className={`p-2 rounded ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-stone-900">{item.value}</span>
                <p className="text-xs text-stone-500 mt-1">{item.status}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Management Roadmap */}
      <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs">
        <h3 className="text-base font-semibold text-stone-900 mb-4">
          Admin Management Functional Roadmap
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded bg-stone-50 border border-stone-200">
            <h4 className="font-semibold text-stone-900">Product & Category Management (Phase 10)</h4>
            <p className="text-xs text-stone-600 mt-1">
              Add new leather purses, edit prices, manage inventory levels, set featured/bestseller badges, and create product categories.
            </p>
          </div>
          <div className="p-4 rounded bg-stone-50 border border-stone-200">
            <h4 className="font-semibold text-stone-900">Order Fulfillment & Tracking (Phase 11)</h4>
            <p className="text-xs text-stone-600 mt-1">
              Filter customer orders, inspect items and address details, advance statuses (pending → shipped → delivered), and manage payment states.
            </p>
          </div>
          <div className="p-4 rounded bg-stone-50 border border-stone-200">
            <h4 className="font-semibold text-stone-900">Print Parcel Shipping Labels & Invoices (Phase 12)</h4>
            <p className="text-xs text-stone-600 mt-1">
              CSS-optimized printable shipping invoices and parcel labels ready to attach to courier packages.
            </p>
          </div>
          <div className="p-4 rounded bg-stone-50 border border-stone-200">
            <h4 className="font-semibold text-stone-900">Customer & Review Moderation (Phase 13)</h4>
            <p className="text-xs text-stone-600 mt-1">
              Moderate customer product reviews, inspect verified buyer badges, and manage registered customer records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
