const HOST = 'http://localhost:3000'

export const CONSTANST = {
    permissions: {},
    routes: {
        authorization: {
            login: HOST + '/users/authenticate',
            logout: HOST + '/users/auth/logout',
            register: HOST + '/users/register'
        },
        group: {
            list: HOST + '/groups/grouplist',
            delete: HOST + '/groups/group/:id',
            save: HOST + '/groups/group'
        },
        contact: {
            grouplist: HOST + '/contacts/groups',
            list: HOST + '/contacts/contactlist',
            delete: HOST + '/contacts/contact/:id',
            save: HOST + '/contacts/contact'
        },
        user: {}
    },
    lang: {},
    session: {},
    parameters: {}
};
