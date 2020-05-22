import { ApiUri, server } from '../staticresources/resources'

class Reports {
    
    getStatusReport = async (bId = 0, lId = 0, imei = '', lLabel = '', lStatus = 0, page = 1) => {
        try {
            let url = ApiUri.report.statusReport.uri
            url += '?bId=' + bId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&lId=' + lId;
            url += '&imei=' + imei;
            url += '&lLabel=' + lLabel;
            url += '&lStatus=' + lStatus;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.report.statusReport.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }
    }

    getHistoryReport = async (bId = 0, lId = 0, imei = '', lLabel = '', eName = '', eCode = '', sDate = '', eDate = '', page = 1) => {
        try {
            let url = ApiUri.report.historyReport.uri
            url += '?bId=' + bId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&lId=' + lId;
            url += '&imei=' + imei;
            url += '&lLabel=' + lLabel;
            url += '&eName=' + eName;
            url += '&eCode=' + eCode;
            url += '&sDate=' + sDate;
            url += '&eDate=' + eDate;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.report.historyReport.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }
    }

    getRealTimeReport = async () => {
        try {
            let url = ApiUri.report.eventReport.uri;
            url += '?token=' + localStorage.getItem('crfs');

            return await fetch(url, {
                method: ApiUri.report.eventReport.method,
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

var Report = new Reports();
export default Report;