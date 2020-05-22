import { ApiUri, server } from '../staticresources/resources'

class Departments {

    getDepartment = async (dId = 0, name = '', page = 0) => {
        try {
            let url = ApiUri.department.getDepartment.uri;
            url += '?name=' + name;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&dId=' + dId;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.department.getDepartment.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }
    }

    createDepartment = async (name = '') => {
        try {
            let url = ApiUri.department.createDepartment.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'name': name,
            }

            return await fetch(url, {
                method: ApiUri.department.createDepartment.method,
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


    editDepartment = async (dId = 0, name = '') => {
        try {
            let url = ApiUri.department.editDepartment.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'dId': dId,
                'name': name,
                }

            return await fetch(url, {
                method: ApiUri.department.editDepartment.method,

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

    removeDepartment = async (dId = 0) => {
        try {
            let url = ApiUri.department.removeDepartment.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'dId': dId,
            }
            return await fetch(url, {
                method: ApiUri.department.removeDepartment.method,
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

var Department = new Departments();
export default Department;