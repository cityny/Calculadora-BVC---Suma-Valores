import React from 'react';
import { Hash, CircleDollarSign, Building2 } from 'lucide-react';

/**
 * ## Componente: CalculatorForm - Formulario de Entrada de Datos
 * 
 * Este componente se encarga de recolectar la información necesaria para los cálculos:
 * - Cantidad de títulos.
 * - Precio por cada valor.
 * - Si aplica recargo por banco externo.
 * 
 * @param {Object} props.data - Estado actual de los datos (desde App.jsx).
 * @param {Function} props.onChange - Función para actualizar el estado en el componente padre.
 */
const CalculatorForm = ({ data, onChange }) => {

    /**
     * ## Manejo de Eventos: handleChange
     * 
     * Esta función unifica la captura de cambios tanto de inputs numéricos como de checkboxes.
     * Utiliza el atributo 'name' del input para saber qué propiedad del estado actualizar.
     */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onChange({
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <form className="space-y-6">

            {/* 
                ## Sección: Entrada de Cantidad
                Aquí es donde se define el número de acciones o títulos.
                El color de fondo se controla con 'bg-white'.
            */}
            <div className="space-y-2">
                <label htmlFor="cantidad" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Hash size={16} className="text-slate-400" />
                    Cantidad de Títulos / Valores
                </label>
                <div className="relative">
                    <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        value={data.cantidad}
                        onChange={handleChange}
                        // Aquí es donde ves el color de fondo: 'bg-white'
                        className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-800 font-medium"
                        placeholder="Ej: 100"
                        min="1"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        Unidades
                    </span>
                </div>
            </div>

            {/* 
                ## Sección: Entrada de Precio
                Captura el valor monetario en Bolívares.
                'step="0.01"' permite decimales para exactitud financiera.
            */}
            <div className="space-y-2">
                <label htmlFor="precio" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CircleDollarSign size={16} className="text-slate-400" />
                    Precio por Valor (Bs)
                </label>
                <div className="relative">
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={data.precio}
                        onChange={handleChange}
                        step="0.01"
                        // Color de fondo definido por 'bg-white'
                        className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-800 font-medium"
                        placeholder="Ej: 45.50"
                        min="0.01"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        Bs
                    </span>
                </div>
            </div>

            {/* 
                ## Sección: Switch de Recargo (Otro Banco)
                Componente visual (Toggle) para activar el recargo del 1.5%.
                Utiliza clases 'peer' para animar el cambio de estado.
            */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-dotted border-slate-300">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
                        <Building2 size={20} className="text-slate-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">Recargo por Otro Banco</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-tight" title="Recargo del 1.5% sobre el total inicial por transferencia de otros bancos">
                            Aplica 1.5% ADICIONAL
                        </span>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        name="esOtroBanco"
                        checked={data.esOtroBanco}
                        onChange={handleChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            {/* Mensaje Informativo adicional */}
            <div className="text-[10px] text-slate-400 italic">
                * Los campos se validan automáticamente. El cálculo incluye Comisión (3%) e IVA (16%).
            </div>
        </form>
    );
};

export default CalculatorForm;

