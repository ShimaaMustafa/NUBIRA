import {
  Navbar as HeroUiNavebar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function Navbar() {
  const {setUserToken, userData} = useContext(authContext)

  function logout(){
    localStorage.removeItem('token')
    setUserToken(null)
  }
  return (
    <HeroUiNavebar>
      <NavbarBrand>
        <Link to={'/'} className="flex items-center text-inherit">
        <img src="/letter-n-alphabet-symbol-vector-illustration_945339-1378.avif" alt="Logo" width={40} height={40} />
        <p className="font-bold text-inherit">UBIRA</p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={userData?.name}
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile">
              <Link className="h-14" to={'/profile'}>
              <p className="font-semibold">Signed in as {userData?.name}</p>
              <p className="font-semibold">{userData?.email}</p>
              </Link>
            </DropdownItem>
            <DropdownItem onPress={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroUiNavebar>
  );
}
