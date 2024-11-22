type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="container mx-auto max-w-screen-lg max-md:px-2 md:mt-8">
      {children}
    </div>
  );
};

export default Layout;
