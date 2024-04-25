import Image from "next/image";
import { AddToCart, BigWrapper, Brand, Favorite, Gallery, GelleryIcon, ImageWrapper, Price, Section, SpaceBetween, Stock, TextWrapper, Title, Wrapper } from "./styles";
import { FaShare } from "react-icons/fa6";
import Features from "./Features";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart.slice"

type Product = {
  product: {
    id: number,
    title: string,
    brand: string,
    imageUrl: string,
    description: string,
    price: number,
    stock: number,
  }
}

const Details = ({ product }: Product) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const cartItem = cart.find((item: any) => item.id === product.id)

  return (
    <>
      <Section>
        <Wrapper>
          <ImageWrapper>
            <Image src={product.imageUrl[0]} alt={product.title} fill className={'image'} />
          </ImageWrapper>
          {/**<Gallery>
            <GelleryIcon><Image src={'/assets/images/floral_beleza.jpg'} alt={'floral_beleza.jpg'} fill className={'image'} /></GelleryIcon>
          </Gallery>*/}
          <BigWrapper>
            <TextWrapper style={{ marginTop: 24 }} >
            <SpaceBetween>
              <Brand>{product.brand}</Brand>
              <Stock>{product.stock} restantes</Stock>
            </SpaceBetween>              <Title>{product.title}</Title>
              <Price>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(product.price)}</Price>
            </TextWrapper>
            <SpaceBetween style={{ paddingLeft: 8, paddingRight: 8, marginTop: 12, alignItems: 'center', gap: 4 }} >
              {(!cartItem) ? (
                <>
                  <AddToCart onClick={() => dispatch(addToCart(product))}>Adicionar ao Carrinho</AddToCart>
                  <Favorite onClick={() => (navigator.share({ title: "MDN", text: "Learn web development on MDN!", url: "https://developer.mozilla.org" }))} ><FaShare size={16} color='#5A189A' /></Favorite>
                </>
              ) : (
                <>
                  <AddToCart disabled={product.stock <= cartItem.quantity} onClick={() => dispatch(addToCart(product))}>Adicionar ao Carrinho ({cartItem?.quantity})</AddToCart>
                  <Favorite onClick={() => (navigator.share({ title: "MDN", text: "Learn web development on MDN!", url: "https://developer.mozilla.org" }))} ><FaShare size={16} color='#5A189A' /></Favorite>
                </>
              )}
            </SpaceBetween>
            <Features product={product} />
          </BigWrapper>
        </Wrapper>
      </Section>
    </>
  );
}

export default Details;