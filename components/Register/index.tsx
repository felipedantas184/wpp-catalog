import { useState } from "react";
import { Form, Input, InputDoubleWrapper, InputWrapper, Label, RegistertButton, Section, TextArea, Title, Wrapper } from "./styles";
import fireDB, { storage } from "@/firebase/initFirebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { v4 } from "uuid";

type Product = {
  title: string,
  brand: string,
  description: string,
  price: number,
  stock: number,
}

const Register = () => {
  const router = useRouter()
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    title: '',
    brand: '',
    description: '',
    price: 0,
    stock: 0,
  })

  const addProduct = async (e: any) => {
    e.preventDefault()
    try {
      if (imageUpload == null) return;
      var imagesUrls: any = []

      await addDoc(collection(fireDB, "products"), {
        title: newProduct.title,
        brand: newProduct.brand,
        description: newProduct.description,
        price:  Number(newProduct.price),
        stock:  Number(newProduct.stock),
      }).then(async (docRef) => {
        for (let i = 0; i < imageUpload.length; i++) {
          const imageRef = ref(storage, `images/${docRef.id}/${imageUpload[i].name + v4()}`);
          await uploadBytes(imageRef, imageUpload[i]).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((url) => {
              imagesUrls.push(url)
            })
          })
        }
        updateDoc(doc(fireDB, "products", docRef.id), {
          imageUrl: imagesUrls,
        })
      })
      alert("Produto adicionado com sucesso!")
      router.push({ pathname: '/' })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Section>
      <Wrapper>
        <Title>Cadastrar novo produto</Title>
        <Form onSubmit={addProduct}>
          <InputWrapper>
            <Label>Produto</Label>
            <Input type='text' placeholder="Nome do produto" required
              value={newProduct.title} onChange={(e: any) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Marca</Label>
            <Input type='text' placeholder="Marca do produto" required
              value={newProduct.brand} onChange={(e: any) => setNewProduct({ ...newProduct, brand: e.target.value })}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Descrição</Label>
            <TextArea placeholder="Descreva o produto" required
              value={newProduct.description} onChange={(e: any) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </InputWrapper>
          <InputDoubleWrapper>
            <InputWrapper>
              <Label>Preço</Label>
              <Input type='number' placeholder="Preço" required
                value={newProduct.price} onChange={(e: any) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Estoque</Label>
              <Input type='number' placeholder="Estoque" required
                value={newProduct.stock} onChange={(e: any) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </InputWrapper>
          </InputDoubleWrapper>
          <InputWrapper>
            <Label>Foto</Label>
            <Input type='file' accept="image/*" required onChange={(e) => (setImageUpload(e.target.files))} multiple />
          </InputWrapper>
          <RegistertButton type="submit" >Adicionar Produto</RegistertButton>
        </Form>
      </Wrapper>
    </Section>
  );
}

export default Register;