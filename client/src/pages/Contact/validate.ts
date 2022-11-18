import {FormData} from './index';

export default function validate(data: FormData) {
    const error: Partial<FormData> = {};
    
    if (data.name?.length === 0) {
        error.name = 'Please provide your name'
    }

    if (data.email?.length === 0) {
        error.email = 'Please provide an email'
    } else if (data.email && !validateEmail(data.email)) {
        error.email = 'Please provide a valid email'
    }

    return error;
}

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};