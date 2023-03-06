import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import fetchRegister from "@/store/actions/fetchRegister";
import FormTemplate from "@/components/FormTemplate/FormTemplate";

type TSignUpSubmit = (email: string, password: string, fullName: string) => void;

const SignUp = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useMemo(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const onRegisterSubmit: TSignUpSubmit = async (email, password, fullName) => {
    const responseData = {
      email,
      password,
      fullName
    };

    // TODO: Type payload
    const { payload }: any = await dispatch(fetchRegister(responseData));

    if (payload) {
      localStorage.setItem('token', payload.token);
      router.push('/')
    }
  }

  return (
    <FormTemplate onFormSubmit={onRegisterSubmit} isLogin={false} />
  );
};

export default SignUp;