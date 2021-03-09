export interface UserInterface {
    uid: string,
    email: string,
    emailVerified?: boolean,
    displayName: string,
    password: string,
    disabled: boolean,
    date?:Date
}

export interface ClientInterface {
    cid:string,
    name:string,
    phone: number,
    birthday?: Date,
    numberID: number,
    time: string,
    date?: Date,
    active: boolean,
    schedule?:boolean,
    hospital?: string,
    sick?: string,
    observations?: string,
    state?: number,
    pay?: boolean

}

export interface PaymentInterface {
    pid:string,
    cid: string,
    date: string,
    state: number,
    payForm: string,
    
}

export interface StateInterface {
    cid: string,
    phone: number,
    name: string,
    state: number,
    paymentDay: Date,
    pendingPay: Date,
    inactivePay: Date
}

export interface NotificationsInterface {
    wellcome: string;
    body: string;
    time: string;
}

export interface CongratulationsInterface {
    body: string;
}
