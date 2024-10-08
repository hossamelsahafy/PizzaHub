export const fetchAppitizer = async () => {
    try {
        const res = await fetch('https://pizzahub.me:5000/appitizer');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();    
        return data;
    } catch (error) {
        console.error('Failed to fetch appetizer:', error);
        return null;
    }
}
