import { Search } from "lucide-react";

const SearchInput = ({onChange, placeholder}) => {
  return (
    <label className="input input-bordered flex items-center gap-2 w-full">
      <Search className="w-4" />
      <input
        type="text"
        className="grow outline-none border-none focus:outline-none focus:ring-0"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default SearchInput;
