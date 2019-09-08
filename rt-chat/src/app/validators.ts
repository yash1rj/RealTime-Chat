import { FormControl } from '@angular/forms';

export class Validations {

    validateLogin(password:FormControl) {
        const regex1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,18}$/gm;
        return regex1.test(password.value) ? null : {
            passwordValid: {
                valid: false
            }
        }
    }
}