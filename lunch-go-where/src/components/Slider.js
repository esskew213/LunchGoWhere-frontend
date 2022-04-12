import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import PaidIcon from "@mui/icons-material/Paid";
import { Typography } from "@mui/material";
export default function PriceSlider({
    label,
    step,
    defaultValue,
    min,
    max,
    value,
    handleChange,
}) {
    return (
        <Box sx={{ width: 300 }}>
            <Typography gutterBottom>{label}</Typography>
            <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
            >
                <PaidIcon />
                <Slider
                    onChange={handleChange}
                    aria-label="Price Range"
                    defaultValue={defaultValue}
                    valueLabelDisplay="auto"
                    step={step}
                    marks
                    min={min}
                    max={max}
                    value={value}
                />
            </Stack>
        </Box>
    );
}
