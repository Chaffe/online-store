import React from 'react';
import { useRouter } from 'next/router'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@/store/userSlice";
import FormTemplate from "@/components/FormTemplate/FormTemplate";
import { useAppDispatch } from "@/hooks/redux-hooks";

type TSignUpSubmit = (email: string, password: string) => void;

const SignUp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onRegisterSubmit: TSignUpSubmit = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
    <FormTemplate isLogin={false} onFormSubmit={onRegisterSubmit} />
  );
};

export default SignUp;