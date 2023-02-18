import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Text,
  Autocomplete,
  Avatar,
  ActionIcon,
  Modal,
  useMantineTheme,
  TextInput,
  Button,
  FileInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSearch, IconUpload } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    background: "green",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function NavbarHome() {
  const [openedMenu, { toggle }] = useDisclosure(false);
  const [opened, { close, open }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  // const [image, setImages] = useState(null);
  const form = useForm({
    initialValues: {
      itemName: "",
      ItemDesc: "",
      itemImage: null,
    },
  });

  return (
    <Header height={60} mb={10}>
      <Modal
        centered
        opened={opened}
        onClose={close}
        size="md"
        title="Add your Demand"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={6}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(form.values.itemName);
            console.log(form.values.ItemDesc);
            console.log(form.values.itemImage);
            // console.log(image[0]);
          }}
        >
          <TextInput
            label="Item Name"
            placeholder="Medicine"
            {...form.getInputProps("itemName")}
          />
          <TextInput
            mt="md"
            label="Item Description"
            placeholder="Description of the item"
            {...form.getInputProps("ItemDesc")}
          />
          <FileInput
            mt={"md"}
            multiple
            label="Item Images"
            placeholder="Items Image"
            description="Only JPEG and PNG images"
            icon={<IconUpload size={14} />}
            {...form.getInputProps("itemImage")}
            accept="image/png,image/jpeg"
          />

          <Button
            variant="filled"
            type="submit"
            mt={"md"}
            sx={{ marginLeft: "320px" }}
          >
            Submit
          </Button>
        </form>
      </Modal>
      <Container className={classes.header}>
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
          ta="center"
          fz="xl"
          fw={700}
        >
          OnDemand
        </Text>
        <Autocomplete
          className={classes.search}
          placeholder="Search Items"
          icon={<IconSearch color="grey" size={15} />}
          data={[
            "React",
            "Angular",
            "Vue",
            "Next.js",
            "Riot.js",
            "Svelte",
            "Blitz.js",
          ]}
        />
        <Group>
          <Avatar color="blue" radius="xl" sx={{ cursor: "pointer" }}>
            User
          </Avatar>
          <ActionIcon
            variant="filled"
            sx={{ cursor: "pointer" }}
            onClick={open}
          >
            <IconPlus size={16} />
          </ActionIcon>
        </Group>
        <Burger
          opened={openedMenu}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
