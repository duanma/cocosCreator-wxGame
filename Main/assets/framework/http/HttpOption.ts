export class HttpOption{
    host:string = null;
    port:number = null;
    timeout:number = null;
    timeoutCommand:string = null;
    not200Command:string = null;
    cookieKey:string = null;
    headers = new Map<string, any>();
}