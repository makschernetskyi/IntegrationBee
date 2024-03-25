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
        }
    }),
    getters:{

    },
    actions:{
        updateSignUpFormFirstName(value){
            this.signUpForm.firstName = value;
        },
        updateSignUpFormLastName(value){
            this.signUpForm.lastName = value;
        },
        updateSignUpFormEmail(value){
            this.signUpForm.email = value;
        },
        updateSignUpFormSchool(value){
            this.signUpForm.school = value;
        },
        updateSignUpFormPassword(value){
            this.signUpForm.password = value;
        },
        updateSignUpFormAgeConsent(value){
            if(value === true || value === false)
                this.signUpForm.firstName = value;
        },
        updateSignUpFormUserAgreementConsent(value){
            if(value === true || value === false)
                this.signUpForm.firstName = value;
        },
        validateFormData(){

            if(this.password!==this.repeatedPassword){
                this.formErrors.invalidPasswordMatch = true;
            }

            if(!(typeof this.firstName === "string" && this.firstName.length > 0)){
                this.formErrors.invalidFirstName = true;
            }

            if(!(typeof this.lastName === "string" && this.lastName.length > 0 && validSurnamePattern.test(this.lastName))){
                this.formErrors.invalidLastName = true;
            }

            if(!(typeof this.email === "string" && this.lastName.email > 0 && validEmailPattern.test(this.email))){
                this.formErrors.invalidEmail = true;
            }

            if(!this.ageConsent){
                this.formErrors.invalidAgeConsent = true
            }

            if(!this.userAgreementConsent){
                this.formErrors.invalidUserAgreementConsent = true
            }

            for(const error in this.formErrors){
                if(this.formErrors[error]){
                    return false
                }
            }
            return true;

        }
    }
})

