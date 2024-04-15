interface props{
    pageIndex: Number,
    category: null | String,
    order: null | String
    
}

interface create{
    name: null | String,
    content: null | String,
    startDate: Date
    endDate: null | Date,
    tagsId: Number | null,
    statusId: Number | null
}

export async function fetchTasks({pageIndex, category, order}:props ) {
    try {
        const response = await fetch(`http://localhost:5184/Task/${pageIndex}?category=${category}&order=${order}`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return null;
    }
}

export async function fetchStatistics() {
    try {
        const response = await fetch(`http://localhost:5184/Task/stats`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return null;
    }
}

export async function CreateTask(data: create) {
    try {
        const response = await fetch('http://localhost:5184/Task', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        const tasks = await response.json();
        return tasks.id;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return null;
    }
}

export async function UpdateTask(data:create, id: Number){
    try {
        const response = await fetch(`http://localhost:5184/Task/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('ERROR');
        }
        return true;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return false;
    }
}

export async function UpdateStatus(id:number, status:number) {
    try {
        const response = await fetch(`http://localhost:5184/Task/Status/${id}?status=${status}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('ERROR');
        }
        return true;
    } catch (error) {
        console.error('Error updating task status:', error);
        return false;
    }
}


export async function DeleteTask(id: Number){
    try {
        const response = await fetch(`http://localhost:5184/Task/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok){
            throw new Error('ERROR');
        }
        return true;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return false;
    }
}