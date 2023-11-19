import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  useBreakpointValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pokeaction, pokemon } from "../redux/action";
import { useNavigate } from "react-router-dom";

export default function SearchPokemon() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const [searchby] = useState("Search Pokemon");
  const [loading, setLoading] = useState(false); 
  const ref = useBreakpointValue({
    base: "https://images4.alphacoders.com/641/641968.jpg",
    lg: "https://wallpaperboat.com/wp-content/uploads/2019/09/anime-pokemon.jpg",
  });

  async function search() {
    try {
      if (searchby === "Search Pokemon") {
        setLoading(true);

        let pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);

        if (pokemon1) {
          dispatch(pokemon);
          dispatch(pokeaction(pokemon1));
          navigate("/list");
        }
      }
    } catch (e) {
      toast({
        title: "Pokemon not found.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false); 
    }
  }

  function change(e) {
    setinput(e.target.value);
  }

  return (
    <Box
      w="100%"
      h="100vh"
      backgroundImage={ref}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="80%" mt="30px" m="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Heading color="white">What Pokemon are you looking for?</Heading>
        <Box display="flex" mt="30px">
          <Input value={input} onChange={change} placeholder={searchby} bgColor="white" width="500px" />
          <Button onClick={search} ml="4">
            Search
          </Button>
        </Box>
        {loading && <Spinner color="red" mt="100" />}
      </Box>
    </Box>
  );
}
