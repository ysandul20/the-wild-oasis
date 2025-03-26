import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
   overflow-y: scroll;
   /* background-color: var(--color-brown-50); */
   background-color: var(--color-grey-50);
   padding: 4rem 6.4rem;
`;
const StyledAppLayout = styled.div`
   display: grid;
   height: 100vh;
   grid-template-columns: 26rem 1fr;
   grid-template-rows: auto 1fr;
`;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   gap: 3.2rem;
`;

function AppLayout() {
   return (
      <StyledAppLayout>
         <Header />
         <Sidebar />
         <Main>
            <Container>
               <Outlet />
            </Container>
         </Main>
      </StyledAppLayout>
   );
}

export default AppLayout;
