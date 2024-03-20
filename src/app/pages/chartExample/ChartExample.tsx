import React from 'react';
import Charts from '../../shared/components/ColumnRangeChart';

export const ChartExample = () => {
    const chartDataPrej = [
        { name: 'fat', x: 1, low: 0, high: 21, color: '#157A00' },
        { name: 'cus', x: 2, low: 0, high: 29.9, color: '#EFB103' },
        { name: 'gas', x: 2, low: 29.9, high: 37.52, color: '#A2ABB9' },
        { name: 'mar', x: 3, low: 21, high: 37.52, color: '#712EFF' },
        { name: 'par', x: 3, low: 37.52, high: 43.82, color: '#AF2277' },
        { name: 'pre', x: 4, low: 21, high: 43.82, color: '#FF0000' }
    ];

    const chartDataLucro = [
        { name: 'fat', x: 0, low: 0, high: 1125, color: '#157A00' },
        { name: 'cus', x: 1, low: 0, high: 300, color: '#EFB103' },
        { name: 'gas', x: 1, low: 300, high: 363, color: '#A2ABB9' },
        { name: 'mar', x: 1, low: 363, high: 1125, color: '#712EFF' },
        { name: 'par', x: 2, low: 363, high: 492.4, color: '#AF2277' },
        { name: 'luc', x: 2, low: 492.4, high: 1125, color: '#01AC98' }
    ];

    return (

        <div>
            <p>Case 1 Prejuizo</p>
            <div > {/* Adjust size for the first chart */}

                <Charts data={chartDataPrej} height="300px" />
            </div>
            <p>Case 2 Lucro</p>
            <div > {/* Adjust size for the second chart */}

                <Charts data={chartDataLucro} height="225px" />
            </div>
        </div>

    );
}