  
import { NotificationService } from '../services/notification.service'

export class NotificationClass{
    constructor(private ns:NotificationService){}

    showToasterSuccess(messange:string, header:string){
        this.ns.showSuccess(messange, header)
    }
    
    showToasterError(messange:string, header:string){
        this.ns.showError(messange, header)
    }
    
    showToasterInfo(messange:string, header:string){
        this.ns.showInfo(messange, header)
    }
    
    showToasterWarning(messange:string, header:string){
        this.ns.showWarning(messange, header)
    }


}