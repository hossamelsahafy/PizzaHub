export const fetchDrink = async () => {
    const res = await fetch('https://pizzahub.me:5000/drinks');
    const data = await res.json();
    return data;
}
