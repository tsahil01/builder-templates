import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-zinc-800">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg border border-zinc-700 bg-zinc-900 p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Welcome to Our React.js Template
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Start building your app with clean UI and solid foundations.
          </p>
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="gap-2" variant={'secondary'}>
            Get Started <ArrowRight size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
