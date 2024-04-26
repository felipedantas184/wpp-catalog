import { useState } from "react";
import { Input, InputDoubleWrapper, InputWrapper, Label, TextArea, UpdateButton, UpdateWrapper } from "./styles";
import { doc, updateDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";

type SingleProduct = {
  title: string,
  brand: string,
  description: string,
  price: number,
  stock: number,
}

const UpdateProduct = ({ product, setSelectedProduct } : { product : SingleProduct, setSelectedProduct : any}) => {
  const oldProduct = product
  const [newProduct, setNewProduct] = useState<SingleProduct>({
    title: product.title,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock: product.stock,
  })


  async function updateData(item: any) {
    try {
      await updateDoc(doc(fireDB, "products", item.id), {
        title: newProduct.title,
        brand: newProduct.brand,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
      })
      alert('atualizado')
      setSelectedProduct('')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <UpdateWrapper>
      <InputDoubleWrapper>
        <InputWrapper>
          <Label>Nome</Label>
          <Input type="text" value={newProduct.title} onChange={(e: any) => setNewProduct({ ...newProduct, title: e.target.value })} />
        </InputWrapper>
        <InputWrapper>
          <Label>Marca</Label>
          <Input type="text" value={newProduct.brand} onChange={(e: any) => setNewProduct({ ...newProduct, brand: e.target.value })} />
        </InputWrapper>
      </InputDoubleWrapper>
      <InputDoubleWrapper>
        <InputWrapper>
          <Label>Estoque</Label>
          <Input type="number" value={newProduct.stock} onChange={(e: any) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        </InputWrapper>
        <InputWrapper>
          <Label>Preço</Label>
          <Input type="number" value={newProduct.price} onChange={(e: any) => setNewProduct({ ...newProduct, price: e.target.value })} />
        </InputWrapper>
      </InputDoubleWrapper>
      <InputWrapper>
        <Label>Descrição</Label>
        <TextArea value={newProduct.description} onChange={(e: any) => setNewProduct({ ...newProduct, description: e.target.value })} />
      </InputWrapper>
      <UpdateButton onClick={() => updateData(product)}>Atualizar Produto</UpdateButton>
    </UpdateWrapper>
  );
}

export default UpdateProduct;