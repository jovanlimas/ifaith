import { useEffect, useState } from "react";
import { Button, Container, Drawer, ListItemButton } from "@mui/material";

const BibleVerse = (props: any) => {
  const [verses, setVerses] = useState<any[]>([]);
  const [chapter, setChapter] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = Array.from({ length: 150 }, (_, index) => (
    <ListItemButton
      style={{
        fontSize: "30px",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "20px",
      }}
      onClick={() => handleButtonClick(index + 1)}
    >
      {index + 1}
    </ListItemButton>
  ));

  useEffect(() => {
    const fetchBibleVerse = async (chapter: number) => {
      try {
        const response = await fetch(
          `https://bolls.life/get-chapter/KJV/19/${chapter}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch verse");
        }
        const data = await response.json();
        console.log(data);
        setVerses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBibleVerse(chapter);
  }, [chapter]);

  const handleButtonClick = (chapter: number) => {
    setChapter(chapter);
  };

  return (
    <Container maxWidth="sm" style={{ margin: "40px" }}>
      <Button
        variant="outlined"
        style={{
          borderRadius: "10px",
          color: "#000000",
          borderBlockColor: "#000000",
          borderColor: "#000000",
        }}
        onClick={toggleDrawer(true)}
      >
        Select Chapter
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <h1>Psalm {chapter}</h1>
      {verses.map((verse, index) => (
        <div key={index}>
          <p>
            {verse.verse} {verse.text}
          </p>
        </div>
      ))}
    </Container>
  );
};

export default BibleVerse;
