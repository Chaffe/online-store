import React from 'react';
import { useRouter } from 'next/router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@/store/userSlice";
import FormTemplate from "@/components/FormTemplate/FormTemplate";
import { useAppDispatch } from "@/hooks/redux-hooks";

type TSignInSubmit = (email: string, password: string) => void;

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const onLoginSubmit: TSignInSubmit = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken
        }));

        router.push('/');
      })
      .catch(console.error);
  }

  return (
    <FormTemplate isLogin onFormSubmit={onLoginSubmit} />
  );
};

export default SignIn;