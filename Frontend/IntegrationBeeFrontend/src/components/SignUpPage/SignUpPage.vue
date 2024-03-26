<script setup>
  import {useStore} from "@/store";
  import {computed, ref} from "vue";
  import {useRouter} from 'vue-router'

  import AuthInput from "@/components/AuthInput/AuthInput.vue";
  import PasswordInput from "@/components/PasswordInput/PasswordInput.vue";

  const signUpPageStore = useStore().signUpPage;
  const authStore = useStore().auth;

  const errors = computed({get: ()=>signUpPageStore.formErrors})

  const router = useRouter();

  const handleSubmit = async (e) =>{
      e.preventDefault();
      if(signUpPageStore.validateFormData()){
          await authStore.requestRegister(signUpPageStore.firstName, signUpPageStore.lastName, signUpPageStore.email, signUpPageStore.school, signUpPageStore.password)
              .then(()=>{
                  router.push('/profile')
              })
      }

  }


</script>
<template>
  <div class="SignUp">
      <form class="SignUp-Form" @submit="handleSubmit">
          <h1 class="SignUp-Form-header">Sign Up</h1>
          <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.email" title="Email" placeholder="Email: e.g. user@domain.com" type="email" name="email" :is-error="errors.invalidEmail" error-msg="Invalid e-mail address"></AuthInput>
          <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.firstName" title="First Name (Real)" placeholder="First name: e.g. Johann" type="text" name="first name" :is-error="errors.invalidFirstName" error-msg="Invalid first name"></AuthInput>
          <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.lastName" title="LastName (Real)" placeholder="Last Name: e.g. Radon" type="text" name="last name" :is-error="errors.invalidLastName" error-msg="Invalid last name"></AuthInput>
          <AuthInput class="SignUp-Form-Field" v-model="signUpPageStore.school" title="School" placeholder="School: e.g. Uniwien" type="text" name="school" :is-error="errors.invalidSchool" error-msg="Invalid school name"></AuthInput>
          <PasswordInput class="SignUp-Form-Field" v-model="signUpPageStore.password" title="Password" placeholder="Password:" name="password" :is-error="errors.invalidPassword" :error-msg="errors.errorTexts.passwordError" autocomplete="on" :allow-paste="true"></PasswordInput>
          <PasswordInput class="SignUp-Form-Field" v-model="signUpPageStore.repeatedPassword" title="Repeat password" placeholder="Repeat password:" name="repeat password" :is-error="errors.invalidPasswordMatch" error-msg="Passwords do not match" autocomplete="off" :allow-paste="false"></PasswordInput>

          <div class="SignUp-Form-AgeAgreement">
              <div class="SignUp-Form-AgeAgreement-Input">
                  <label for="SignUpAgeAgreementInput" class="SignUp-Form-AgeAgreement-label SignUp-Form-Input-label">I confirm that I am older than
                    <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02016R0679-20160504" target="_blank">16 years old:</a>
                  </label>
                  <input id="SignUpAgeAgreementInput" type="checkbox" name="lastName" v-model="signUpPageStore.ageConsent" class="SignUp-Form-AgeAgreement-input">
              </div>
              <p v-if="errors.invalidAgeConsent" class="SignUp-Form-AgeAgreement-error SignUp-Form-Input-error">this field is required.</p>
          </div>
          <div class="SignUp-Form-UserConsent">
              <div class="SignUp-Form-UserConsent-Input">
                  <label for="SignUpUserConsentInput" class="SignUp-Form-UserConsent-label SignUp-Form-Input-label">I agree to the terms of
                      <a href="/terms_of_use">the User Consent Agreement:</a>
                  </label>
                  <input id="SignUpUserConsentInput" type="checkbox" name="lastName" v-model="signUpPageStore.userAgreementConsent" class="SignUp-Form-UserConsent-input">
              </div>
              <p v-if="errors.invalidUserAgreementConsent" class="SignUp-Form-UserConsent-error SignUp-Form-Input-error">this field is required.</p>
          </div>
          <button type="submit" class="SignUp-Form-Submit">Sign Up</button>
        </form>
  </div>
</template>