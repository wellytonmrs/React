import React, { useState, useEffect } from 'react';
import Charts from '../../shared/components/Charts';


export const Rentabilidade: React.FC  = () => { 

    const [cmvDivWidth, setCmvDiv] = useState<number>(0);
    const [fatDivWidth, setFatDiv] = useState<number>(0);
    const [gvDivWidth, setGvDiv] = useState<number>(0);
    const [mcDivWidth, setMcDivWidth] = useState<number>(0);
    const [gfDivWidth, setGfDiv] = useState<number>(0);
    const [lucroDivWidth, setLucroDiv] = useState<number>(0);
    const [prejDivWidth, setPrejDiv] = useState<number>(0);
    const [mcDiv, setMcDiv] = useState<string>("secondRow");

    const [self, setSelf] = useState({
        cmv: 30.00,
        fat: 165.00,
        gv: 19.80,
        mc: 115.20,
        gf: 16.50,
        lucro: 98.70
    });

    interface ChartData {
        name: string;
        x: number;
        low: number;
        high: number;
        color: string;
    }

    const [chartData, setChartData] = useState<ChartData[]>([
        { name: 'fat', x: 0, low: 0, high: 0, color: '#157A00' },
        { name: 'cus', x: 1, low: 0, high: 0, color: '#EFB103' },
        { name: 'gas', x: 1, low: 0, high: 0, color: '#A2ABB9' },
        { name: 'mar', x: 1, low: 0, high: 0, color: '#712EFF' },
        { name: 'par', x: 2, low: 0, high: 0, color: '#AF2277' },
        { name: 'luc', x: 2, low: 0, high: 0, color: '#01AC98' }
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
        } else {
            setPrejDiv(Math.abs(self.lucro) * widthRate);
        }

        setChartData(prevData => prevData.map(item => {
            if (item.name === 'fat') {
                return { ...item, low:0, high: fatDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'cus') {
                return { ...item, low:0, high: cmvDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'gas') {
                return { ...item, low:cmvDivWidth, high: cmvDivWidth + gvDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'mar') {
                return { ...item, low:cmvDivWidth+gvDivWidth, high: cmvDivWidth + gvDivWidth + mcDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'par') {
                return { ...item, low:cmvDivWidth+gvDivWidth, high: cmvDivWidth + gvDivWidth + gfDivWidth };
            }
            return item;
        }));
        setChartData(prevData => prevData.map(item => {
            if (item.name === 'luc') {
                return { ...item, low:cmvDivWidth+gvDivWidth+gfDivWidth, high: cmvDivWidth + gvDivWidth + gfDivWidth + lucroDivWidth };
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
                <Charts data={chartData} height="350px" />
            </div>

        </div>
    );
};