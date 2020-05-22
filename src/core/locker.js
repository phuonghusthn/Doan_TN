import { ApiUri, server } from '../staticresources/resources'

class Lockers {

    createLayout = async (lId = 0, lNum = 0, lCol = 0, lRow = 0, lPage = 0, label = '', imei = '') => {
        try {
            let url = ApiUri.locker.createLayout.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
                'lNum': lNum,
                'lCol': lCol,
                'lRow': lRow,
                'lPage': lPage,
                'label': label,
                'imei': imei,
            }

            return await fetch(url, {
                method: ApiUri.locker.createLayout.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    getLocker = async (bId = 0, lvId = 0, imei = '', label = '', gLocker = 0, gStatus = 0, page = 1) => {
        try {
            let url = ApiUri.locker.getLocker.uri;
            url += '?bId=' + bId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&lvId=' + lvId;
            url += '&imei=' + imei;
            url += '&label=' + label;
            url += '&gLocker=' + gLocker;
            url += '&gStatus=' + gStatus;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.locker.getLocker.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{

        }

    }

    getUsage = async (eCode = '', label = '', imei = '', lvId = 0, bId = 0, page = 1) => {
        try {
            let url = ApiUri.locker.getUsage.uri
            url += '?imei=' + imei;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&eCode=' + eCode;
            url += '&label=' + label;
            url += '&lvId=' + lvId;
            url += '&bId=' + bId;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.locker.getUsage.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    getRestrict = async (eCode = '', label = '', imei = '', lvId = 0, bId = 0, page = 1) => {
        try {
            let url = ApiUri.locker.getRestrict.uri
            url += '?imei=' + imei;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&eCode=' + eCode;
            url += '&label=' + label;
            url += '&lvId=' + lvId;
            url += '&bId=' + bId;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.locker.getRestrict.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    getManageLocker = async (bId = 0, lId = 0, imei = '', label = '',  page = 1) => {
        try {
            let url = ApiUri.locker.getManage.uri
            url += '?bId=' + bId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&lId=' + lId;
            url += '&imei=' + imei;
            url += '&label=' + label;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.locker.getManage.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{

        }

    }

    openLocker = async (lId = 0) => {
        try {
            let url = ApiUri.locker.openLocker.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }

            return await fetch(url, {
                method: ApiUri.locker.openLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    freeLocker = async (lId = 0) => {
        try {
            let url = ApiUri.locker.freeLocker.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }

            return await fetch(url, {
                method: ApiUri.locker.freeLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    freeAllLocker = async (imei = '') => {
        try {
            let url = ApiUri.locker.freeAllLocker.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'imei': imei,
            }

            return await fetch(url, {
                method: ApiUri.locker.freeAllLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    confirmLocker = async (lId = 0) => {
        try {
            let url = ApiUri.locker.confirmLocker.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }

            return await fetch(url, {
                method: ApiUri.locker.confirmLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    disableLocker = async (lId = 0) => {
        try {
            let url = ApiUri.locker.disableLocker.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }

            return await fetch(url, {
                method: ApiUri.locker.disableLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    removeLocker = async (lId = 0) => {
        try {
            let url = ApiUri.locker.removeLocker.uri

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }

            return await fetch(url, {
                method: ApiUri.locker.removeLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    enableLocker = async (lId = 0) => {
        try {
            let url = ApiUri.locker.enableLocker.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }

            return await fetch(url, {
                method: ApiUri.locker.enableLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    reportLocker = async (lId = 0) => {
        try {
            let url = ApiUri.locker.reportLocker.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }

            return await fetch(url, {
                method: ApiUri.locker.reportLocker.method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }
}

var Locker = new Lockers();
export default Locker;