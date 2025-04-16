import Link from "next/link";

const SiteAside = ({
  links,
  pathname,
}: {
  links: { name: string; path: string }[];
  pathname: string;
}) => {
  const activeLink = links.find((link) => link.path === pathname);

  return links.length > 0 ? (
    <aside className="">
      <nav className="no-scrollbar overflow-x-auto">
        <ul className="flex gap-4 py-4 lg:flex-col">
          {links.map((link) => {
            return (
              <li key={link.name} className="shrink-0">
                <Link
                  href={link.path}
                  className={
                    activeLink?.path === link.path
                      ? "font-semibold text-indigo-400"
                      : "hover:text-indigo-400"
                  }
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  ) : null;
};

export default SiteAside;
