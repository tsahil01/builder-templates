import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Welcome to React</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">This is a simple react component.</p>
          <Button className="mt-4">Click Me</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;