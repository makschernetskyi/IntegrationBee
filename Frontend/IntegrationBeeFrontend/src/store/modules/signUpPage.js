import {defineStore} from "pinia";
// import DnsEmailValidation from "dns-email-validation"
import {validSurnamePattern} from "@/utils/regexPatterns.js";


export const useSignUpPageStore = defineStore('signUp', {
    state: ()=>({
        signUpForm:{
            firstName: '',
            lastName: '',
            email: '',
            school: null,
            ageConsent: false,
            userAgreementConsent: false
        },
        formErrors:{
            invalidFirstName: false,
            invalidLastName: false,
            invalidEmail: false,
            invalidSchool: false,
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
        updateSignUpFormAgeConsent(value){
            if(value === true || value === false)
                this.signUpForm.firstName = value;
        },
        updateSignUpFormUserAgreementConsent(value){
            if(value === true || value === false)
                this.signUpForm.firstName = value;
        },
        async validateFormData(){
            if(!(typeof this.lastName === "string" || this.lastName.length > 0 || validSurnamePattern.test(this.lastName))){
                this.formErrors.invalidLastName = true;
            }

            // if(!(await DnsEmailValidation.verify(this.email).verification)){
            //     this.formErrors.invalidEmail = true;
            // }

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

