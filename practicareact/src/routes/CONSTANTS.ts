export const Routes = {
    HOME: '/',
    CLIENTS: {
        LIST: '/clients',
        CREATE: '/clients/create',
        EDIT: '/clients/:id',
        EDIT_PARAM: (id?: number) => `/clients/${id}`
    },
    PRODUCTS:{
        LIST: '/products',
        CREATE: '/products/create',
        EDIT: '/products/:id',
        EDIT_PARAM: (id?: number) => `/products/${id}`
    },
    AUTH:{
        LOGIN: '/login'
    }
}