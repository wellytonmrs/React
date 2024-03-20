import React, { useState, useEffect } from 'react';
import Charts, { ChartData } from '../../shared/components/ColumnRangeChart';


export const Rentabilidade: React.FC = () => {

    const [cmvDivWidth, setCmvDiv] = useState<number>(0);
    const [fatDivWidth, setFatDiv] = useState<number>(0);
    const [gvDivWidth, setGvDiv] = useState<number>(0);
    const [mcDivWidth, setMcDivWidth] = useState<number>(0);
    const [gfDivWidth, setGfDiv] = useState<number>(0);
    const [lucroDivWidth, setLucroDiv] = useState<number>(0);
    const [prejDivWidth, setPrejDiv] = useState<number>(0);
    const [mcDiv, setMcDiv] = useState<string>("secondRow");

    /*const [self, setSelf] = useState({
        fat: 2.24,//Number(response.responseBody.somaFaturamento);
        cmv: 0.86,//Number(response.responseBody.somaCustoMercadoriaVendida);
        gv: 0.48,//Number(response.responseBody.somaGastoVariavel);
        gf: 0.22,//Number(response.responseBody.somaGastoFixo);
        mc: 0.90,//Number(response.responseBody.margemContrib);
        lucro: 0.68,//Number(response.responseBody.somaLucro);
    });*/

    const [self, setSelf] = useState({
        fat: 1542.00,//Number(response.responseBody.somaFaturamento);
        cmv: 1384.10,//Number(response.responseBody.somaCustoMercadoriaVendida);
        gv: 246.72,//Number(response.responseBody.somaGastoVariavel);
        gf: 154.20,//Number(response.responseBody.somaGastoFixo);
        mc: -88.82,//Number(response.responseBody.margemContrib);
        lucro: -243.02,//Number(response.responseBody.somaLucro);
    });


    const [chartData, setChartData] = useState<ChartData[]>([
        { name: 'fat', x: 0, low: 0, high: 0, color: '#157A00', visible: true },
        { name: 'cus', x: 1, low: 0, high: 0, color: '#EFB103', visible: true },
        { name: 'gas', x: 1, low: 0, high: 0, color: '#A2ABB9', visible: true },
        { name: 'mar', x: 1, low: 0, high: 0, color: '#712EFF', visible: true },
        { name: 'par', x: 2, low: 0, high: 0, color: '#AF2277', visible: true },
        { name: 'luc', x: 2, low: 0, high: 0, color: '#01AC98', visible: false },
        { name: 'pre', x: 3, low: 0, high: 0, color: '#FF0000', visible: false }
    ]);

    useEffect(() => {

        let widthRate = self.lucro > 0 ? (100 / self.fat) : (100 / (self.fat - self.lucro));

        if (self.cmv + self.gv + self.mc > self.fat) {
            if (self.lucro > 0) {
                widthRate = 100 / (self.cmv + self.gv + self.mc);
            } else {
                widthRate = 100 / (self.cmv + self.gv + self.mc - self.lucro);
            }
        }

        setFatDiv(Math.abs(self.fat) * widthRate);

        if (self.cmv > 0) {
            setCmvDiv(Math.abs(self.cmv) * widthRate);
        }

        if (self.gv > 0) {
            setGvDiv(Math.abs(self.gv) * widthRate);
        }

        if (self.mc > 0) {
            setMcDivWidth(Math.abs(self.mc) * widthRate);
            if (self.gf > 0) {
                setGfDiv(Math.abs(self.gf) * widthRate);
            }
            setMcDiv("secondRow");
        } else {
            setGfDiv(Math.abs(self.gf) * widthRate);
            setMcDivWidth(Math.abs(self.mc) * widthRate);
            setMcDiv("thirdRow");
        }

        if (self.lucro > 0) {
            setLucroDiv(Math.abs(self.lucro) * widthRate);
            setPrejDiv(0);
        } else {
            setLucroDiv(0);
            setPrejDiv(Math.abs(self.lucro) * widthRate);
        }

        setChartData(prevData => prevData.map(item => {
            if (item.name === 'fat') {
                return { ...item, low: 0, high: fatDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'cus') {
                return { ...item, low: 0, high: cmvDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'gas') {
                return { ...item, low: cmvDivWidth, high: cmvDivWidth + gvDivWidth };
            }
            return item;
        }));
        let mardiv = 1;
        let marlow = cmvDivWidth + gvDivWidth;
        let marhigh = cmvDivWidth + gvDivWidth + mcDivWidth;
        if (mcDiv === 'thirdRow') {
            mardiv = 2;
            marlow = cmvDivWidth + gvDivWidth - mcDivWidth;
            marhigh = cmvDivWidth + gvDivWidth;
        }

        setChartData(prevData => prevData.map(item => {
            if (item.name === 'mar') {

                return { ...item, x: mardiv, low: marlow, high: marhigh };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'par') {
                return { ...item, low: cmvDivWidth + gvDivWidth, high: cmvDivWidth + gvDivWidth + gfDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'luc') {
                let lucVisible = true;
                if (lucroDivWidth === 0) {
                    lucVisible = false;
                }
                return { ...item, low: cmvDivWidth + gvDivWidth + gfDivWidth, high: cmvDivWidth + gvDivWidth + gfDivWidth + lucroDivWidth, visible: lucVisible };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'pre') {
                let preVisible = false;
                if (lucroDivWidth === 0) {
                    preVisible = true;
                }
                return { ...item, low: marlow, high: marlow + prejDivWidth, visible: preVisible };
            }
            return item;
        }));

    }, [self]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSelf(prevState => ({
            ...prevState,
            [name]: parseFloat(value) || 0 // Ensure value is a number or default to 0
        }));
    };

    return (
        <div>
            <form>
                <label>CMV:</label>
                <input
                    type="number"
                    name="cmv"
                    value={self.cmv}
                    onChange={handleChange}
                />
                <br />
                <label>FAT:</label>
                <input
                    type="number"
                    name="fat"
                    value={self.fat}
                    onChange={handleChange}
                />
                <br />
                <label>GV:</label>
                <input
                    type="number"
                    name="gv"
                    value={self.gv}
                    onChange={handleChange}
                />
                <br />
                <label>MC:</label>
                <input
                    type="number"
                    name="mc"
                    value={self.mc}
                    onChange={handleChange}
                />
                <br />
                <label>GF:</label>
                <input
                    type="number"
                    name="gf"
                    value={self.gf}
                    onChange={handleChange}
                />
                <br />
                <label>Lucro:</label>
                <input
                    type="number"
                    name="lucro"
                    value={self.lucro}
                    onChange={handleChange}
                />
                <br />
            </form>
            <div>
                <h2>States:</h2>
                <p>CMV Div Width: {cmvDivWidth}</p>
                <p>FAT Div Width: {fatDivWidth}</p>
                <p>GV Div Width: {gvDivWidth}</p>
                <p>MC Div Width: {mcDivWidth}</p>
                <p>GF Div Width: {gfDivWidth}</p>
                <p>Lucro Div Width: {lucroDivWidth}</p>
                <p>Prej Div Width: {prejDivWidth}</p>
                <p>MC Div: {mcDiv}</p>
            </div>

            <div >
                <h2>Chart Rentabilidade:</h2>
                <Charts data={chartData} height={mcDiv === 'thirdRow' ? "300px" : "225px"} />
            </div>

        </div>
    );
};