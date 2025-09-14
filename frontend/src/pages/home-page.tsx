import { Button } from "@/components/shadcn-ui/button";
import PageLayout from "@/layouts/page-layout";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function HomePage() {

  const handleClick = () => {
    console.log("Button clicked!");
    toast.success("Form submitted successfully!")
  }

  return (
    <PageLayout
      title="Mini Simulio"
      description="Bienvenue sur Mini Simulio, votre application de gestion de clients et de simulations."
    >
      <Button onClick={handleClick}>
        Home
      </Button>
      <Button asChild className="cursor-pointer">
        <Link to="/dashboard">
          Go to dashboard
        </Link>
      </Button>
    </PageLayout>
  )
}
