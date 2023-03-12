interface props {
    href: string,
    children: any
};

const Link = ({ href, children }: props) => {
    return (
        <a className="text-blue-500 hover:text-blue-800" href={href}>{children}</a>
    );
};

export default Link;