import { API } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface ITaskItem {
    id: number;
    title: string;
    isCompleted: boolean;
}

const getAll = async (): Promise<ITaskItem[] | ApiException> => {
    try {
        const { data } = await API().get('/tasks');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consutar a API.');
    }
};
const getById = async (id: number): Promise<ITaskItem | ApiException> => {
    try {
        const { data } = await API().get(`/tasks/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consutar o registro.');
    }

};
const create = async (dataToCreate: Omit<ITaskItem, `id`>): Promise<ITaskItem[] | ApiException> => {
    try {
        const { data } = await API().post<any>('/tasks', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao cadastrar o registro.');
    }

};
const updateById = async (id: number, dataToUpdate: ITaskItem): Promise<ITaskItem[] | ApiException> => {
    try {
        const { data } = await API().put<any>(`/tasks${id}`, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar o registro.');
    }

};
const deleteById = async (id: number): Promise<undefined | ApiException> => {
    try {
        await API().delete(`/tasks/${id}`);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao deletar o registro.');
    }

};
export const TarefaService = {
    getAll,
    create,
    getById,
    updateById,
    deleteById,
};