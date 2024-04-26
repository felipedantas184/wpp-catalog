import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Link from "next/link";

const LoginPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [router, user])


  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(data.email, data.password)
      router.push('/register')
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert('Email ou senha incorretos!')
    }
  }

  return (
    <>
      <Head>
        <title>Login ADUFPI | Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Login ADUFPI | Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Login ADUFPI | Apartamentos" />

        <meta property="twitter:title" content="Login ADUFPI | Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Container>
        <Wrapper>
          <LBox>
            <Heading>
              <Image src={'/images/black_logo.png'} width={200} height={66} alt='ADUFPI' />
              <Title>Login</Title>
            </Heading>
            <Form onSubmit={handleLogin}>
              <IWrap>
                <Label>E-mail</Label>
                <Input type={'email'} placeholder="Digite seu e-mail" required
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  value={data.email}
                />
              </IWrap>
              <IWrap>
                <Label>Senha</Label>
                <Input type={'password'} placeholder="Digite sua senha" required
                  onChange={(e) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                  value={data.password}
                />
              </IWrap>
              <FButton type="submit" >Entrar</FButton>
            </Form>
            <BWrap>
              <FOption href={'/reset'} >Esqueci minha senha</FOption>
              <FOption href={'/signup'}>Cadastre-se</FOption>
            </BWrap>
          </LBox>
          <RBox>
            <RTitle>Bem-Vindo de Volta!</RTitle>
            <RSubtitle>Falta pouco para conhecer os quartos disponíveis para sua reserva!</RSubtitle>
          </RBox>
        </Wrapper>
      </Container>
    </>
  );
}

export default LoginPage;

import styled from "styled-components";
import Image from "next/image";

const Container = styled.section`
  background-color: #EB5757;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Poppins', sans-serif;
`
const Wrapper = styled.div`
  border-radius: 20px;
  padding: 32px;
  
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    margin: 16px;
  }
`
const LBox = styled.div`
  flex: 5;
  background-color: #FFFFFF;
  border-radius: 20px 0 0 20px;

  padding: 48px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
const Title = styled.h1`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
const IWrap = styled.div`
  width: 300px;
  
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  margin-left: 12px;
`
const Input = styled.input`
  background-color: #F1F1F1;
  color: #33333A;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;

  padding: 8px 12px; 
  width: 100%;
  max-width: 300px;
  border: none;
  border-radius: 8px;
  outline: none;
`
const BWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
const FButton = styled.button`
  background-color: #EB5757;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  font-family: 'Poppins', sans-serif;

  height: 40px;
  width: 200px;
  border-radius: 8px;
  border: 0;

  transition: 0.5s;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    box-shadow: inset 200px 0 0 0 #13131A;
  }
`
const FOption = styled(Link)`
  color: #22222A;
  font-size: 14px;
`
const RBox = styled.div`
  flex: 3;
  background-color: #4F4F4F;
  padding: 16px;
  border-radius: 0 20px 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 720px) {
    display: none;
    border-radius: 20px 20px 0 0; 
  }
`
const RTitle = styled.h3`
  color: #F1F1F1;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;

  max-width: 300px;
  margin-bottom: 16px;
`
const RSubtitle = styled.h5`
  color: #F1F1F1;
  font-size: 14px;
  font-weight: 400;

  max-width: 350px;
`
