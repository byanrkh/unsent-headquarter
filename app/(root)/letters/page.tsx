import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import { getLetters } from "@/libs/letters";
import LettersList from "./Components/LettersList";

// Same reasoning as /reports: the admin client doesn't call cookies(), so
// force dynamic rendering to avoid this page getting statically cached.
export const dynamic = "force-dynamic";

export default async function LettersPage() {
  const letters = await getLetters();

  return (
    <>
      <Topbar title="Letters" description="Every letter, newest first." />
      <Container className="py-10">
        <LettersList initialLetters={letters} />
      </Container>
    </>
  );
}
