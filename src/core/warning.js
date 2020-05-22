import { ApiUri, server } from '../staticresources/resources'

class Warnings {

    getWarning = async (bId = 0, lvId = 0, imei = '', label = '', method = '', type = 0, rStatus = 0, sDate = '', eDate = '', page = 1) => {
        try {
            let url = ApiUri.warning.getWarning.uri;
            url += '?bId=' + bId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&lvId=' + lvId;
            url += '&imei=' + imei;
            url += '&label=' + label;
            url += '&method=' + method;
            url += '&type=' + type;
            url += '&rStatus=' + rStatus;
            url += '&sDate=' + sDate;
            url += '&eDate=' + eDate;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.warning.getWarning.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }

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
}

var Warning = new Warnings();
export default Warning