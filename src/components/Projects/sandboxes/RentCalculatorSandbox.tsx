import React, { useState } from 'react';
import { Calculator, Users, Zap, Home, DollarSign, ArrowRight } from 'lucide-react';

export const RentCalculatorSandbox: React.FC = () => {
  const [houseRent, setHouseRent] = useState<number>(12000);
  const [tenants, setTenants] = useState<number>(3);
  const [units, setUnits] = useState<number>(240);
  const [waterBill, setWaterBill] = useState<number>(600);

  // Compute tiered electricity cost
  // Slabs: 0-100 units: Free / ₹0 | 101-200 units: ₹3.50/unit | >200 units: ₹6.00/unit
  const computePowerBill = (kwh: number) => {
    let bill = 0;
    if (kwh <= 100) {
      bill = 0;
    } else if (kwh <= 200) {
      bill = (kwh - 100) * 3.5;
    } else {
      bill = 100 * 3.5 + (kwh - 200) * 6.0;
    }
    return Math.round(bill);
  };

  const powerCost = computePowerBill(units);
  const totalCost = houseRent + powerCost + waterBill;
  const perPersonCost = Math.round(totalCost / Math.max(1, tenants));

  return (
    <div className="rounded-2xl bg-white border border-amber-200 shadow-md p-5 text-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Utility & Rent Splitter Engine
            </h4>
            <p className="text-[11px] text-amber-700 font-mono">
              Tiered Tariff Algorithm & Multi-Tenant Split
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-mono font-bold border border-amber-200">
          Live Calculator
        </span>
      </div>

      {/* Input Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* House Rent */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-amber-600" />
              Rent:
            </span>
            <span className="font-bold text-slate-900 font-mono">₹{houseRent}</span>
          </div>
          <input
            type="range"
            min="4000"
            max="30000"
            step="500"
            value={houseRent}
            onChange={(e) => setHouseRent(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        {/* Electricity Units */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Units (kWh):
            </span>
            <span className="font-bold text-slate-900 font-mono">{units} kWh</span>
          </div>
          <input
            type="range"
            min="50"
            max="600"
            step="10"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        {/* Tenants Count */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              Tenants:
            </span>
            <span className="font-bold text-slate-900 font-mono">{tenants} people</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            value={tenants}
            onChange={(e) => setTenants(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Real-time Calculation Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
            Total Monthly Expense
          </span>
          <div className="text-2xl font-extrabold text-amber-900 font-mono mt-1">
            ₹{totalCost.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-mono">
            Rent: ₹{houseRent} | Power: ₹{powerCost} | Water: ₹{waterBill}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100">
          <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block">
            Exact Share Per Person ({tenants} Flatmates)
          </span>
          <div className="text-2xl font-extrabold text-indigo-700 font-mono mt-1">
            ₹{perPersonCost.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-normal text-slate-500">/ person</span>
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 font-mono font-medium">
            ✓ Automated Split — No Calculation Dispute
          </div>
        </div>
      </div>
    </div>
  );
};
