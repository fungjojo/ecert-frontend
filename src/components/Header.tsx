interface HeaderProps {
  logout: Function;
  headerTitle?: string;
  iconSrc?: any;
}

const Header = (props: HeaderProps) => {
  const { logout, headerTitle = "", iconSrc } = props || {};
  return (
    <div className="flex flex-row px-10">
      <div className="flex self-center mr-4">
        {!!iconSrc && <img src={iconSrc} className="w-6 h-6" />}
      </div>
      <p className="flex my-8 text-2xl flex-1 text-textDarkGrey">
        {headerTitle}
      </p>
      <input
        type="button"
        value={"Logout"}
        className="flex rounded-md p-5 my-4 text-s bg-btnPurple w-15 text-white justify-center"
        onClick={() => {
          logout();
        }}
      />
    </div>
  );
};

export default Header;
