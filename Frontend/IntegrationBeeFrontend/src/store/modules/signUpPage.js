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
        trimFormData(){
            this.signUpForm.firstName = this.signUpForm.firstName.trim()
            this.signUpForm.lastName = this.signUpForm.lastName.trim()
            this.signUpForm.email = this.signUpForm.email.trim()
            this.signUpForm.school = this.signUpForm.school.trim()
        },
        validateFormData(){

            for(const error in this.formErrors){
                if(error!=="errorTexts")
                    this.formErrors[error] = false
            }

            if(this.signUpForm.password!==this.signUpForm.repeatedPassword){
                this.formErrors.invalidPasswordMatch = true;
            }

            if(!/[a-z]/.test(this.signUpForm.password)){
                this.formErrors.errorTexts.passwordError = "Password must include lowercase letters"
                this.formErrors.invalidPassword = true
            }else if(!/[A-Z]/.test(this.signUpForm.password)){
                this.formErrors.errorTexts.passwordError = "Password must include uppercase letters"
                this.formErrors.invalidPassword = true
            }else if(!/[0-9]/.test(this.signUpForm.password)){
                this.formErrors.errorTexts.passwordError = "Password must include at least one digit"
                this.formErrors.invalidPassword = true
            }else if(!/[!@#$%^&*(),.?":{}|<>_]/.test(this.signUpForm.password)){
                this.formErrors.errorTexts.passwordError = "Password must include special characters e.g. $#@_..."
                this.formErrors.invalidPassword = true
            }else if(this.signUpForm.password.length < 8){
                this.formErrors.errorTexts.passwordError = "Password must be at least 8 characters long"
                this.formErrors.invalidPassword = true
            }else if(typeof this.signUpForm.password !== "string"){
                this.formErrors.errorTexts.passwordError = "Invalid password"
                this.formErrors.invalidPassword = true
            }else if(/\s/.test(this.signUpForm.password)){
                this.formErrors.errorTexts.passwordError = "Password cannot contain spaces"
                this.formErrors.invalidPassword = true
            }

            if(!(typeof this.signUpForm.firstName === "string" && this.signUpForm.firstName.length > 0)){
                this.formErrors.invalidFirstName = true;
            }

            if(!(typeof this.signUpForm.lastName === "string" && this.signUpForm.lastName.length > 0 && validSurnamePattern.test(this.signUpForm.lastName))){
                this.formErrors.invalidLastName = true;
            }

            if(!(typeof this.signUpForm.email === "string" && this.signUpForm.email.length > 0 && validEmailPattern.test(this.signUpForm.email))){
                this.formErrors.invalidEmail = true;
            }

            if(!(typeof this.signUpForm.school === "string" && this.signUpForm.school.length > 0)){
                this.formErrors.invalidSchool = true;
            }

            if(!this.signUpForm.ageConsent){
                this.formErrors.invalidAgeConsent = true
            }

            if(!this.signUpForm.userAgreementConsent){
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

