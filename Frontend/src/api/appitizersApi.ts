export const fetchAppitizer = async () => {
    const res = await fetch('http://64.227.119.208:5000/appitizer');
    const data = await res.json();    
    return data;
}
