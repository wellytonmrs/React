import { useCallback, useState } from "react";


export const Dashboard = () => {

    const [list, setList] = useState<string[]>(['Example1', 'Example2']);
    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
        useCallback((e) => {

            if (e.key === 'Enter') {
                if (e.currentTarget.value.trim().length === 0) return;

                const value = e.currentTarget.value;
                e.currentTarget.value = '';

                setList((oldList) => {

                    if(oldList.includes(value)) return oldList;

                    return [...oldList, value];
                });
            }
        }, []);

    return (
        <div>
            <p>List</p>

            <input onKeyDown={handleInputKeyDown} />

            <ul>
                {list.map((value, index) => {
                    return <li key={index}>{++index}: {value}</li>
                })}
            </ul>


        </div>
    );
}