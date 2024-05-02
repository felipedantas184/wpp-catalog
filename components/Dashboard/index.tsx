import { FaEdit } from "react-icons/fa";
import { AddButton, BigCard, BigMenu, BigTitle, Brand, Card, CardNumber, CardTitle, Divider, DoubleIcon, ImageWrapper, Menu, PTitle, Price, Product, Quantity, Section, SpaceBetween, TextWrapper, Title, TopicWrapper, Wrapper } from "./styles";
import Image from "next/image";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import OrdersSummary from "./OrdersSummary";
import { FaTrash } from "react-icons/fa6";
import { deleteDoc, doc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";

const Dashboard = ({ products, orders }: any) => {
  const [selectedProduct, setSelectedProduct] = useState<any>()

  async function deleteProduct(product: any) {
    try {
      if (confirm("Você tem certeza de que deseja excluir este produto?") == true) {
        await deleteDoc(doc(fireDB, "products", product.id)).then(function () {
          alert("Produto excluído!")
        })
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Section>
      <Wrapper>
        <Title>Visão Geral</Title>
        <Menu>
          <Card>
            <CardTitle>Total de Pedidos</CardTitle>
            <CardNumber>{orders.length}</CardNumber>
          </Card>
          <Card>
            <CardTitle>Receita Total</CardTitle>
            <CardNumber>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(orders.reduce((acc: any, curr: any) => acc + curr.amount, 0))}</CardNumber>
          </Card>
          <Card>
            <CardTitle>Ticket Médio</CardTitle>
            <CardNumber>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(orders.reduce((acc: any, curr: any) => (acc + curr.amount), 0) / orders.length)}</CardNumber>
          </Card>
          <Card>
            <CardTitle>Total no Mês</CardTitle>
            <CardNumber>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(orders.filter((order: any) => (order.date.slice(3, 4) === `${new Date().getMonth() + 1}`)).reduce((acc: any, curr: any) => (acc + curr.amount), 0))}</CardNumber>
          </Card>
        </Menu>
        <BigMenu>
          <BigCard>
            <BigTitle>Produtos</BigTitle>
            {products.map((product: any) => (
              <>
                <Product key={product.id}>
                  <ImageWrapper href={'/'}>
                    <Image src={product.imageUrl[0]} alt={product.title} fill className={'image'} sizes="(max-width: 384px)" />
                  </ImageWrapper>
                  <TextWrapper>
                    <SpaceBetween>
                      <Brand>{product.brand}</Brand>
                      <DoubleIcon>
                        <FaEdit size={16} color="#D4D4D4" onClick={() => (selectedProduct === product.id) ? (setSelectedProduct('')) : (setSelectedProduct(product.id))} />
                        <FaTrash size={16} color="#F1AAAA" onClick={() => deleteProduct(product)} />
                      </DoubleIcon>
                    </SpaceBetween>
                    <SpaceBetween>
                      <PTitle>{product.title}</PTitle>
                      <Quantity>Est.: {product.stock}</Quantity>
                    </SpaceBetween>
                    <Price>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(product.price)}</Price>
                  </TextWrapper>
                </Product>
                {(product.id === selectedProduct) ? (
                  <UpdateProduct product={product} setSelectedProduct={setSelectedProduct} />
                ) : (
                  <></>
                )}
                <Divider />
              </>
            ))}
            <AddButton href={'/register'}>Adicionar Produto</AddButton>
          </BigCard>
        </BigMenu>
        <BigMenu>
          <BigCard>
            <BigTitle>Pedidos</BigTitle>
            <OrdersSummary orders={orders} products={products} />
          </BigCard>
        </BigMenu>
      </Wrapper>
    </Section>
  );
}

export default Dashboard;