import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Combobox } from "./ui/ComboBox";
import { Badge } from "./ui/badge";

export const ResultForm = ({
  onSubmit,
  sendDataToIndex,
}: {
  onSubmit: (loading: boolean) => void;
  sendDataToIndex: (value: any[]) => any;
}) => {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sscMarks: "",
    hsscMarks: "",
    personalInterest: "",
    formMode: mode,
  });
  
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    sendDataToIndex(universities);
  }, [universities]);

  const handlePersonalInterest = (value: string) => {
    setForm({ ...form, personalInterest: value });
  };

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(true);

    //HANDLE API CALL
    console.log("initial form state: ",form);
    const response = await fetch('http://localhost:3000/api/uni-form',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });

    const res = await response.json();

    setUniversities(res.data);

    toast({
      title: "Results calculated!",
      description: "Scroll down to see your university matches.",
    });

    setLoading(false);
    onSubmit(false);
  };

  return (
    <section id="result-form" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Enter Your Results</h2>
          <p className="text-muted-foreground">
            Fill in your academic details to get personalized university
            recommendations
          </p>
        </div>

        {/* FORM */}
        <div className="glass-card p-6 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label>Mode</Label>
              <RadioGroup
                defaultValue="basic"
                onValueChange={(value) =>
                  setMode(value as "basic" | "advanced")
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic">Basic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">Advanced
                    {mode === "advanced" && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Under Developement
                      </Badge>
                    )}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="matricMarks">SSC Result (%)</Label>
                <Input
                  id="matricMarks"
                  type="number"
                  placeholder="Enter your SSC percentage"
                  min="0"
                  max="100"
                  required
                  value={form.sscMarks}
                  onChange={(e) =>
                    setForm({ ...form, sscMarks: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="intermediateMarks">HSSC Result (%)</Label>
                <Input
                  id="intermediateMarks"
                  type="number"
                  placeholder="Enter your HSSC percentage"
                  min="0"
                  max="100"
                  required
                  value={form.hsscMarks}
                  onChange={(e) =>
                    setForm({ ...form, hsscMarks: e.target.value })
                  }
                />
              </div>

              {/* {mode === "advanced" && (
                <div>
                  <Label htmlFor="entranceTest">Entrance Test Score</Label>
                  <Input
                    id="entranceTest"
                    type="number"
                    placeholder="Enter your entrance test score"
                    min="0"
                    max="100"
                  />
                </div>
              )} */}

              {/* PERSONAL INTEREST */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="interests">Your Personal Interest</Label>
                <Combobox sendDataToForm={handlePersonalInterest} />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate Results"}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
