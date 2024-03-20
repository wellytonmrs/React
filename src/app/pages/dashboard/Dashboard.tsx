import { useCallback, useState } from "react";

interface ITaskItens {
    id: number;
    title: string;
    isCompleted: boolean;
}

export const Dashboard = () => {

    const [list, setList] = useState<ITaskItens[]>([]);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
        useCallback((e) => {

            if (e.key === 'Enter') {
                if (e.currentTarget.value.trim().length === 0) return;

                const value = e.currentTarget.value;
                e.currentTarget.value = '';

                setList((oldList) => {

                    if (oldList.some((ListItem) => ListItem.title === value)) return oldList;

                    return [...oldList, { id: oldList.length, title: value, isCompleted: false }];
                });
            }
        }, []);

    return (
        <div>
            <p>List</p>

            <input onKeyDown={handleInputKeyDown} />

            <p>{list.filter((listItem) => listItem.isCompleted).length}</p>

            <ul>
                {list.map((ListItem) => {
                    return <li key={ListItem.id}>
                        <input
                            type="checkbox"
                            checked={ListItem.isCompleted}
                            onChange={() => {
                                setList(oldList => {
                                    return oldList.map(oldListItem => {
                                        const newIsSelected = oldListItem.title === ListItem.title
                                            ? !oldListItem.isCompleted
                                            : oldListItem.isCompleted;

                                        return { ...oldListItem, isCompleted: newIsSelected, };
                                    });
                                });
                            }} />

                        {ListItem.title}
                    </li>
                })}
            </ul>


        </div>
    );
}