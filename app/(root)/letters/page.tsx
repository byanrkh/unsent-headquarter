import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import LettersList from "./Components/LettersList";

export default function LettersPage() {
  return (
    <>
      <Topbar title="Letters" description="Every letter, newest first." />
      <Container className="py-10">
        <LettersList />
      </Container>
    </>
  );
}
