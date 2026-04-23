'use client';

import { useState } from 'react';

type PricingModel = 'FREE' | 'ONE_TIME' | 'SUBSCRIPTION' | 'USAGE_BASED' | 'CUSTOM' | 'CONTACT';

interface PricingValue {
  model: PricingModel;
  basePrice?: number;
  monthlyPrice?: number;
  yearlyPrice?: number;
  pricePerUnit?: number;
  unitType?: string;
  freeQuota?: number;
  implementationFee?: number;
  estimatedHours?: number;
  customizationRate?: number;
  supportIncluded?: boolean;
  notes?: string;
}

interface PricingConfiguratorProps {
  value?: PricingValue;
  onChange: (value: PricingValue) => void;
}

export function PricingConfigurator({ value, onChange }: PricingConfiguratorProps) {
  const [model, setModel] = useState<PricingModel>(value?.model || 'CONTACT');

  const handleModelChange = (newModel: PricingModel) => {
    setModel(newModel);
    onChange({ ...value, model: newModel });
  };

  const updateField = (field: keyof PricingValue, val: any) => {
    onChange({ ...value, model, [field]: val });
  };

  const MODELS = [
    { id: 'FREE', label: 'Free', icon: '🆓', desc: 'Open source or free tier' },
    { id: 'ONE_TIME', label: 'One-Time', icon: '💳', desc: 'Single payment' },
    { id: 'SUBSCRIPTION', label: 'Subscription', icon: '🔄', desc: 'Monthly/yearly' },
    { id: 'USAGE_BASED', label: 'Usage', icon: '📊', desc: 'Pay per use' },
    { id: 'CUSTOM', label: 'Custom', icon: '🎯', desc: 'Negotiable' },
    { id: 'CONTACT', label: 'Contact', icon: '📞', desc: 'Get in touch' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Pricing & Implementation Model
        </h3>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Select a pricing strategy that balances student fair-pay with MSME accessibility.
        </p>
      </div>

      {/* Pricing Model Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {MODELS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleModelChange(option.id as PricingModel)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden group shadow-sm ${
              model === option.id
                ? 'border-amber-500 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                : 'border-slate-50 bg-white hover:border-slate-200 hover:bg-slate-50'
            }`}
          >
            {model === option.id && (
              <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500 flex items-center justify-center rounded-bl-xl shadow-lg">
                <span className="text-white text-xs font-black">✓</span>
              </div>
            )}
            <span className="text-4xl block transition-transform group-hover:scale-110 duration-500">{option.icon}</span>
            <div className={`font-black mt-4 text-lg transition-colors ${model === option.id ? 'text-amber-600' : 'text-slate-900'}`}>{option.label}</div>
            <div className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-widest leading-relaxed">{option.desc}</div>
          </button>
        ))}
      </div>

      {/* Dynamic Fields Based on Model */}
      <div className="bg-white border-2 border-slate-50 rounded-3xl p-8 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <span className="text-8xl font-black text-slate-900">
            {MODELS.find(m => m.id === model)?.icon}
          </span>
        </div>

        <div className="relative space-y-6">
          {model === 'ONE_TIME' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Base License Price (INR)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                  <input
                    type="number"
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-10 pr-4 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                    placeholder="15,000"
                    value={value?.basePrice || ''}
                    onChange={(e) => updateField('basePrice', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Implementation Fee (Optional)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                  <input
                    type="number"
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-10 pr-4 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                    placeholder="5,000"
                    value={value?.implementationFee || ''}
                    onChange={(e) => updateField('implementationFee', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Estimated Setup & Integration Time</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-5 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                    placeholder="8"
                    value={value?.estimatedHours || ''}
                    onChange={(e) => updateField('estimatedHours', parseInt(e.target.value))}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Hours</span>
                </div>
              </div>
            </div>
          )}

          {model === 'SUBSCRIPTION' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Monthly Price (INR)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                    <input
                      type="number"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-10 pr-4 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                      placeholder="999"
                      value={value?.monthlyPrice || ''}
                      onChange={(e) => updateField('monthlyPrice', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Yearly Price (INR)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                    <input
                      type="number"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-10 pr-4 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                      placeholder="9,999"
                      value={value?.yearlyPrice || ''}
                      onChange={(e) => updateField('yearlyPrice', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
                  value?.supportIncluded 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
                onClick={() => updateField('supportIncluded', !value?.supportIncluded)}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                  value?.supportIncluded ? 'bg-emerald-500 text-white' : 'bg-slate-50 border border-slate-100'
                }`}>
                  {value?.supportIncluded && <span className="font-black text-sm">✓</span>}
                </div>
                <div className="flex-1">
                  <div className="font-black text-sm uppercase tracking-tight">Priority Support Included</div>
                  <div className="text-[10px] uppercase font-black tracking-[0.2em] mt-0.5 opacity-60">Maintenance & Troubleshooting</div>
                </div>
              </label>
            </div>
          )}

          {model === 'USAGE_BASED' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Price Per Unit (INR)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                  <input
                    type="number"
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-10 pr-4 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                    placeholder="0.50"
                    step="0.01"
                    value={value?.pricePerUnit || ''}
                    onChange={(e) => updateField('pricePerUnit', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Unit Measurement Type</label>
                <div className="relative">
                  <select
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-5 text-slate-900 font-black text-sm focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner appearance-none relative z-10"
                    value={value?.unitType || ''}
                    onChange={(e) => updateField('unitType', e.target.value)}
                  >
                    <option value="" disabled className="text-slate-400 italic">Select measurement...</option>
                    <option value="api_call">API Call</option>
                    <option value="document">Document Processed</option>
                    <option value="user">Active User</option>
                    <option value="transaction">Transaction</option>
                    <option value="message">Message</option>
                    <option value="hour">Compute Hour</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 z-0 text-xs font-black uppercase">Click to Select ▼</div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Monthly Free Quota</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 px-5 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                    placeholder="1,000"
                    value={value?.freeQuota || ''}
                    onChange={(e) => updateField('freeQuota', parseInt(e.target.value))}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Units</span>
                </div>
              </div>
            </div>
          )}

          {(model === 'CUSTOM' || model === 'FREE') && (
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">
                  {model === 'CUSTOM' ? 'Implementation Notes' : 'Open Source / Free Tier Details'}
                </label>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-3xl p-6 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all resize-none shadow-inner min-h-[160px]"
                  placeholder={model === 'CUSTOM' ? "Explain what factors influence the final pricing..." : "Mention any usage limits or licensing (MIT, Apache, etc.)..."}
                  value={value?.notes || ''}
                  onChange={(e) => updateField('notes', e.target.value)}
                />
              </div>
              {model === 'CUSTOM' && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block px-1">Standard Hourly Support Rate (INR)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                    <input
                      type="number"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-10 pr-4 text-slate-900 font-mono text-lg focus:outline-none focus:border-amber-500/20 focus:bg-white transition-all shadow-inner"
                      placeholder="500"
                      value={value?.customizationRate || ''}
                      onChange={(e) => updateField('customizationRate', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {model === 'CONTACT' && (
            <div className="text-center py-12 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-amber-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <span className="text-4xl">📞</span>
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">Direct Inquiry Required</h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-3 font-medium px-4 leading-relaxed">
                Pricing will be hidden in the marketplace. Companies will have to reach out to you directly for a quote.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
