export const toastMessage = (code: any, message:string) => {
    if (+code === 3) return alert(message);
    else if (+code === 2) return alert(message);
    else if (+code === 5) return alert(message);
    else if (+code === 6) return alert(message);
    else if (+code === 7) return alert(message);
    else if (+code === 4) return alert(message);
};