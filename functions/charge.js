

export default function checkLocalStorageStatus(setState) {
    const userPID = localStorage.getItem('userPID');
    const tokens = localStorage.getItem('tokens');

    if (!userPID || !tokens) {
        setState('disconnected');
        return null;
    }

    return userPID;
}
