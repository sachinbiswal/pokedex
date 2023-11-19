import { Flex, Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SingleBookmarkPage from "./singlebookmarkpage";
import { StarIcon } from "@chakra-ui/icons";
import './style.css'

const breakpoints = {
  base: "repeat(2, 1fr)",
  sm: "repeat(3, 1fr)",
  md: "repeat(4, 1fr)",
  lg: "repeat(4, 1fr)",
};

export default function Bookmarkpage() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmark")) || [];
  const [bookmark, setBookmark] = useState(bookmarks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function saveOrRemove(id) {
    let updatedBookmarks = bookmark?.filter((ele) => ele.id !== Number(id));
    localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
    setBookmark(updatedBookmarks);
  }

  function color(id) {
    let isBookmarked = bookmark?.some((ele) => ele?.id === id);
    return isBookmarked ? "rgb(247, 197, 67)" : "white";
  }

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      h="100vh"
    >
      {loading ? (
        <Box>
          <div className="o-pokeball c-loader u-bounce"></div>
          <Text textAlign="center" color="black" fontSize="20px">
            Loading...
          </Text>
        </Box>
      ) : bookmark.length === 0 ? (
        <Text textAlign="center" color="red.500" fontSize="25px">
          Nothing to show. Add Pokemon to see them here.
        </Text>
      ) : (
        <Flex
          justify="center"
          align="center"
          display="grid"
          gridTemplateColumns={breakpoints}
          gap="15px"
          w="95%"
          mt="15px"
          pt="50px"
        >
          {bookmark?.map((ele) => (
            <Flex key={ele.id} position="relative" direction="column" align="center">
              <SingleBookmarkPage ele={ele} />
              <StarIcon
                position="absolute"
                top="10px"
                right="10px"
                onClick={() => saveOrRemove(ele.id)}
                cursor="pointer"
                color={color(ele.id)}
                boxSize="7"
              />
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
