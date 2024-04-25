import { useSelector } from "react-redux";
import { BackWrapper, CheckoutButton, Divider, InfoWrapper, PaymentWrapper, Section, Span, SpanBold, Subtitle, Summary, SummaryTitle, TextWrapper, Title, Topic, TopicBold, TopicWrapper, Wrapper } from "./styles";
import ProductSummary from "./ProductSummary";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaCreditCard, FaPix } from "react-icons/fa6";

type Item = {
  id: string,
  title: string,
  brand: string,
  imageUrl: string,
  description: string,
  price: number,
  quantity: number,
}

const Confirmation = () => {
  const order = useSelector((state: any) => state.order);

  var personalMessageComposure = "```" + order?.lastOrder?.personal.name + '%0A' + order?.lastOrder?.personal.email + '%0A' + order?.lastOrder?.personal.phone + "```"
  var deliveryMessageComposure = (order?.lastOrder?.delivery === "Retirar na Loja") ? '```Reirada na loja```' : "```" + order?.lastOrder?.delivery.address + ', ' + order?.lastOrder?.delivery.number + ' - ' + order?.lastOrder?.delivery.complement + '%0A' + order?.lastOrder?.delivery.zipCode + '%0A' + order?.lastOrder?.delivery.city + ', ' + order?.lastOrder?.delivery.state + "```"
  var paymentMessageComposure = "```" + order?.lastOrder?.paymentMethod + "```"
  var cartMessageComposure = order?.lastOrder?.cart.reduce(function (prevVal: any, currVal: any, idx: any) {
    return idx == 0 ? Number(idx + 1) + '. ' + "```" + currVal.title + ` (x${currVal.quantity})` + "```" + `%0A${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(currVal.price * currVal.quantity)}` : prevVal + '%0A%0A' + Number(idx + 1) + '. ' + "```" + currVal.title + ` (x${currVal.quantity})` + "```" + `%0A${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(currVal.price * currVal.quantity)}`;
  }, '')

  const message = `📄 *RESUMO DA COMPRA*%0A_${order?.lastOrder.id}_%0A%0A----------------------------------------------%0A👤 *Informações do Cliente:*%0A${personalMessageComposure}%0A%0A----------------------------------------------%0A🚛 *Informações da Entrega:*%0A${deliveryMessageComposure}%0A%0A----------------------------------------------%0A📃 *Informações do Pedido:*%0A${cartMessageComposure}%0A%0A----------------------------------------------%0A💳 *Forma do Pagamento:*%0A${paymentMessageComposure}%0A%0A----------------------------------------------%0A%0A💵 *Total a Pagar:*%0A${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(order?.lastOrder?.cart.reduce((acc: any, curr: any) => acc + curr.price*curr.quantity, 0))}`

  return (
    <Section>
      <Wrapper>
        <BackWrapper href={'/'} >
          <FaArrowLeft size={16} color="#13131A" />
          <Subtitle>Página inicial</Subtitle>
        </BackWrapper>
        <TextWrapper>
          <FaCheckCircle size={48} color="#08A045" />
          <Title>Estamos Quase Lá!</Title>
          <Subtitle>Agora você precisa enviar a confirmação do pedido via WhatsApp para o vendedor!</Subtitle>
          <CheckoutButton href={`https://wa.me//5586995185757?text=${message}`}>Enviar Pedido</CheckoutButton>
        </TextWrapper>
        <Summary>
          <SummaryTitle>Resumo do Pedido</SummaryTitle>
          {order?.lastOrder !== null ? (order?.lastOrder?.cart.map((item: Item) => (
            <ProductSummary key={item.id} item={item} />
          ))) : (<></>)}
          <Divider />
          <TopicWrapper>
            <TopicBold>Valor Total</TopicBold>
            <SpanBold>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(order?.lastOrder !== null ? (order?.lastOrder?.amount) : (''))}</SpanBold>
          </TopicWrapper>
        </Summary>
        <Summary>
          <SummaryTitle>Resumo da Entrega</SummaryTitle>
          {(order?.lastOrder !== null && order?.lastOrder?.delivery === "Retirar na Loja") ? (
            <InfoWrapper>
              <Topic>Retirada na Loja</Topic>
              <Span>Clique para ver a localização da Loja</Span>
            </InfoWrapper>
          ) : (
            <>
              <InfoWrapper>
                <Topic>Cidade</Topic>
                <Span>{order?.lastOrder?.delivery.city} - {order?.lastOrder?.delivery.state}</Span>
              </InfoWrapper>
              <InfoWrapper>
                <Topic>Endereço</Topic>
                <Span>{order?.lastOrder?.delivery.address}, {order?.lastOrder?.delivery.number} - {order?.lastOrder?.delivery.district}</Span>
              </InfoWrapper>
              <InfoWrapper>
                <Topic>CEP</Topic>
                <Span>{order?.lastOrder?.delivery.zipCode.replace(/(\d{5})(\d{3})/, '$1-$2')}</Span>
              </InfoWrapper>
              <InfoWrapper>
                <Topic>Complemento</Topic>
                <Span>{order?.lastOrder?.delivery.complement}</Span>
              </InfoWrapper>
            </>
          )}
        </Summary>
        <Summary>
          <SummaryTitle>Resumo do Pagamento</SummaryTitle>
          <PaymentWrapper>
            {(order?.lastOrder?.paymentMethod === 'Pix - A combinar') ? (
              <FaPix size={32} color="#32BCAD" />
            ) : (
              <FaCreditCard size={24} color="#32BCAD" />
            )}
            <Span>{order?.lastOrder?.paymentMethod}</Span>
          </PaymentWrapper>
        </Summary>
      </Wrapper>
    </Section>
  );
}

export default Confirmation;