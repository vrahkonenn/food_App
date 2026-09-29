import { Box, Typography } from "@mui/material"
import logo from "../assets/vruoka2.png"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        backgroundColor: "#fff8f0",
        color: "#5d4037",
        px: 2,
        py: 3,
        borderTop: "1px solid #eadfd4",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
        }}
      >
        
        <Box 
            component="img"
            src={logo}
            alt="V-Ruoka logo"
            sx={{ width: 90, height: "auto", mb: 0.5, }}
        />

        <Typography
          variant="body2"
          sx={{
            maxWidth: 600,
            color: "#795548",
            lineHeight: 1.7,
          }}
        >
          Tämä sivusto on omaan käyttöön tehty harjoitustyö,
          jonka tarkoituksena on harjoitella verkkosovelluksen
          suunnittelua ja toteutusta.
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer