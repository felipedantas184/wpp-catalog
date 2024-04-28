import { FaCreditCard, FaLocationPin, FaTrash, FaTruck, FaUser } from "react-icons/fa6";
import { Divider, MainText, Order, SText, SpaceBetween, TextWrapper } from "./styles";
import { FieldValue, deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";

const OrdersSummary = ({ orders, products }: any) => {
  const getProductName = (productId: string) => {
    const product = products.filter((product: any) => product.id == productId)
    const productName = (product[0].title)

    return productName
  }

  async function deleteData(order: any) {
    try {
      if (confirm("Você tem certeza de que deseja cancelar este pedido?") == true) {
        await deleteDoc(doc(fireDB, "orders", order.id)).then(function() {
          order.cart.map((product : any) => (
            updateDoc(doc(fireDB, "products", product.id), {
              stock: increment(product.quantity)
            })
          ))
        })
        alert("Pedido excluído e estoque atualizado!")
      } 
    } catch (error) {
    alert(error)
  }}

  return (
    <>
      {orders.map((order: any) => (
        <>
          <Order>
            <SpaceBetween>
              <MainText><FaUser size={10} color="#13313a" /> {order.personal.name}</MainText>
              <FaTrash size={16} color="#F1AAAA" onClick={() => deleteData(order)} />
            </SpaceBetween>
            <SpaceBetween>
              <SText><FaCreditCard size={10} color="#A4A4A4" /> {order.paymentMethod}</SText>
              <MainText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(order.amount)}</MainText>
            </SpaceBetween>
            <SpaceBetween>
              {(order.delivery === 'Retirar na Loja') ? (
                <SText><FaLocationPin size={10} color="#A4A4A4" /> {order.delivery}</SText>
              ) : (
                <TextWrapper>
                  <SText><FaTruck size={10} color="#A4A4A4" /> {order.delivery.address}, {order.delivery.number} - {order.delivery.district}</SText>
                  <SText>{order.delivery.zipCode}, {order.delivery.city}-{order.delivery.state}</SText>
                </TextWrapper>
              )}
            </SpaceBetween>
            <TextWrapper>
              {order.cart.map((product: any) => (
                <SText key={product.id} >- {getProductName(product.id)} (x{product.quantity})</SText>
              ))}
            </TextWrapper>
          </Order>
          <Divider />
        </>
      ))}
    </>
  );
}

export default OrdersSummary;