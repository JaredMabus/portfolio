import Box from "@mui/material/Box";
import Socials from "./Socials";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box)(
  ({ theme }) => `
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: start;
        height: 125px;
        width: 100%;
        margin: 0;
        padding: 0; 
        background-color: ${theme.palette.secondary.light}
    `
);

const Footer = () => {
  return (
    <FooterContainer>
      {/* <Box
                sx={{
                    width: '100%'
                }}
            > */}
      <Socials />
      {/* </Box> */}
    </FooterContainer>
  );
};

export default Footer;
