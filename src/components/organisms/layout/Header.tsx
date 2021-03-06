import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Link,
  useDisclosure
} from "@chakra-ui/react";
import { memo, VFC } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

// React.memoを使うと親から子コンポーネントに渡している props が更新されない限り(後述する callback 関数とかは別)子コンポーネントは再レンダリングされない
export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const onClickHome = () => history.push("/home");
  const onClickUserManagement = () => history.push("/home/user_management");
  const onClickSetting = () => history.push("/home/setting");
  // asをつけることでどのタグをレンダリングするかを指定できる
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        {/* ブレイクポイントがmd以上でフォントサイズがlgになる */}
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            ユーザー管理アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
          </Box>

          <Link onClick={onClickSetting}>設定</Link>
        </Flex>
        <IconButton
          aria-label="メニューボタン"
          icon={<HamburgerIcon />}
          size="sm"
          variant="unstyled"
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
        />
      </Flex>
      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button onClick={onClickHome} w="100%">
                トップ
              </Button>
              <Button onClick={onClickUserManagement} w="100%">
                ユーザー一覧
              </Button>
              <Button onClick={onClickSetting} w="100%">
                設定
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});

// ログイン画面にはヘッダーを出さず、/homeには出す
