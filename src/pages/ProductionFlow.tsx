import { useState } from "react";
import { 
  Plus, 
  Play, 
  CheckCircle2, 
  Barcode,
  X
} from "lucide-react";
import { 
  plannedBatches, 
  inProgressBatches, 
  completedBatches,
  rawMaterialsMap
} from "../data/mockData";
import { cn } from "../lib/utils";

export default function ProductionFlow() {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("White Bread");
  const [batchQty, setBatchQty] = useState(500);

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-800">Production Floor</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage batches and raw materials</p>
        </div>
        <button 
          onClick={() => setIsStartModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Start New Batch
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Planned */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col">
          <div className="text-[14px] font-semibold text-slate-500 mb-4 uppercase tracking-wide flex justify-between items-center">
            Planned
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{plannedBatches.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {plannedBatches.map(batch => (
              <BatchCard key={batch.id} batch={batch} status="Planned" />
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col">
          <div className="text-[14px] font-semibold text-slate-500 mb-4 uppercase tracking-wide flex justify-between items-center">
            In Progress
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{inProgressBatches.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {inProgressBatches.map(batch => (
              <BatchCard 
                key={batch.id} 
                batch={batch} 
                status="In Progress"
                action={<button onClick={() => setIsEndModalOpen(true)} className="text-[11px] bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded flex items-center gap-1 transition-colors"><CheckCircle2 className="w-3 h-3"/> Finish</button>}
              />
            ))}
          </div>
          
          <div className="mt-6">
              <div className="text-[12px] font-semibold text-slate-500 mb-3 uppercase tracking-wide">Inventory Alerts</div>
              <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                  <p className="text-[13px] font-semibold text-slate-800">Low Stock: Maida</p>
                  <p className="text-[11px] text-red-800 mt-0.5">Only 45kg remaining. Minimum: 150kg</p>
              </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col">
          <div className="text-[14px] font-semibold text-slate-500 mb-4 uppercase tracking-wide flex justify-between items-center">
            Completed Today
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">{completedBatches.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {completedBatches.map(batch => (
              <BatchCard key={batch.id} batch={batch} status="Done" />
            ))}
          </div>
        </div>

      </div>

      {/* Start Batch Modal */}
      {isStartModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-[15px] font-semibold text-slate-800">Start New Batch</h3>
              <button onClick={() => setIsStartModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Product</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {Object.keys(rawMaterialsMap).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Target Quantity (Units)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800"
                    value={batchQty}
                    onChange={(e) => setBatchQty(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h4 className="text-[13px] font-semibold text-blue-900 mb-2">Required Raw Materials</h4>
                <div className="space-y-1.5">
                  {rawMaterialsMap[selectedProduct]?.map((mat, idx) => (
                    <div key={idx} className="flex justify-between text-[13px]">
                      <span className="text-blue-800">{mat.material}</span>
                      <span className="font-medium text-blue-900">{(mat.perUnit * batchQty).toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsStartModalOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Play className="w-4 h-4" /> Start Production
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Batch Modal */}
      {isEndModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-[15px] font-semibold text-slate-800">Finish Batch B-099</h3>
              <button onClick={() => setIsEndModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Actual Good Quantity</label>
                  <input 
                    type="number" 
                    defaultValue={295}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Waste Qty</label>
                    <input 
                      type="number" 
                      defaultValue={5}
                      className="w-full bg-red-50 border border-red-200 rounded-lg p-2.5 text-sm text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Waste Reason</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800">
                      <option>Burnt</option>
                      <option>Deformed</option>
                      <option>Underbaked</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsEndModalOpen(false)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Barcode className="w-4 h-4" /> Generate Packaging Barcodes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function BatchCard({ batch, action, status }: { batch: any, action?: React.ReactNode, status: "Planned" | "In Progress" | "Done" }) {
  return (
    <div className="p-3 rounded-[10px] border border-slate-200 flex justify-between items-center bg-white">
      <div>
        <h4 className="text-[14px] font-semibold text-slate-800 mb-0.5">{batch.product}</h4>
        <p className="text-[11px] text-slate-500">ID: {batch.id} &bull; {batch.targetQty} Units</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={cn(
          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
          status === "In Progress" ? "bg-amber-100 text-amber-800" :
          status === "Planned" ? "bg-blue-50 text-blue-800" :
          "bg-emerald-100 text-emerald-800"
        )}>
          {status}
        </span>
        {action}
      </div>
    </div>
  );
}
