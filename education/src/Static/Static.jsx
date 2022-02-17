const api = 'http://127.0.0.1:8000/api/';
export const host = (data) => api + data;
export const format = (data) => data.map((e, i)=>({'index': i + 1, 'key':e.id, ...e}));