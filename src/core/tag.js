import { ApiUri, server } from '../staticresources/resources'

class Tags {

    getFreeTag = async () => {
        try {
            let url = ApiUri.tag.getFreeTag.uri;
            url += '?token=' + localStorage.getItem('crfs');

            return await fetch(url, {
                method: ApiUri.tag.getFreeTag.method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .catch(console.error);
        }
        catch{ }

    }

    getFreeAdminTag = async () => {
        try {
            let url = ApiUri.tag.getFreeAdminTag.uri;
            url += '?token=' + localStorage.getItem('crfs');

            return await fetch(url, {
                method: ApiUri.tag.getFreeAdminTag.method,
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

var Tag = new Tags();
export default Tag;