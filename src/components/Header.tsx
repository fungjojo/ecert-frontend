interface HeaderProps {
  logout: Function;
  headerTitle?: string;
}

const Header = (props: HeaderProps) => {
  const { logout, headerTitle = "" } = props || {};
  return (
    <div className="flex flex-row">
      <p className="flex my-8 text-2xl flex-1">{headerTitle}</p>
      <input
        type="button"
        value={"logout"}
        className="flex rounded-md p-3 my-4 text-xs bg-violet-700 w-15 text-white text-xl justify-center"
        onClick={() => {
          logout();
        }}
      />
    </div>
  );
};

export default Header;
