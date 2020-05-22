import { ApiUri, server } from '../staticresources/resources'

class Levels {

    createLevel = async (bId= 0, des = '', lLv = 0) => {
        try {
            let url = ApiUri.level.createLevel.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'bId': bId,
                'des': des,
                'lLv': lLv,
            }

            return await fetch(url, {
                method: ApiUri.level.createLevel.method,
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


    getLevel = async (bId = 0, page = 0) => {
        try {
            let url = ApiUri.level.getLevel.uri;
            url += '?bId=' + bId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.level.getLevel.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    editLevel = async (lId = 0, bId =0, des ='', lLv = 0) => {
        try {
            let url = ApiUri.level.editLevel.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
                'des': des,
                'bId': bId,
                'lLv': lLv,
            }

            return await fetch(url, {
                method: ApiUri.level.editLevel.method,
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

    removeLevel = async (lId = 0) => {
        try {
            let url = ApiUri.level.removeLevel.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'lId': lId,
            }
            return await fetch(url, {
                method: ApiUri.level.removeLevel.method,
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

var Level = new Levels();
export default Level;