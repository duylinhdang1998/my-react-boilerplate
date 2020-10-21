import React, { useRef, useState } from 'react';
import { ImageBackground, Keyboard, TextInput as RNInput } from 'react-native';
import * as Yup from 'yup';
import { useFormik, FormikValues } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, TextInput } from '@components';
import styles from './styles';
import { BoxView, Button, Text } from '@shared';
import { FeatherNameType } from '@shared/types/FeatherNameType';
import { useLogin } from './slices/authSlice';

interface ValuesForm {
  username: string;
  password: string;
  domain: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Bạn cần phải điền username'),
  password: Yup.string().required('Bạn cần phải điền mật khẩu '),
  domain: Yup.string().required('Bạn cần phải điền domain'),
});

export default function AuthScreen() {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const loginLMS = useLogin();
  const usernameRef = useRef<RNInput>(null);
  const passwordRef = useRef<RNInput>(null);
  const domainRef = useRef<RNInput>(null);

  const _handleSubmit = (val: ValuesForm) => {
    setLoading(true);
    Keyboard.dismiss();
    loginLMS({ endpoint: 'user/login', data: { lname: val.username, pass: val.password, domain: val.domain } });
  };
  const { handleBlur, handleChange, handleSubmit, errors, touched, values, setFieldValue } = useFormik<ValuesForm>({
    validationSchema: LoginSchema,
    initialValues: { username: '', password: '', domain: '' },
    onSubmit: _handleSubmit,
  });

  const getIconByName = (name: keyof typeof values): FeatherNameType => {
    switch (name) {
      case 'username':
        return 'user';
      case 'domain':
        return 'globe';
      case 'password':
        return 'lock';
      default:
        return 'user';
    }
  };

  const getPlaceHolder = (name: keyof typeof values) => {
    switch (name) {
      case 'username':
        return 'Tên đăng nhập';
      case 'domain':
        return 'Domain';
      case 'password':
        return 'Mật khẩu';
      default:
        return 'EmailÏ';
    }
  };

  const renderTextInput = (name: keyof typeof values, ref: React.RefObject<RNInput>) => {
    return (
      <BoxView marginBottom="l">
        <TextInput
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          ref={ref}
          icon={getIconByName(name)}
          placeholder={getPlaceHolder(name)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType={name === 'password' ? 'go' : 'next'}
          returnKeyLabel={name === 'password' ? 'go' : 'next'}
          errors={!!errors[name]}
          touched={touched[name]}
          onSubmitEditing={() => ref.current?.focus()}
          secureTextEntry={name === 'password'}
        />
      </BoxView>
    );
  };
  return (
    <Container>
      <ImageBackground source={require('../../assets/img/waves.png')} resizeMode="cover" style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardDismissMode="none" keyboardShouldPersistTaps="handled">
          <BoxView paddingHorizontal="m" style={styles.wrapper}>
            <BoxView paddingBottom="m">
              <Text variant="title1" marginBottom="l" textAlign="center" fontWeight="500">
                Đăng Nhập
              </Text>
              <BoxView>
                {renderTextInput('domain', domainRef)}
                {renderTextInput('username', usernameRef)}
                {renderTextInput('password', passwordRef)}
              </BoxView>
            </BoxView>
            {!!msg && (
              <Text fontSize={14} color="danger" marginBottom="l">
                {msg}
              </Text>
            )}
            {/* @ts-ignore */}
            <Button block size="medium" onPress={handleSubmit} loading={loading}>
              Đăng nhập
            </Button>
          </BoxView>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </Container>
  );
}
