import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MinimalHomepage() {
    const [count, setCount] = useState(0);

    const features = [{
        title: 'Feature One',
        description: 'Enhance your workflow',
    }, {
        title: 'Feature Two',
        description: 'Maximize productivity',
    }, {
        title: 'Feature Three',
        description: 'Simplify development',
    }];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <main className="w-full max-w-4xl mx-auto">
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Welcome to Our Platform</h1>
                        <p className="text-lg text-gray-600">A clean, minimal design for your next project</p>
                        <div className="flex justify-center gap-4">
                            <Button>Get Started</Button>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {features.map((feature, index) => (
                            <Card key={index} className="bg-white shadow-md">
                                <CardHeader>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">This component uses shadcn/ui Card with a clean white background.</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Card className="mt-12">
                        <CardHeader>
                            <CardTitle>Interactive Component</CardTitle>
                            <CardDescription>Try clicking the button below</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4">
                            <p className="text-2xl font-bold">{count}</p>
                            <Button onClick={() => setCount(count + 1)}>Increment</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}