export const fetchPizza = async () => {
    const res = await fetch('https://pizzahub.me:5000/pizza');
    const data = await res.json();
    return data;
}
