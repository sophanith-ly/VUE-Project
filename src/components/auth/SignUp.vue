<template>
    <div class="login-page" style="min-height: 464px;">
    <div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <h1><b>SIGN-UP</b></h1>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Sign up to start your session</p>

      <form @submit.prevent="signUp">
        <div class="input-group mb-3">
          <input type="text" v-model="user.name" class="form-control" placeholder="Name"
                                :class="{ 'is-invalid': !!userError.name }" />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div class="invalid-feedback">
                {{ userError.name }}
        <div class="input-group mb-3">
          <input type="email" v-model="user.email" class="form-control" placeholder="Email"
                                :class="{ 'is-invalid': !!userError.email }" />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div class="invalid-feedback">
                {{ userError.name }}  
        <div class="input-group mb-3">
          <input type="password" v-model="user.password" class="form-control" placeholder="Password"
                                autocomplete :class="{ 'is-invalid': !!userError.password }" />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div class="invalid-feedback">
                {{ userError.password }}
        <div class="input-group mb-3">
          <input type="password" v-model="user.password_confirmation" class="form-control"
                                placeholder="Confirm Password" autocomplete />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <!-- <div class="social-auth-links text-center mt-2 mb-3">
        <a href="#" class="btn btn-block btn-primary">
          <i class="fab fa-facebook mr-2"></i> Sign up using Facebook
        </a>
        <a href="#" class="btn btn-block btn-danger">
          <i class="fab fa-google-plus mr-2"></i> Sign up using Google+
        </a>
      </div> -->
      <!-- /.social-auth-links -->

     
      <p class="mb-0">
        <a href="login.html" class="text-center">Already have an account. (Sign In)</a>
      </p>
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>
</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { apiSignUp } from "@/functions/api/auth";
import { LoadingModal, MessageModal, CloseModal } from "@/functions/swal";
const router = useRouter();

const user = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const userError = reactive({
    name: "",
    email: "",
    password: "",
});

const defaultUser = JSON.parse(JSON.stringify(user));
const defaultUserError = JSON.parse(JSON.stringify(userError));

function resetAllState() {
    Object.assign(user, defaultUser);
    Object.assign(userError, defaultUserError);
}

async function signUp() {
    try {
        LoadingModal('Signing Up...');
        const response = await apiSignUp(user);
        const { data } = response;

        resetAllState();
        return MessageModal({
            icon: "success",
            title: "Success",
            text: data.message,
        },
            () => {
                router.replace({ name: "SignIn" });
            });
    } catch (error) {
        const { response } = error;
        if (!response) {
            return MessageModal({ icon: "error", title: "Error", text: error.message });
        }
        const { status, data } = response;
        if (status === 422) {
            Object.keys(userError).forEach((key) => {
                userError[key] = data.errors[key]
                    ? data.errors[key][0]
                    : "";
            });
            return CloseModal();
        }
        return MessageModal({ icon: "error", title: "Error", text: data.message });
    }
}
</script>