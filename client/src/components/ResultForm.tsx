import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Combobox } from "./ui/ComboBox";
import { Badge } from "./ui/badge";
import FormApi from "../hooks/FormApi";
import { categories } from "../data/index";
import { regions } from "../data/index";
import { RegionBox } from "./ui/RegionBox";

export const ResultForm = ({
  onSubmit,
  sendDataToIndex,
}: {
  onSubmit: (loading: boolean) => void;
  sendDataToIndex: (value: any[]) => any;
}) => {
  const [mode, setMode] = useState<"basic" | "specific">("basic");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sscMarks: "",
    hsscMarks: "",
    personalInterest: "",
    region: "",
  });

  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    sendDataToIndex(universities);
  }, [universities]);

  const handleComboBox = (value: string) => {
    setForm({ ...form, personalInterest: value });
  };

  const handleRegionBox = (value: string) => {
    setForm({ ...form, region: value });
  };

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(true);

    //HANDLE API CALL
    console.log("initial form state: ", form);
    try {
      const filteredUniversities = await FormApi(form, mode);

      setUniversities(filteredUniversities);

      if(filteredUniversities.length > 0){
        toast({
          title: "Results calculated!",
          description: "Scroll down to see your university matches.",
        });
      } else {
        toast({
          title: "Oops!",
          description: "No university matches.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "There was an error calculating your results. Please be patient.",
        variant: "destructive",
      });
    }

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
                  setMode(value as "basic" | "specific")
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic">Basic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific">
                    Specific
                    {mode === "specific" && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Beta
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

              {mode === "specific" && (
                <div className="flex flex-col gap-1">
                  <Label htmlFor="interests">Your Region</Label>
                  <RegionBox
                    sendDataToForm={handleRegionBox}
                    options={regions}
                  />
                </div>
              )}

              {/* PERSONAL INTEREST */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="interests">Your Personal Interest</Label>
                <Combobox
                  sendDataToForm={handleComboBox}
                  options={categories}
                />
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
