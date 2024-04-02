import { useCallback, useEffect, useState } from "react";
import { ITaskItem, TarefaService } from "../../shared/services/api/tasks/TasksService";
import { ApiException } from "../../shared/services/api/ApiException";


export const Dashboard = () => {
    const [list, setList] = useState<ITaskItem[]>([]);

    useEffect(() => {
        TarefaService.getAll()
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setList(result);
                }
            });
    }, []);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            if (list.some((listItem) => listItem.title === value)) return;

            TarefaService.create({ title: value, isCompleted: false })
                .then((result) => {
                    if (result instanceof ApiException) {
                        alert(result.message);
                    } else {
                        setList((oldList) => [...oldList, result]);
                    }
                });
        }
    }, [list]);

    const handleToggleComplete = useCallback((id: number) => {

        const taskToUpdate = list.find((task) => task.id === id);

        if (!taskToUpdate) return;

        TarefaService.updateById(id,
            { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted })
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setList(oldList => {
                        return oldList.map(oldListItem => {
                            const newIsCompleted = oldListItem.id === id ? !oldListItem.isCompleted : oldListItem.isCompleted;

                            return { ...oldListItem, isCompleted: newIsCompleted, }
                        });
                    });
                }
            });
    }, [list]);

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
                            onChange={() => handleToggleComplete(ListItem.id)}
                        />
                        {ListItem.title}
                    </li>
                })}
            </ul>
        </div>
    );
}