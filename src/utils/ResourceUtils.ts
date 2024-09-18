export const timestamp = () => {
    const ts = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }).split(',');
    const date = ts[0].trim();
    const year = ts[1].trim();
    const time = ts[2].trim();
    return { date, year, time };
}