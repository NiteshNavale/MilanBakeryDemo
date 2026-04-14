import { useState } from "react";
import { 
  User,
  MapPin
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  ownerMetrics, 
  actionQueue, 
  weeklySalesData, 
  salesmen, 
  shops 
} from "../data/mockData";
import { cn } from "../lib/utils";

export default function OwnerDashboard() {
  const [selectedSalesman, setSelectedSalesman] = useState(salesmen[0].id);
  const [assignedShops, setAssignedShops] = useState([shops[0], shops[1]]);

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Today's Revenue" 
          value={`₹${ownerMetrics.todayRevenue.toLocaleString('en-IN')}`} 
          trend="↑ 12% vs yesterday"
          trendUp={true}
        />
        <MetricCard 
          title="Batches Completed" 
          value={ownerMetrics.batchesCompleted} 
          trend="Target: 8"
          trendUp={true}
          trendNeutral
        />
        <MetricCard 
          title="Outstanding" 
          value={`₹${ownerMetrics.outstandingPayments.toLocaleString('en-IN')}`} 
          trend="Due from 4 retailers"
          trendUp={false}
        />
        <MetricCard 
          title="Active Trips" 
          value={ownerMetrics.activeTrips} 
          trend="Kiran & Rahul on route"
          trendUp={true}
          trendPrimary
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Column: Charts & Queue */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Weekly Sales Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col h-[300px]">
            <div className="text-[14px] font-semibold text-slate-500 mb-4 uppercase tracking-wide flex justify-between">
              Weekly Sales Performance
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySalesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Queue */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div className="text-[14px] font-semibold text-slate-500 mb-4 uppercase tracking-wide flex justify-between">
              Action Queue
            </div>
            <div className="flex flex-col">
              {actionQueue.map((item, idx) => (
                <div key={item.id} className={cn("flex gap-3 py-3", idx !== actionQueue.length - 1 && "border-b border-slate-200")}>
                  <div className={cn("w-2.5 h-2.5 rounded-full mt-1 shrink-0", idx === 0 ? "bg-red-500" : "bg-amber-500")}></div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-800">{item.text}</p>
                    <p className="text-[11px] text-slate-500">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Trip Planner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col h-full">
          <div className="text-[14px] font-semibold text-slate-500 mb-4 uppercase tracking-wide flex justify-between">
            Trip Planner
          </div>
          
          <div className="space-y-6 flex-1">
            {/* Salesman Selection */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-500 mb-2 uppercase tracking-wide">Select Salesman</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 outline-none"
                  value={selectedSalesman}
                  onChange={(e) => setSelectedSalesman(Number(e.target.value))}
                >
                  {salesmen.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Assigned Route */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Assigned Route</label>
                <button className="text-[11px] text-blue-600 font-medium hover:underline">Edit Route</button>
              </div>
              
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-4 pb-2">
                {assignedShops.map((shop, idx) => (
                  <div key={shop.id} className="relative pl-5">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                      <p className="text-[13px] font-semibold text-slate-800">{shop.name}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <p className="text-[11px]">{shop.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add stop button */}
                <div className="relative pl-5 pt-1">
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                  <button className="text-[12px] text-slate-500 font-medium hover:text-blue-600 flex items-center gap-1 transition-colors">
                    + Add Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            Dispatch Trip
          </button>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, trendNeutral, trendPrimary }: { title: string, value: string | number, trend: string, trendUp?: boolean, trendNeutral?: boolean, trendPrimary?: boolean }) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl">
      <div className="text-[12px] text-slate-500">{title}</div>
      <div className="text-[20px] font-bold text-slate-800 my-1">{value}</div>
      <div className={cn(
        "text-[11px]", 
        trendNeutral ? "text-slate-500" : trendPrimary ? "text-blue-600" : trendUp ? "text-emerald-500 font-semibold" : "text-red-500"
      )}>
        {trend}
      </div>
    </div>
  );
}
