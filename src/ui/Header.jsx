import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";
import ToggleMode from "./ToggleMode";

const StyledHeader = styled.header`
   /* background-color: var(--color-brown-0); */
   background-color: var(--color-grey-0);
   padding: 1.2rem 4rem;
   border-bottom: 1px solid var(--color-grey-100);
   display: flex;
   justify-content: flex-end;
   gap: 2rem;
`;
const StyledUl = styled.ul`
   display: flex;
   align-items: center;
   gap: 0.4rem;
`;

function Header() {
   const navigate = useNavigate();

   return (
      <StyledHeader>
         <UserAvatar />
         <StyledUl>
            <li>
               <ButtonIcon onClick={() => navigate("/account")}>
                  <HiOutlineUser />
               </ButtonIcon>
            </li>
            <li>
               <ToggleMode />
            </li>
            <li>
               <Logout />
            </li>
         </StyledUl>
      </StyledHeader>
   );
}

export default Header;
