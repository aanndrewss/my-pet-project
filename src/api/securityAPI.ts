import {instance} from "./api";

type GetCaptchaUrlResponseType = {
    url: any;
    utl: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
    }
}