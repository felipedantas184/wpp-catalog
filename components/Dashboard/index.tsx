import { FaEdit } from "react-icons/fa";
import { BigCard, BigMenu, BigTitle, Brand, Card, CardNumber, CardTitle, ImageWrapper, Menu, PTitle, Price, Product, Quantity, Section, TextWrapper, Title, TopicWrapper, Wrapper } from "./styles";
import Image from "next/image";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";

const Dashboard = ({ products, orders }: any) => {
  type Product = {
    title: string,
    brand: string,
    description: string,
    price: number,
    stock: number,
  }
  
  const [selectedProduct, setSelectedProduct] = useState<any>()

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
            <CardNumber>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(orders.reduce((acc:any, curr:any) => acc + curr.amount, 0))}</CardNumber>
          </Card>
          <Card>
            <CardTitle>Ticket Médio</CardTitle>
            <CardNumber>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(orders.reduce((acc:any, curr:any) => (acc + curr.amount), 0)/orders.length)}</CardNumber>
          </Card>
          <Card>
            <CardTitle>Total no Mês</CardTitle>
            <CardNumber>R$ 10.000,00</CardNumber>
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
                  <TextWrapper style={{ flex: 2 }} >
                    <Brand>{product.brand}</Brand>
                    <PTitle>{product.title}</PTitle>
                  </TextWrapper>
                  <TopicWrapper>
                    <Quantity>Est.: {product.stock}</Quantity>
                    <Price>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(product.price)}</Price>
                  </TopicWrapper>
                  <TopicWrapper>
                    <FaEdit size={16} color="#D4D4D4" onClick={() => setSelectedProduct(product.id)} />
                  </TopicWrapper>
                </Product>
                {(product.id === selectedProduct) ? (
                  <UpdateProduct product={product} setSelectedProduct={setSelectedProduct} />
                ) : (
                  <></>
                )}
              </>
            ))}
          </BigCard>
        </BigMenu>
      </Wrapper>
    </Section>
  );
}

export default Dashboard;