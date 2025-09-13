import { Button } from "@/components/shadcn-ui/button";
import { toast } from "sonner";

export default function HomePage() {

  const handleClick = () => {
    console.log("Button clicked!");
    toast.success("Form submitted successfully!")
  }

  return (
    <div>
      <Button onClick={handleClick}>
        Home
      </Button>
    </div>
  )
}
