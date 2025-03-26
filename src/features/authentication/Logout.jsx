import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Row from "../../ui/Row";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
   const { mutate, isLoading } = useLogout();

   return (
      <ButtonIcon onClick={mutate} disabled={isLoading}>
         <Row>{isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}</Row>
      </ButtonIcon>
   );
}

export default Logout;
