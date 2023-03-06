import React, { useMemo } from 'react';
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import fetchLogin from "@/store/actions/fetchLogin";
import FormTemplate from "@/components/FormTemplate/FormTemplate";

type TSignInSubmit = (email: string, password: string) => void;

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth)
  const router = useRouter();

  useMemo(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const onLoginSubmit: TSignInSubmit = async (email, password) => {
    const responseData = {
      email,
      password
    };

    // TODO: Type payload
    const { payload }: any = await dispatch(fetchLogin(responseData));

    if (payload) {
      localStorage.setItem('token', payload.token);
    }
  };

  return (
    <FormTemplate onFormSubmit={onLoginSubmit} isLogin />
  );
};

export default SignIn;