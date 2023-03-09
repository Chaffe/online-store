import React, { useMemo } from 'react';
import { useRouter } from 'next/router'
import { useAppSelector } from "@/hooks/redux";
import FormTemplate from "@/components/FormTemplate/FormTemplate";

const SignIn = () => {
  const { user } = useAppSelector(state => state.auth)
  const router = useRouter();

  useMemo(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <FormTemplate isLogin />
  );
};

export default SignIn;