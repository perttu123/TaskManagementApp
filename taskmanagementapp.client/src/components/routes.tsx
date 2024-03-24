interface props{
    pageIndex: Number,
    category: null | String
}

export async function fetchTasks({pageIndex, category}:props ) {
    try {
        const response = await fetch(`http://localhost:5184/Task/${pageIndex}?category=${category}`);
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

export async function CreateTask(data: any) {
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
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return null;
    }
}
