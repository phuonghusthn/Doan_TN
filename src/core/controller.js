import { ApiUri, server } from '../staticresources/resources'

class Controllers {

    createController = async (bId= 0, des = '', imei = '', lId = 0, mac = '', zone = '') => {
        try {
            let url = ApiUri.controller.createController.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'bId': bId,
                'des': des,
                'imei': imei,
                'lId': lId,
                'mac': mac,
                'zone': zone,
            }

            return await fetch(url, {
                method: ApiUri.controller.createController.method,
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

    getController = async (bId = 0, lId = 0, imei = '', mac = '', zone = '', page = 0) => {
        try {
            let url = ApiUri.controller.getController.uri;
            url += '?lId=' + lId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&bId=' + bId;
            url += '&imei=' + imei;
            url += '&mac=' + mac;
            url += '&zone=' + zone;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.controller.getController.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }
    }

    editController = async (cId=0, des = '', bId = 0, lId = 0, imei = '', mac = '', zone = '') => {
        try {
            let url = ApiUri.controller.editController.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'bId': bId,
                'cId': cId,
                'des': des,
                'imei': imei,
                'lId': lId,
                'mac': mac,
                'zone': zone

            }

            return await fetch(url, {
                method: ApiUri.controller.editController.method,
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

    removeController = async (cId = 0) => {
        try {
            let url = ApiUri.controller.removeController.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'cId': cId,
            }
            return await fetch(url, {
                method: ApiUri.controller.removeController.method,
                // mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error)
        }
        catch{ }

    }
}

var Controller = new Controllers();
export default Controller;