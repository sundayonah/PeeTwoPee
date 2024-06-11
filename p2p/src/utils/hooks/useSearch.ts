import React, { useMemo, useState } from "react";

export const useSearch = (
  keyword: string,
  options: {
    value: string;
    label: string;
  }[]
) => {
  const [searchOptions, setSearchOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >();
  useMemo(() => {
    const newArray = [...options];
    const filterArray = newArray.filter(
      (values) => values.label.search(keyword.toUpperCase()) !== -1
    );

    setSearchOptions(filterArray);
  }, [keyword]);

  return { searchOptions };
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const useModalSearch = (
  keyword: string,
  options?: string[],
  secondaryOptions?: {
    name: string;
    icon?: string;
    countryCode?: string;
    currency?: string;
    logo?: string;
  }[]
) => {
  const [searchResult, setSearchResult] = useState<string[]>();
  const [secondarySearchResult, setSecondarySearchResult] = useState<
    {
      name: string;
      icon?: string;
      countryCode?: string;
      currency?: string;
    logo?: string;
    }[]
  >();
  useMemo(() => {
    try{
      const newArray = options ? [...(options as string[])] : undefined;
      const secondaryOptionsArray = secondaryOptions
        ? [
            ...(secondaryOptions as {
              name: string;
              icon?: string;
              countryCode?: string;
              currency?: string;
              logo?: string;
            }[]),
          ]
        : undefined;
  
  
      const filterArray = options
        ? newArray?.filter((values) => values.search(keyword) !== -1)
        : undefined;
  
      const filterSecondaryArray = secondaryOptions
        ? secondaryOptionsArray?.filter(
            (values) => values.name.search(capitalizeFirstLetter(keyword)) !== -1 || values.currency?.search(keyword.toUpperCase()) !== -1
          )
        : undefined;
  
      setSearchResult(options ? filterArray : []);
      setSecondarySearchResult(secondaryOptionsArray ? filterSecondaryArray : []);
   
    }catch(e){
       
    }
 
 }, [keyword]);
  return { searchResult, secondarySearchResult };
};
