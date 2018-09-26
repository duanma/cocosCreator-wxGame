import {HttpResponseConverter} from "./HttpResponseConverter";

export class QrcodePaymentResponse extends HttpResponseConverter{
    qrcodeUrl:string = null;
}