export const Routes = {
    HOME: '/',
    CLIENTS: {
        LIST: '/clients',
        CREATE: '/clients/create',
        EDIT: '/clients/:id',
        EDIT_PARAM: (id?: number) => `/clients/${id}`
    },
    AUTH:{
        LOGIN: '/login'
    }
}