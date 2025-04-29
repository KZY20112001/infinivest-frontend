import { getNotifications } from "@/app/api/notifications";
import NavbarContent from "@/app/_components/navbar/navbar-content";

const Navbar = async () => {
  const notifications = await getNotifications();

  return <NavbarContent notifications={notifications} />;
};

export default Navbar;
