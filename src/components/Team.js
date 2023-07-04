import React from "react";
import { SupervisedUserCircle, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useApp } from "./AppProvider";

const StyledAccordion = styled(Accordion)(() => ({
  backgroundColor: "transparent",
  color: "white",
}));

export default function Team() {
  const { results, selectedTeams, setSelectedTeams } = useApp();
  const handleChange = (name) => {
    const index = selectedTeams.find((t) => t === name);
    if (index) {
      setSelectedTeams(selectedTeams.filter((t) => t !== name));
    } else {
      setSelectedTeams([...selectedTeams, name]);
    }
  };

  console.log("hello", selectedTeams);

  if (!results) return;
  return (
    <>
      {Object.keys(results).map((akey, aIndex) => (
        <Box key={`alliance-${aIndex}`}>
          {Object.keys(results).length > 1 && (
            <Typography
              color="white"
              sx={{ textAlign: "center", my: 3 }}
              variant="h4"
            >
              {akey}
            </Typography>
          )}
          {Object.keys(results[akey]).map((tkey, tIndex) => (
            <StyledAccordion
              key={`team-${aIndex}-${tIndex}`}
              expanded={selectedTeams.find(
                (team) => team === `${akey}-${tkey}`
              )}
              onChange={() => handleChange(`${akey}-${tkey}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#fff" }} />}
                aria-controls={`panel1a-content-${aIndex}-${tIndex}`}
                id={`panel1a-header-${aIndex}-${tIndex}`}
              >
                <SupervisedUserCircle
                  sx={{
                    color: darkenColor(stringToColorCode(akey + tkey), 0),
                    mr: 1,
                    fontSize: 32,
                  }}
                />
                <Typography variant="h6">{tkey}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pl: 5 }}>
                {Object.keys(results[akey][tkey]).map((ukey, uIndex) => (
                  <Typography key={`user-${aIndex}-${tIndex}-${uIndex}`}>
                    {ukey}
                  </Typography>
                ))}
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
      ))}
    </>
  );
}

export function stringToColorCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = Math.floor(
    Math.abs(((Math.sin(hash) * 16777215) % 1) * 16777215)
  ).toString(16);
  return "#" + color.padStart(6, "0");
}

export function darkenColor(colorCode, amount) {
  let hex = colorCode.slice(1); // Remove the "#"
  let num = parseInt(hex, 16);

  // Calculate the new RGB values with decreased brightness
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  // Ensure that the new RGB values are within the valid range
  r = Math.max(r, 0);
  g = Math.max(g, 0);
  b = Math.max(b, 0);

  // Convert the RGB values back to hexadecimal and combine them
  let darkHex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + darkHex.padStart(6, "0");
}
