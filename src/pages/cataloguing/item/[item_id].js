import { ItemProvider } from "src/admin/contexts/itemContext"
import ItemCard from "src/components/display_item/card_item"
import { parseCookies } from "nookies";
import Layout from "src/admin/layout";

export default function Item() {
  
  return (
    <ItemProvider>
    <ItemCard />
    
    </ItemProvider>
  );
}

Item.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (ctx) => {
  const { ["bibliokeia.token"]: token } = parseCookies(ctx);
  if (!token) {
    
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    } 
  } 

  return {
    props: {},
  };
};
