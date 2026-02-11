import React from 'react';
import { Info, TrendingUp, Landmark } from 'lucide-react';

const ResultsDisplay = ({ results }) => {
    const { subtotal, comision, iva, registro, recargo, totalFinal } = results;

    const formatBs = (val) =>
        new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(val);

    const Row = ({ label, value, tooltip, isTotal, isHighlight }) => (
        <div className={`flex justify-between items-center py-3 ${isTotal ? 'mt-4 border-t-2 border-blue-100 pt-4' : 'border-b border-slate-50'}`}>
            <div className="flex flex-col">
                <span className={`text-sm ${isTotal ? 'font-bold text-slate-800' : 'text-slate-600'} flex items-center gap-1.5 group cursor-default`}>
                    {label}
                    {tooltip && (
                        <span className="inline-flex items-center text-slate-400 hover:text-blue-500 transition-colors" title={tooltip}>
                            <Info size={14} strokeWidth={2.5} />
                        </span>
                    )}
                </span>
            </div>
            <span className={`${isTotal ? 'text-xl font-black text-blue-700' : isHighlight ? 'font-bold text-slate-800' : 'text-slate-700 font-medium'}`}>
                {formatBs(value)}
            </span>
        </div>
    );

    return (
        <div className="fade-in animate-in slide-in-from-bottom-2 duration-500">
            <Row
                label="Subtotal Operación"
                value={subtotal}
            />
            <Row
                label="Comisión Casa de Bolsa"
                value={comision}
                tooltip="Tarifa base del 3% establecida por la Casa de Bolsa"
            />
            <Row
                label="I.V.A. (16%)"
                value={iva}
                tooltip="Impuesto al Valor Agregado aplicado únicamente sobre la comisión"
            />
            <Row
                label="Derecho de Registro"
                value={registro}
                tooltip="Mínimo 5 Bs o 0.1% de la transacción según el monto total"
            />

            {recargo > 0 && (
                <Row
                    label="Recargo 1.5% (Otro Banco)"
                    value={recargo}
                    isHighlight
                    tooltip="Cargo adicional por conciliación de fondos de otra entidad financiera"
                />
            )}

            <Row
                label="Total a Pagar / Recibir"
                value={totalFinal}
                isTotal
            />

            <div className="mt-6 flex gap-2">
                <div className="flex-1 bg-blue-50 p-3 rounded-xl border border-blue-100 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                        <TrendingUp size={12} className="text-blue-400" />
                        <p className="text-[10px] uppercase font-bold text-blue-400">Monto Líquido</p>
                    </div>
                    <p className="text-sm font-bold text-blue-900">{formatBs(totalFinal)}</p>
                </div>
                <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                        <Landmark size={12} className="text-slate-400" />
                        <p className="text-[10px] uppercase font-bold text-slate-400">Total Impuestos</p>
                    </div>
                    <p className="text-sm font-bold text-slate-700">{formatBs(iva + registro)}</p>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
