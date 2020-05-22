import { ApiUri, server } from '../staticresources/resources'

class Authenticate {


    sendAuthenticateRequest = async (username, password) => {
        try {
            let form = {
                'username': username,
                'password': password,
            };

            let url = ApiUri.login;

            return await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'XSRF-TOKEN': '*',
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            }).then(response => response.json())
                .catch(console.error);
        }
        catch{

        }
    };
}

var Auth = new Authenticate();
export default Auth;