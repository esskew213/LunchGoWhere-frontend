import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import apis from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const pages = {
	home: "Home",
	new: "Add A Stall"
};

const logo = "LUNCHGOWHERE";
const ResponsiveAppBar = () => {
	const navigate = useNavigate();
	const [ anchorElNav, setAnchorElNav ] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleLogout = async () => {
		await apis
			.logoutUser()
			.then((res) => {
				console.log(res);
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
						{logo}
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" }
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left"
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" }
							}}
						>
							{Object.keys(pages).map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Link
										style={{
											textDecoration: "none",
											color: "black"
										}}
										to={`/${page}`}
									>
										{pages[page]}
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" }
						}}
					>
						{logo}
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" }
						}}
					>
						{Object.keys(pages).map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link
									style={{
										textDecoration: "none",
										color: "white"
									}}
									to={`/${page}`}
								>
									{pages[page]}
								</Link>
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<LogoutIcon onClick={handleLogout} sx={{ p: 0 }} />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
