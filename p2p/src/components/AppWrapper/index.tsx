import React, { useCallback, useEffect, useMemo, useState } from "react";
import {Box} from "@chakra-ui/react"
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";




export default function AppWrapper({children}:{children : React.ReactNode}) {
  
  const { t,i18n } = useTranslation(); 
  const { language } = useSelector((state: RootState) => state.user);
  const history = useNavigate();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('lng', language.value);
    history({ search: queryParams.toString() });
    i18n.changeLanguage(language.value);
  }, [language.value, history,i18n]);
  
  return (
    <Box>
      {children}
    </Box>
  )
}
