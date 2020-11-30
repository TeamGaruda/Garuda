import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Logo from "../../images/drone (2).png";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../../auth/helper";
import { getAllCategories } from "../../admin/helper/adminapicall";
import { loadCart } from "../helper/cartHelper";

console.log(isAuthenticated());
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    color: "rgb(43,70,139)",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: "block",
    fontFamily: "Ubuntu",
    fontSize: "1.5rem",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  textStyle: {
    textTransform: "none",
    fontWeight: "bolder",
  },
}));

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return "nav-link active-header-nav";
  } else {
    return "nav-link header-nav";
  }
};

export default withRouter(function Navbar({ history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [orderAnchorEl, setOrderAnchorEl] = React.useState(null);
  const [subprofileAnchorEl, setSubprofileAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isOrderMenuOpen = Boolean(orderAnchorEl);
  const isSubprofileMenuOpen = Boolean(subprofileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categories, setCategories] = useState([]);

  const preLoadCategory = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preLoadCategory();
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOrderMenuOpen = (event) => {
    setOrderAnchorEl(event.currentTarget);
  };

  const handleSubprofileMenuOpen = (event) => {
    setSubprofileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOrderMenuClose = () => {
    setOrderAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSubprofileMenuClose = () => {
    setSubprofileAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isAuthenticated() && (
        <MenuItem onClick={handleMenuClose}>
          <Link className="nav-link menu-nav-link" to="/signin">
            Login
          </Link>
        </MenuItem>
      )}
      {!isAuthenticated() && (
        <MenuItem onClick={handleMenuClose}>
          <Link className="nav-link menu-nav-link" to="/signup">
            SignUp
          </Link>
        </MenuItem>
      )}

      {isAuthenticated() && (
        <MenuItem onClick={handleSubprofileMenuOpen}>
          <Link className="nav-link menu-nav-link"> Profile</Link>
        </MenuItem>
      )}

      {isAuthenticated() && (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            signout(() => {
              history.push("/");
            });
          }}
        >
          <Link className="nav-link menu-nav-link" to="/">
            LogOut
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  const subprofilemenuId = "primary-search-account-menu-order";
  const renderSubprofileMenu = (
    <Menu
      anchorEl={subprofileAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={subprofilemenuId}
      keepMounted
      open={isSubprofileMenuOpen}
      onClose={handleSubprofileMenuClose}
    >
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link className="nav-link menu-nav-link" to={`/user/dashboard`}>
            Information
          </Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link className="nav-link menu-nav-link" to={`/user/order`}>
            Orders
          </Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link className="nav-link menu-nav-link" to={`/admin/dashboard`}>
            Information
          </Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link
            className="nav-link menu-nav-link"
            to={`/admin/create/category`}
          >
            Create Category
          </Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link className="nav-link menu-nav-link" to={`/admin/categories`}>
            Manage Category
          </Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link className="nav-link menu-nav-link" to={`/admin/create/product`}>
            Create Product
          </Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link className="nav-link menu-nav-link" to={`/admin/products`}>
            Manage Product
          </Link>
        </MenuItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem onClick={handleSubprofileMenuClose}>
          <Link className="nav-link menu-nav-link" to={`/admin/orders`}>
            Manage Orders
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  const ordermenuId = "primary-search-account-menu-order";
  const renderOrderMenu = (
    <Menu
      anchorEl={orderAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={ordermenuId}
      keepMounted
      open={isOrderMenuOpen}
      onClose={handleOrderMenuClose}
    >
      <MenuItem onClick={handleOrderMenuClose}>
        <Link className="nav-link menu-nav-link" to={`/products`}>
          All
        </Link>
      </MenuItem>

      {categories.map((category, index) => {
        return (
          <MenuItem key={index} onClick={handleOrderMenuClose}>
            <Link
              className="nav-link menu-nav-link"
              to={`/products/${category._id}/${category.name}/`}
            >
              {category.name}
            </Link>
          </MenuItem>
        );
      })}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link className="nav-link menu-nav-link" to="/">
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="nav-link menu-nav-link" to="/about">
          About
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="nav-link menu-nav-link" to="/user/order">
          Orders
        </Link>
      </MenuItem>

      <MenuItem onClick={handleOrderMenuOpen}>
        <Link className="nav-link menu-nav-link">Products</Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color="transparent"
        className={classes.elevation4}
      >
        <Toolbar>
          <img src={Logo} alt="logo" />
          <Typography className={classes.title} variant="h6" noWrap>
            GARUDA
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link className={currentTab(history, "/")} to="/">
              Home
              <div
                className="underline"
                style={
                  history.location.pathname === "/"
                    ? { width: "100%" }
                    : { width: "0%" }
                }
              ></div>
            </Link>
            <Link className={currentTab(history, "/about")} to="/about">
              About
              <div
                className="underline"
                style={
                  history.location.pathname === "/about"
                    ? { width: "100%" }
                    : { width: "0%" }
                }
              ></div>
            </Link>
            <Link
              className={currentTab(history, "/user/order")}
              to="/user/order"
            >
              Orders
              <div
                className="underline"
                style={
                  history.location.pathname === "/user/order"
                    ? { width: "100%" }
                    : { width: "0%" }
                }
              ></div>
            </Link>
            <Link
              className={currentTab(history, "/products")}
              onClick={handleOrderMenuOpen}
            >
              Products
              <div
                className="underline"
                style={
                  history.location.pathname === "/products"
                    ? { width: "100%" }
                    : { width: "0%" }
                }
              ></div>
            </Link>
          </div>
          <div>
            <IconButton
              aria-label="show 17 new notifications"
              onClick={() => {
                history.push("/cart");
              }}
              color="inherit"
            >
              <Badge badgeContent={"" + loadCart().length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderOrderMenu}
      {renderSubprofileMenu}
    </div>
  );
});
