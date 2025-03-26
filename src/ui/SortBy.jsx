import { useSearchParams } from "react-router-dom";
import StyledSelect from "./Select";

function SortBy({ options }) {
   const [searchParams, setSearchParams] = useSearchParams();
   const sortValue = searchParams.get("sortBy") || options[0].value;

   function handleChange(event) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("sortBy", event.target.value);
      setSearchParams(newSearchParams);
   }
   return (
      <div>
         <StyledSelect value={sortValue} onChange={handleChange}>
            {options.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </StyledSelect>
      </div>
   );
}

export default SortBy;
