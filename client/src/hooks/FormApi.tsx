import { SAMPLE_UNIVERSITIES } from "../data/index";
import { regions } from "../data/index";

const FormApi = async (form, mode) => {
  const universityArray = SAMPLE_UNIVERSITIES;
  if (mode === "basic") {
    const filteredUniversities = universityArray.filter((university) => {
      return university.category
        .toLowerCase()
        .includes(form.personalInterest.toLowerCase());
    });
    return filteredUniversities;

  } else if (mode === "specific") {
    const filteredUniversities = universityArray.filter((university) => {
      return university.category
        .toLowerCase()
        .includes(form.personalInterest.toLowerCase());
    });
    const selectedRegions = regions.filter((region) => {
      return region.value.toLowerCase().includes(form.region.toLowerCase());
    })[0];
    const cities = selectedRegions.cities.split(" & ");
    
    const regionFilter = filteredUniversities.filter((university) => {
        if(cities.includes(university.location)){
            return university;
        }
    });

    console.log(regionFilter)
    return regionFilter;
  };
};

export default FormApi;
