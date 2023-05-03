import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { KeyboardEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

type SearchbarProps = {
  /**Callback function when search is called */
  onSearch?: () => void;
};

const Searchbar = ({ onSearch }: SearchbarProps) => {
  const [searchValue, setSearch] = useState<string>("");
  const router = useRouter();

  const search = () => {
    router.push(`/movie/search/${searchValue}`);
    onSearch && onSearch();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <InputGroup maxW={"md"}>
      <Input
        variant="filled"
        bg="white"
        _focus={{ bg: "white", borderColor: "yellow.400" }}
        placeholder="Search for movies..."
        value={searchValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <InputRightElement color="gray.300" fontSize="1.2em">
        <IconButton
          onClick={search}
          aria-label="Search"
          size={"sm"}
          icon={<AiOutlineSearch color="gray.300" />}
        />
      </InputRightElement>
    </InputGroup>
  );
};
export default Searchbar;
