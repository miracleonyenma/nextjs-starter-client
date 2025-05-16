import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  buttonText?: string;
  initialValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search...",
  buttonText = "Search",
  initialValue = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleSearchInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="form-input">
          <HugeiconsIcon
            icon={Search01Icon}
            className="icon text-muted-foreground"
            color="currentColor"
            strokeWidth={2}
          />
          <input
            placeholder={placeholder}
            className=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={handleSearchInputKeyPress}
          />
        </div>
      </div>
      <button onClick={handleSearch} className="btn">
        {buttonText}
      </button>
    </div>
  );
};

export default SearchInput;
