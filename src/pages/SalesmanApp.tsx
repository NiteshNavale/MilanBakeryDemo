import { useState } from "react";
import { 
  CheckCircle2, 
  Navigation,
  ScanBarcode,
  AlertTriangle,
  ChevronLeft,
  IndianRupee
} from "lucide-react";
import { salesmanRoute } from "../data/mockData";
import { cn } from "../lib/utils";

export default function SalesmanApp() {
  const [route, setRoute] = useState(salesmanRoute);
  const [activeShopId, setActiveShopId] = useState<number | null>(null);

  const activeShop = route.find(s => s.id === activeShopId);

  const markDelivered = (id: number) => {
    setRoute(route.map(s => s.id === id ? { ...s, status: "Delivered" } : s));
    setActiveShopId(null);
  };

  return (
    <div className="flex justify-center items-start h-full">
      {/* Mobile Preview Container matching Bento Grid */}
      <div className="w-[320px] h-[640px] bg-slate-800 rounded-[40px] p-3 relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col shrink-0">
        <div className="w-[100px] h-[20px] bg-slate-800 absolute top-3 left-1/2 -translate-x-1/2 rounded-b-[15px] z-10"></div>
        
        <div className="bg-white rounded-[32px] flex-1 overflow-hidden flex flex-col text-[14px]">
          
          {!activeShopId ? (
            <>
              <div className="bg-blue-600 text-white pt-10 pb-4 px-4 text-center shrink-0">
                <div className="text-[10px] opacity-80 mb-1 uppercase tracking-wider font-semibold">Kiran's Route</div>
                <div className="font-bold text-[16px]">Today's Deliveries</div>
              </div>
              
              <div className="p-4 flex flex-col gap-2.5 overflow-y-auto flex-1">
                {route.map((shop, idx) => (
                  <button 
                    key={shop.id}
                    onClick={() => shop.status !== 'Delivered' && setActiveShopId(shop.id)}
                    disabled={shop.status === 'Delivered'}
                    className={cn(
                      "p-3 rounded-xl flex justify-between items-center border text-left transition-all",
                      shop.status === 'Delivered' 
                        ? "bg-emerald-50 border-emerald-200" 
                        : idx === 0 && route[0].status !== 'Delivered' ? "bg-slate-50 border-l-4 border-l-blue-600 border-y-slate-200 border-r-slate-200" : "bg-slate-50 border-slate-200"
                    )}
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{shop.name}</div>
                      <div className={cn("text-[11px]", shop.status === 'Delivered' ? "text-emerald-600" : "text-slate-500")}>
                        {shop.status === 'Delivered' ? "Completed • 08:30 AM" : shop.address}
                      </div>
                    </div>
                    {shop.status === 'Delivered' ? (
                      <div className="text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                    ) : idx === 0 && route[0].status !== 'Delivered' ? (
                      <div className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold tracking-wide">NEXT</div>
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="mt-auto p-4 shrink-0">
                <button className="w-full bg-blue-600 text-white p-3.5 text-center font-semibold rounded-xl text-[14px]">
                  Scan Shop Barcode
                </button>
                <div className="text-center text-[10px] text-slate-500 pb-2 pt-3 font-semibold tracking-widest">
                  • ONLINE - SYNCED •
                </div>
              </div>
            </>
          ) : (
            // Active Delivery View
            <div className="animate-in slide-in-from-right-4 duration-300 flex flex-col h-full">
              <div className="bg-blue-600 text-white pt-10 pb-4 px-4 flex items-center gap-3 shrink-0">
                <button onClick={() => setActiveShopId(null)} className="p-1 hover:bg-blue-700 rounded-full transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <div className="font-bold text-[16px] leading-tight">{activeShop?.name}</div>
                  <div className="text-[11px] opacity-80">{activeShop?.address}</div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
                <div>
                  <h3 className="text-[12px] font-semibold text-slate-500 mb-2 uppercase tracking-wide">Expected Delivery</h3>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    {activeShop?.expectedItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2.5 border-b border-slate-200 last:border-0">
                        <span className="font-medium text-slate-700 text-[13px]">{item.name}</span>
                        <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full text-[11px]">{item.qty}x</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                  <h3 className="text-[12px] font-semibold text-red-900 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                    <AlertTriangle className="w-3.5 h-3.5" /> Log Returns
                  </h3>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Qty" className="w-16 bg-white border border-red-200 rounded-lg p-2 text-[13px] outline-none" />
                    <select className="flex-1 bg-white border border-red-200 rounded-lg p-2 text-[13px] outline-none">
                      <option value="">Reason...</option>
                      <option>Expired</option>
                      <option>Damaged</option>
                    </select>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-slate-500 font-medium text-[13px]">Total Due</span>
                    <span className="text-[18px] font-bold text-slate-800 flex items-center">
                      <IndianRupee className="w-4 h-4" /> {activeShop?.amountDue}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold py-1.5 rounded-lg text-[13px]">Cash</button>
                    <button className="bg-slate-50 border border-slate-200 text-slate-600 font-semibold py-1.5 rounded-lg text-[13px]">UPI</button>
                  </div>

                  <button 
                    onClick={() => activeShop && markDelivered(activeShop.id)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-[14px]"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Complete Delivery
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
