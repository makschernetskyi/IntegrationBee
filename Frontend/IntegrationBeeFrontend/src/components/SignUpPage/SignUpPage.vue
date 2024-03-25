<script setup>
  import {useStore} from "@/store";
  import {computed, ref} from "vue";

  import AuthInput from "@/components/AuthInput/AuthInput.vue";

  const signUpPageStore = useStore().signUpPage;
  const authPage = useStore().auth;

  const errors = computed({get: ()=>signUpPageStore.formErrors})
  const emailInput = computed({get: ()=>signUpPageStore.email, set:signUpPageStore.updateSignUpFormEmail})
  const firstNameInput = computed({get: ()=>signUpPageStore.firstName, set:signUpPageStore.updateSignUpFormFirstName})
  const lastNameInput = computed({get: ()=>signUpPageStore.lastName, set:signUpPageStore.updateSignUpFormLastName})
  const passwordInput = computed({get: ()=>signUpPageStore.password, set:signUpPageStore.updateSignUpFormPassword})

  const handleSubmit = (e) =>{
      e.preventDefault();
  }

  const isPasswordShown = ref(false);

</script>
<template>
  <div class="SignUpPage">
      <form class="SignUpPage-Form" @submit="handleSubmit">
            <h1 class="SignUpPage-Form-header">Sign Up {{signUpPageStore.email}}</h1>
              <AuthInput v-model="signUpPageStore.email" title="Email" placeholder="Email: e.g. user@domain.com" type="email" name="email" :is-error="errors.invalidEmail" error-msg="Invalid e-mail address" key=1></AuthInput>
<!--            <div class="SignUpPage-Form-Email">-->
<!--                <label for="SignUpEmailInput" class="SignUpPage-Form-Email-label SignUpPage-Form-Input-label">Email:</label>-->
<!--                <input id="SignUpEmailInput" type="email" name="email" v-model="emailInput" class="SignUpPage-Form-Email-input" autocomplete="on" placeholder="E-mail: e.g. user@somemail.com">-->
<!--                <p v-if="errors.invalidEmail" class="SignUpPage-Form-Email-error SignUpPage-Form-Input-error">invalid email.</p>-->
<!--            </div>-->
<!--            <div class="SignUpPage-Form-FirstName">-->
<!--                <label for="SignUpFirstNameInput" class="SignUpPage-Form-FirstName-label SignUpPage-Form-Input-label">First Name (Real):</label>-->
<!--                <input id="SignUpFirstNameInput" type="text" name="firstName" v-model="emailInput" class="SignUpPage-Form-FirstName-input" autocomplete="on" placeholder="First Name: e.g Josef">-->
<!--                <p v-if="errors.invalidFirstName" class="SignUpPage-Form-FirstName-error SignUpPage-Form-Input-error">invalid name.</p>-->
<!--            </div>-->
<!--            <div class="SignUpPage-Form-LastName">-->
<!--                <label for="SignUpLastNameInput" class="SignUpPage-Form-LastName-label SignUpPage-Form-Input-label">Last Name (Real):</label>-->
<!--                <input id="SignUpLastNameInput" type="text" name="lastName" v-model="emailInput" class="SignUpPage-Form-LastName-input" autocomplete="on" placeholder="Last Name: e.g. Mayer">-->
<!--                <p v-if="errors.invalidLastName" class="SignUpPage-Form-LastName-error SignUpPage-Form-Input-error">invalid Last Name.</p>-->
<!--            </div>-->
<!--            <div class="SignUpPage-Form-SchoolName">-->
<!--                <label for="SignUpSchoolNameInput" class="SignUpPage-Form-SchoolName-label SignUpPage-Form-Input-label">Last Name (Real):</label>-->
<!--                <input id="SignUpSchoolNameInput" type="text" name="lastName" v-model="emailInput" class="SignUpPage-Form-SchoolName-input" autocomplete="on" placeholder="School Name: e.g. UniWien">-->
<!--                <p v-if="errors.invalidSchool" class="SignUpPage-Form-SchoolName-error SignUpPage-Form-Input-error">invalid School Name.</p>-->
<!--            </div>-->
<!--            <div class="SignUp-Form-Password">-->
<!--                <label class="SignUp-Form-Password-label SignUpPage-Form-Input-label">Password</label>-->
<!--                <input :type="isPasswordShown ? 'text' : 'password'" v-model="passwordInput" class="SignUpPage-Form-Password-input" name="password" autocomplete="on" placeholder="password">-->
<!--                <button type="button" class="SignUpPage-Form-Password-hideBtn" @click="()=>isPasswordShown^=1">-->
<!--                    <svg v-if="!isPasswordShown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">&lt;!&ndash;!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.&ndash;&gt;<path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>-->
<!--                    <svg v-if="isPasswordShown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">&lt;!&ndash;!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.&ndash;&gt;<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>-->
<!--                </button>-->
<!--                <p v-if="errors.invalidPassword" class="SignUpPage-Form-Password-error SignUpPage-Form-Input-error">password should be at least 8 symbols long, it should contain letters of the english alphabet, one small letter, one capital letter, one number and one special symbol</p>-->
<!--            </div>-->
<!--            <div class="SignUp-Form-RepeatPassword">-->
<!--                <label class="SignUp-Form-RepeatPassword-label SignUpPage-Form-Input-label">Password</label>-->
<!--                <input :type="isPasswordShown ? 'text' : 'password'" v-model="passwordInput" class="SignUpPage-Form-RepeatPassword-input" name="password" autocomplete="on" placeholder="password">-->
<!--                <button type="button" class="SignUpPage-Form-RepeatPassword-hideBtn" @click="()=>isPasswordShown^=1">-->
<!--                    <svg v-if="!isPasswordShown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">&lt;!&ndash;!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.&ndash;&gt;<path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>-->
<!--                    <svg v-if="isPasswordShown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">&lt;!&ndash;!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.&ndash;&gt;<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>-->
<!--                </button>-->
<!--                <p v-if="errors.invalidPasswordMatch" class="SignUpPage-Form-RepeatPassword-error SignUpPage-Form-Input-error">passwords do not match.</p>-->
<!--            </div>-->
<!--            <div class="SignUpPage-Form-AgeAgreement">-->
<!--                <label for="SignUpAgeAgreementInput" class="SignUpPage-Form-SchoolName-label SignUpPage-Form-Input-label">Last Name (Real):</label>-->
<!--                <button class="SignUpPage-Form-AgeAgreement-showAgreementBtn">click to see details...</button>-->
<!--                <input id="SignUpAgeAgreementInput" type="checkbox" name="lastName" v-model="emailInput" class="SignUpPage-Form-AgeAgreement-input">-->
<!--                <p v-if="errors.invalidAgeConsent" class="SignUpPage-Form-AgeAgreement-error SignUpPage-Form-Input-error">this field is required.</p>-->
<!--            </div>-->
<!--&lt;!&ndash;            to do&ndash;&gt;-->
<!--            <div class="SignUpPage-Form-AgeAgreement">-->
<!--                <label for="SignUpAgeAgreementInput" class="SignUpPage-Form-SchoolName-label SignUpPage-Form-Input-label">Last Name (Real):</label>-->
<!--                <button class="SignUpPage-Form-AgeAgreement-showAgreementBtn">click to see details...</button>-->
<!--                <input id="SignUpAgeAgreementInput" type="checkbox" name="lastName" v-model="emailInput" class="SignUpPage-Form-AgeAgreement-input">-->
<!--                <p v-if="errors.invalidAgeConsent" class="SignUpPage-Form-AgeAgreement-error SignUpPage-Form-Input-error">this field is required.</p>-->
<!--            </div>-->
            <button type="submit" class="SignUpPage-Form-Submit">Sign Up</button>
        </form>
  </div>
</template>