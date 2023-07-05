import React from "react";
import { SupervisedUserCircle, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useApp } from "./AppProvider";

const StyledAccordion = styled(Accordion)(() => ({
  backgroundColor: "transparent",
  color: "white",
}));

export default function Team() {
  const { results, teamColor, selectedUsers, setSelectedUsers } = useApp();
  const handleChange = (name, users) => {
    console.log("user =>", users);
    const index = selectedUsers.find((t) => t.indexOf(name) === 0);
    const filtered = selectedUsers.filter((t) => t.indexOf(name) !== 0);
    if (index) {
      setSelectedUsers(filtered);
    } else if (!!users) {
      const newSelections = Object.keys(users).map((ukey) => `${name}${ukey}`);
      setSelectedUsers([...filtered, ...newSelections]);
    } else {
      setSelectedUsers([...filtered, name]);
    }
  };

  console.log("results :->", results, teamColor);

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
          {Object.keys(results[akey]).map((tkey, tIndex) => {
            const expanded = !!selectedUsers.find(
              (team) => team.indexOf(`${akey}-${tkey}-`) === 0
            );
            return (
              <StyledAccordion
                key={`team-${aIndex}-${tIndex}`}
                expanded={expanded}
                onChange={() =>
                  handleChange(`${akey}-${tkey}-`, results[akey][tkey])
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "#fff" }} />}
                  aria-controls={`panel1a-content-${aIndex}-${tIndex}`}
                  id={`panel1a-header-${aIndex}-${tIndex}`}
                >
                  <SupervisedUserCircle
                    sx={{
                      color: teamColor[`${akey}-${tkey}`],
                      mr: 1,
                      fontSize: 32,
                    }}
                  />
                  <Typography variant="h6" sx={{ mr: 3 }}>
                    {tkey}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ pl: 5, display: "flex", flexDirection: "column" }}
                >
                  {Object.keys(results[akey][tkey]).map((ukey, uIndex) => (
                    <FormControlLabel
                      key={`user-${aIndex}-${tIndex}-${uIndex}`}
                      control={
                        <Checkbox
                          checked={
                            !!selectedUsers.find(
                              (u) => u === `${akey}-${tkey}-${ukey}`
                            )
                          }
                          sx={{
                            color: "gray",
                            "&.Mui-checked": {
                              color: teamColor[`${akey}-${tkey}`],
                            },
                          }}
                          onChange={() =>
                            handleChange(`${akey}-${tkey}-${ukey}`)
                          }
                        />
                      }
                      label={ukey}
                    />
                  ))}
                </AccordionDetails>
              </StyledAccordion>
            );
          })}
        </Box>
      ))}
    </>
  );
}
