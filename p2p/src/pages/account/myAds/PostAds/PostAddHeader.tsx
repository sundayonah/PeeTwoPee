import {
  Box,
  Divider,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PostAddHeader = () => {
  const activeColour = useColorModeValue("#333333", "#DCE5EF");
  const { t }= useTranslation()
  const links = [
    { title: t('all_ads'), link: "profile/ads" },
    { title: t('active_ads'), link: "profile/ads" },

    { title: t('post_ad'), link: "/postad" },

    { title: "", link: "" },
  ];
  return (
    <>
      <Flex fontSize={"14px"} alignContent={"center"} justifyContent="center">
        {links.map((links, index) => (
          <>
            <Box>
              <Link to={`/${links.link}`}>
                {" "}
                <Text color={index == 2 ? "#319EF6" : activeColour}>
                  {links.title}
                </Text>
              </Link>
              {
                <Divider
                  mt={index == 3 ? "37.7px" : 4}
                  orientation="horizontal"
                  width={"86px"}
                  size="xl"
                  borderColor={index == 2 ? "#319EF6" : "#999999"}
                  border={"0"}
                />
              }
            </Box>
            <Spacer />
          </>
        ))}
      </Flex>
    </>
  );
};

export default PostAddHeader;
