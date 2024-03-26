import {defineStore} from "pinia";
// import DnsEmailValidation from "dns-email-validation"
import {validSurnamePattern, validEmailPattern} from "@/utils/regexPatterns.js";


export const useSignUpPageStore = defineStore('signUp', {
    state: ()=>({
        signUpForm:{
            firstName: '',
            lastName: '',
            email: '',
            school: '',
            password: '',
            repeatedPassword: '',
            ageConsent: false,
            userAgreementConsent: false
        },
        formErrors:{
            invalidFirstName: false,
            invalidLastName: false,
            invalidEmail: false,
            invalidSchool: false,
            invalidPassword: false,
            invalidPasswordMatch: false,
            invalidAgeConsent: false,
            invalidUserAgreementConsent: false,
            errorTexts:{
                passwordError: ''
            }
        }
    }),
    getters:{

    },
    actions:{
        validateFormData(){

            for(const error in this.formErrors){
                if(error!=="errorTexts")
                    this.formErrors[error] = false
            }

            if(this.password!==this.repeatedPassword){
                console.log(this.password, this.repeatedPassword)
                this.formErrors.invalidPasswordMatch = true;
            }

            if(!/[a-z]/.test(this.password)){
                this.formErrors.errorTexts.passwordError = "Password must include lowercase letters"
                this.formErrors.invalidPassword = true
            }else if(!/[A-Z]/.test(this.password)){
                this.formErrors.errorTexts.passwordError = "Password must include uppercase letters"
                this.formErrors.invalidPassword = true
            }else if(!/[0-9]/.test(this.password)){
                this.formErrors.errorTexts.passwordError = "Password must include at least one digit"
                this.formErrors.invalidPassword = true
            }else if(!/[!@#$%^&*(),.?":{}|<>_]/.test(this.password)){
                this.formErrors.errorTexts.passwordError = "Password must include special characters e.g. $#@_..."
                this.formErrors.invalidPassword = true
            }else if(this.password.length < 8){
                this.formErrors.errorTexts.passwordError = "Password must be at least 8 characters long"
                this.formErrors.invalidPassword = true
            }else if(typeof this.password !== "string"){
                this.formErrors.errorTexts.passwordError = "Invalid password"
                this.formErrors.invalidPassword = true
            }

            if(!(typeof this.firstName === "string" && this.firstName.length > 0)){
                this.formErrors.invalidFirstName = true;
            }

            if(!(typeof this.lastName === "string" && this.lastName.length > 0 && validSurnamePattern.test(this.lastName))){
                this.formErrors.invalidLastName = true;
            }

            if(!(typeof this.email === "string" && this.email.length > 0 && validEmailPattern.test(this.email))){
                this.formErrors.invalidEmail = true;
            }

            if(!(typeof this.school === "string" && this.school.length > 0)){
                this.formErrors.invalidSchool = true;
            }

            if(!this.ageConsent){
                this.formErrors.invalidAgeConsent = true
            }

            if(!this.userAgreementConsent){
                this.formErrors.invalidUserAgreementConsent = true
            }

            for(const error in this.formErrors){
                if(error!=="errorTexts"){
                    if(this.formErrors[error]){
                        return false
                    }
                }
            }
            return true;

        }
    }
})

