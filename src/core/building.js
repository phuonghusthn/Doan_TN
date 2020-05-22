import { ApiUri, server } from '../staticresources/resources'

class Buildings {

    createBuilding = async (name = '',addr= '', des= '') => {
        try {
            let url = ApiUri.building.createBuilding.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'name': name,
                'addr': addr,
                'des': des,
            }

            return await fetch(url, {
                method: ApiUri.building.createBuilding.method,
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

    getBuilding = async (bId = 0, name = '', addr = '', page = 0) => {
        try {
            let url = ApiUri.building.getBuilding.uri;
            url += '?token=' + localStorage.getItem('crfs');
            url += '&name=' + name;
            url += '&addr=' + addr;
            url += '&bId=' + bId;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.building.getBuilding.method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }
    }

    editBuilding = async (bId = 0, name = '', addr = '', des = '') => {
        try {
            let url = ApiUri.building.editBuilding.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'bId': bId,
                'name': name,
                'addr': addr,
                'des': des,
            }

            return await fetch(url, {
                method: ApiUri.building.editBuilding.method,
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

    removeBuilding = async (bId = 0) => {
        try {
            let url = ApiUri.building.removeBuilding.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'bId': bId,
            }
            return await fetch(url, {
                method: ApiUri.building.removeBuilding.method,
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

var Building = new Buildings();
export default Building;