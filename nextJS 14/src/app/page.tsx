import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 bg-zinc-800">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg border border-muted bg-card p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to Our Next.js Template
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start building your app with clean UI and solid foundations.
          </p>
        </div>

        <Card className="rounded-xl border border-muted bg-muted/30 p-6">
          <CardContent className="flex justify-center">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight size={20} />
            </Button>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
