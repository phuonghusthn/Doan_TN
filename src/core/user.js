import { ApiUri, server } from '../staticresources/resources'

class Users {

    createUser = async (name = '', code = '', email, dId = 0, tag = '', pin = false) => {
        try {
            let url = ApiUri.user.createUser.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'name': name,
                'code': code,
                'email': email,
                'dId': dId,
                'pin': pin,
                'tag': tag,
            }

            return await fetch(url, {
                method: ApiUri.user.createUser.method,
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

    getUser = async (dId = 0, name = '', code = '', email = '', tag = '', isTag = 0, isPin = 0, isGroup = 0, page = 1) => {
        try {
            let url = ApiUri.user.getUser.uri + '?dId=' + dId;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&name=' + name;
            url += '&eCode=' + code;
            url += '&email=' + email;
            url += '&tag=' + tag;
            url += '&isTag=' + isTag;
            url += '&isPin=' + isPin;
            url += '&isGroup=' + isGroup;
            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.user.getUser.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }
    }

    // Danh sách người dùng hiện tại 
    getUsage = async (eName = '', eCode = '', label = '', dId = 0, bId = 0, page = 1) => {
        try {
            let url = ApiUri.user.getUsage.uri
            url += '?eName=' + eName;
            url += '&token=' + localStorage.getItem('crfs');
            url += '&eCode=' + eCode;
            url += '&label=' + label;
            url += '&dId=' + dId;
            url += '&bId=' + bId;

            url += '&page=' + page;

            return await fetch(url, {
                method: ApiUri.user.getUsage.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    editUser = async (eId = 0, name = '', email = '', dId = 0, tag = '') => {
        try {
            let url = ApiUri.user.editUser.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'eId': eId,
                'name': name,
                'email': email,
                'dId': dId,
                'tag': tag
            }

            return await fetch(url, {
                method: ApiUri.user.editUser.method,
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

    removeUser = async (eId = 0) => {
        try {
            let url = ApiUri.user.removeUser.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'eId': eId,
            }
            return await fetch(url, {
                method: ApiUri.user.removeUser.method,
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

    unmapPin = async (eId = 0) => {
        try {
            let url = ApiUri.user.unmapPin.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'eId': eId,
            }

            return await fetch(url, {
                method: ApiUri.user.unmapPin.method,
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

    mapNewLocker = async (listEmp = [], listLk = [], reuse = false) => {
        try {
            let url = ApiUri.user.mapNewLocker.uri

            let form = {
                'token': localStorage.getItem('crfs'),
                'listEmp': listEmp,
                'listLk': listLk,
                'reuse': reuse,
            }

            return await fetch(url, {
                method: ApiUri.user.mapNewLocker.method,
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
        catch{

        }

    }

    mapExistedLocker = async (eCode = '', listLk = [], reuse = false) => {
        try {
            let url = ApiUri.user.mapExistedLocker.uri

            let form = {
                'token': localStorage.getItem('crfs'),
                'eCode': eCode,
                'listLk': listLk,
                'reuse': reuse,
            }

            return await fetch(url, {
                method: ApiUri.user.mapExistedLocker.method,
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
        catch{

        }

    }


    unmapLocker = async (eCode = '', lId = 0, all = false) => {
        try {
            let url = ApiUri.user.unmapLocker.uri

            let form = {
                'token': localStorage.getItem('crfs'),
                'eCode': eCode,
                'lId': lId,
                'all': all,
            }

            return await fetch(url, {
                method: ApiUri.user.unmapLocker.method,
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
        catch{

        }

    }

    mapPin = async (eId = 0) => {
        try {
            let url = ApiUri.user.mapPin.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'eId': eId,
            }

            return await fetch(url, {
                method: ApiUri.user.mapPin.method,
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
        catch{

        }

    }

    sendPin = async (eId = 0) => {
        try {
            let url = ApiUri.user.sendPin.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'eId': eId,
            }

            return await fetch(url, {
                method: ApiUri.user.sendPin.method,
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

    unmapTag = async (eId = 0) => {
        try {
            let url = ApiUri.user.unmapTag.uri;

            let form = {
                'token': localStorage.getItem('crfs'),
                'eId': eId,
            }

            return await fetch(url, {
                method: ApiUri.user.unmapTag.method,
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

var User = new Users();
export default User;