export class Constants {
    /** Api client */
    public static readonly GET_CLIENTS: string = 'clients/get-clients';
    public static readonly CREATE_CLIENT: string = 'clients/create-client';
    public static readonly GET_BY_SHARED_KEY: string = 'clients/get-clinet-shared?shared=';
    public static readonly DELETE_CLIENT: string = 'clients/delete-client?id=';
    public static readonly SOLO_NUMEROS_PATTERN = /^[0-9]*$/;
}