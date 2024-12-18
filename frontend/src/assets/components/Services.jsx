import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextAPI.jsx";

const Services = () => {
  const { card, toggle } = useAuth();

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={6}
      p={4}
    >
      {card.map((item, index) => (
        <GridItem
          key={index}
          minWidth={{ base: "100%", sm: "200px" }}
          width="100%"
        >
          <Card
            bg={toggle ? "lightblue" : "white"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            boxShadow="1px 2px 2px 2px green"
            borderRadius="md"
            minHeight="300px"
            fontFamily={"arial"}
            height="100%"
            p={4}
          >
            <CardHeader>
              <Heading size="md">{item.title}</Heading>
            </CardHeader>
            <CardBody flexGrow={1} display="flex" alignItems="flex-start">
              <Text>{item.description}</Text>
            </CardBody>
            <CardFooter>
              <Button
                bg={"green.100"}
                color="green"
                _hover={{ bg: "blue.100", color: "blue" }}
              >
                <Link to={`/bookservice/${item.title}`}>Get service</Link>
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Services;
