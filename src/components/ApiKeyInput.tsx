
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setGeminiApiKey, getGeminiApiKey } from '@/utils/geminiApi';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ApiKeyInput = () => {
  const { toast } = useToast();
  const DEFAULT_API_KEY = "AIzaSyAzRWtgC9AqcdKfIvmuJh5NoedFMLz5L-o";
  const [apiKey, setApiKey] = useState(getGeminiApiKey() || DEFAULT_API_KEY);
  const [isOpen, setIsOpen] = useState(false);

  // Set the default API key when component first loads
  useEffect(() => {
    if (!getGeminiApiKey()) {
      setGeminiApiKey(DEFAULT_API_KEY);
      toast({
        title: "API Key Set",
        description: "Default Gemini API key has been applied",
      });
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setGeminiApiKey(apiKey.trim());
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="text-sm"
          size="sm"
        >
          Set Gemini API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Gemini API Key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Enter your Gemini API key to generate unique puzzles.
            You can get an API key from the <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Google AI Studio</a>.
          </p>
          <div className="flex items-center gap-2">
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
