import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Image, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StarIcon } from '@chakra-ui/icons';
import ReactApexChart from "react-apexcharts";
import { css } from '@emotion/react';

const breakpoints = {
  base: "column",
  sm: "column",
  md: "row",
  lg: "row",
};

export default function DetailsPage() {
  const locallysave = JSON.parse(localStorage.getItem("bookmark")) || [];
  console.log("render");

  const [bookmark, setbookmark] = useState(locallysave);
  const [state, setstate] = useState({});
  const [data, setdata] = useState("about");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [loading, setloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { id } = useParams();
  let y = state?.data?.types?.[0].type?.name;
  let x = y === "grass" ? "green.500" : y === "bug" ? "yellow.500" : y === "water" ? "blue.500" : y === "rock" ? "gray.500" : y === "electric" ? "orange.500" : y === "poison" ? "pink.500" : y === "flying" ? "teal.500" : y === "ground" ? "blackAlpha.500" : y === "fighting" ? "rgb(255,192,9)" : y === "ice" ? "rgb(93,179,192)" : y === "psychic" ? "purple.500" : y === "ghost" ? "rgb(152,179,206)" : y === "steel" ? "rgb(185,196,212)" : y === "dragon" ? "rgb(218,10,54)" : y === "dark" ? "rgb(114,127,148)" : y === "fairy" ? "rgb(229,207,254)" : y === "fire" ? "red.500" : "Tomato";
  console.log(state);

  const hoverStyles = css`
    :hover {
      boxShadow: 0 0 10px black; // Adjust the boxShadow on hover as desired
    }
  `;

  const data1 = {
    series: [{
      data: state?.data?.stats?.map((ele) => ele?.base_stat),
    }],
    options: {
      chart: {
        type: 'bar',
        height: 10,
        selection: {
          enabled: false,
        }, toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 1,
          horizontal: true,
          barHeight: '50%',
          columnHeight: '1%',
        }, dataLabels: {
          enabled: false,
        },
      },

      xaxis: {
        labels: {
          show: false,
        }, axisBorder: {
          show: false,
        },
        categories: state?.data?.stats?.map((ele) => ele?.stat?.name),
      }, theme: {
        monochrome: {
          enabled: true,
          color: x === "blue.500" ? "#ff4d33" : '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
    },
  };

  useEffect(() => {
    console.log("ok");
    getdata();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [id]);

  async function getdata() {
    try {
      setloading(true);
      let pokemondetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setstate({ ...pokemondetail });
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  }

  function saveOrRemove(id) {
    let x = bookmark?.find((ele) => {
      return ele?.id === Number(id);
    });

    if (x) {
      let y = bookmark?.filter((ele) => {
        return ele.id !== Number(id);
      });

      localStorage.setItem("bookmark", JSON.stringify(y));
      setbookmark(y);
    } else {
      localStorage.setItem("bookmark", JSON.stringify([...bookmark, state?.data]));
      setbookmark([...bookmark, state?.data]);
    }
    console.log(typeof (id));
  }

  function color(id) {
    let x = bookmark?.find((ele) => {
      return ele?.id === id;
    });
    console.log(x, "inside colour");
    if (x) {
      return "rgb(247,197,67)";
    } else {
      return "white";
    }
  }

  const backgroundImageUrl = 'https://pokewalls.files.wordpress.com/2020/05/873frosmoth1920x1080.jpg';

  return (
    <Box
      bgColor={x}
      h="100vh"
      pt="50px"
      backgroundImage={`url(${backgroundImageUrl})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      {loading ? (
        <Box><Image w="100%" h="100vh" m="auto" src="https://cdn.dribbble.com/users/2082457/screenshots/5734390/pokeball.gif" /></Box>
      ) : (
        <Box bgColor='white' h="100vh"  display="flex" justifyContent="center" alignItems="center" flexDirection={breakpoints} gap="30px" backgroundPosition="center"
          backgroundRepeat="no-repeat" backgroundSize="cover" >

          <Box
            position="relative"
            boxShadow="0 0 5px black"
            css={hoverStyles}
            bgColor='#e5f7dc'
          >
            <Image w="80%" m="auto" src={state?.data?.sprites?.other?.home?.front_default} />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Text textAlign="center"   fontSize="50px" textTransform="uppercase">
                {state?.data?.species?.name}
              </Text>
              <StarIcon
                position="absolute"
                top="100px"
                right="20px"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => saveOrRemove(state?.data?.id)}
                cursor="pointer"
                color={color(state?.data?.id)}
                boxSize="10"
              />
              {isHovered && (
                <Text
                  position="absolute"
                  top="150px"
                  right="20px"
                  color="white"
                  fontSize="14px"
                  textTransform="uppercase"
                >
                  Bookmark
                </Text>
              )}
            </Box>
          </Box>

          <Box m="auto">
            <Box display="flex" gap="20px" p="20px">
            <Button
    variant={'outline'}
    onClick={() => setdata("about")}
    textTransform="uppercase"
    color={x}
    _hover={{ bg: x, color: 'white' }}
  >
    About
  </Button>
  <Button
    variant={'outline'}
    onClick={() => setdata("base")}
    textTransform="uppercase"
    color={x}
    _hover={{ bg: x, color: 'white' }}
  >
    Base Stats
  </Button>
  <Button
    variant={'outline'}
    ref={btnRef}
    onClick={onOpen}
    textTransform="uppercase"
    color={x}
    _hover={{ bg: x, color: 'white' }}
  >
    Moves
  </Button>
              <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                bgColor={x}
                textTransform="uppercase"
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader color="white" bgColor={x}>Moves</DrawerHeader>

                  <DrawerBody color="white" bgColor={x}>
                    {state?.data?.moves?.map((ele) =>
                      <Text>{ele?.move?.name}</Text>)}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
            <Box>
              {data === "about" ? <Box color="white" justifyContent="center" h="100%" p="20px" display="flex" flexDirection="column" gap="20px">
                <Text fontWeight="bold" fontSize="20px" textTransform="uppercase" color={x}>Species: {state?.data?.species?.name}</Text>
                <Text fontWeight="bold" fontSize="20px" textTransform="uppercase" color={x}>Height: {state?.data?.height}</Text>
                <Text fontWeight="bold" fontSize="20px" textTransform="uppercase" color={x}>Weight: {state?.data?.weight}</Text>
                <Text fontWeight="bold" fontSize="20px" textTransform="uppercase"color={x}>Abilities: <Text display="inline-block"><Text display="flex" gap="3px">{state?.data?.abilities?.map((ele, i) =>
                  <Text fontWeight="bold" fontSize="20px" color={x}>{ele?.ability?.name},</Text>)}</Text></Text></Text>
              </Box> : data === "base" ? <Box>
                <Box><ReactApexChart options={data1.options} series={data1.series} type="bar" height={200} /></Box>
              </Box> : <Box></Box>}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
