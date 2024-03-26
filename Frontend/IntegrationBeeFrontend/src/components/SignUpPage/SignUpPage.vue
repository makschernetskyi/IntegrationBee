<script setup>
  import {useStore} from "@/store";
  import {computed, ref, reactive} from "vue";
  import {useRouter} from 'vue-router'

  import AuthInput from "@/components/AuthInput/AuthInput.vue";
  import PasswordInput from "@/components/PasswordInput/PasswordInput.vue";

  import {userConsentText} from "@/components/SignUpPage/userConsent.js";

  const signUpPageStore = useStore().signUpPage;
  const authStore = useStore().auth;

  const errors = computed({get: ()=>signUpPageStore.formErrors})

  const isModalVisible = reactive({value:false});

  const router = useRouter();

  const handleSubmit = async (e) =>{
      e.preventDefault();
      signUpPageStore.trimFormData()
      if(signUpPageStore.validateFormData()){
          await authStore.requestRegister(signUpPageStore.signUpForm.firstName, signUpPageStore.signUpForm.lastName, signUpPageStore.signUpForm.email, signUpPageStore.signUpForm.school, signUpPageStore.signUpForm.password)
          if(!authStore.registerRequest.error){
              await router.push('/profile')
          }
      }

  }


</script>
<template>
    <div class="SignUp">
        <form class="SignUp-Form" @submit="handleSubmit">
            <h1 class="SignUp-Form-header">Sign Up</h1>
            <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.signUpForm.email" title="Email" placeholder="Email: e.g. user@domain.com" type="email" name="email" :is-error="errors.invalidEmail" error-msg="Invalid e-mail address"></AuthInput>
            <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.signUpForm.firstName" title="First name (Real)" placeholder="First name: e.g. Johann" type="text" name="first name" :is-error="errors.invalidFirstName" error-msg="Invalid first name"></AuthInput>
            <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.signUpForm.lastName" title="Last name (Real)" placeholder="Last Name: e.g. Radon" type="text" name="last name" :is-error="errors.invalidLastName" error-msg="Invalid last name"></AuthInput>
            <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.signUpForm.school" title="School" placeholder="School: e.g. Uniwien" type="text" name="school" :is-error="errors.invalidSchool" error-msg="Invalid school name"></AuthInput>
            <PasswordInput class="SignUp-Form-Field" v-model="signUpPageStore.signUpForm.password" title="Password" placeholder="Password:" name="password" :is-error="errors.invalidPassword" :error-msg="errors.errorTexts.passwordError" autocomplete="on" :allow-paste="true"></PasswordInput>
<PasswordInput class="SignUp-Form-Field" v-model="signUpPageStore.signUpForm.repeatedPassword" title="Repeat password" placeholder="Repeat password:" name="repeat password" :is-error="errors.invalidPasswordMatch" error-msg="Passwords do not match" autocomplete="off" :allow-paste="false"></PasswordInput>

            <div class="SignUp-Form-AgeAgreement">
                <div class="SignUp-Form-AgeAgreement-Input">
                    <label for="SignUpAgeAgreementInput" class="SignUp-Form-AgeAgreement-label SignUp-Form-Input-label">I confirm that I am older than
                        <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02016R0679-20160504" target="_blank">16 years old:</a>
                    </label>
                    <input id="SignUpAgeAgreementInput" type="checkbox" name="lastName" v-model="signUpPageStore.signUpForm.ageConsent" class="SignUp-Form-AgeAgreement-input">
                </div>
                <p v-if="errors.invalidAgeConsent" class="SignUp-Form-AgeAgreement-error SignUp-Form-Input-error">this field is required.</p>
            </div>
            <div class="SignUp-Form-UserConsent">
                <div class="SignUp-Form-UserConsent-Input">
                    <label for="SignUpUserConsentInput" class="SignUp-Form-UserConsent-label SignUp-Form-Input-label">I agree to the terms of
                        <button @click="()=>{isModalVisible.value=true}" type="button">the User Consent Agreement:</button>
                    </label>
                    <input id="SignUpUserConsentInput" type="checkbox" name="lastName" v-model="signUpPageStore.signUpForm.userAgreementConsent" class="SignUp-Form-UserConsent-input">
                </div>
                <p v-if="errors.invalidUserAgreementConsent" class="SignUp-Form-UserConsent-error SignUp-Form-Input-error">this field is required.</p>
            </div>
            <button type="submit" class="SignUp-Form-Submit">Sign Up</button>
        </form>
        <div v-if="isModalVisible.value" class="UserConsentModal">
            <button class="UserConsentModal-CloseBtn" @click="()=>{isModalVisible.value=false}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </button>
            <div class="UserConsentModal-text" v-html="userConsentText">

            </div>
        </div>
    </div>
</template>