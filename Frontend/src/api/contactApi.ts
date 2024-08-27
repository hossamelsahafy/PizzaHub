export const fetchContact = async (contactData) => {
    try {
        const res = await fetch('https://pizzahub.me:5000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching contact data:', error);
        throw error;
    }
};
