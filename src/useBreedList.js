import { useState, useEffect } from "react";

// if I select cat and get some breeds but then select dog and get some breeds and go back to cats, we don't have to make another API req to get the cat breeds. We are storing it locally here
const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded"); // this string represents the state that the hook is in

  useEffect(() => {
    // if no animal is provided then setBreedList to an empty list bc we have no animals
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    // set the setBreedList to be empty bc if we are switching back and forth between breeds, there should never be a an interim state when we are requesting new data from the API where dogs have cat breeds and vice versa
    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
    // this effect will run anytime the user selects a new animal
  }, [animal]);

  return [breedList, status];
}
