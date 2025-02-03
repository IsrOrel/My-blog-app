import Link from 'next/link';

const SideNav = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-6 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-4">My Blog</h2>
      <ul>
        <li>
          <Link href="/">
            <a className="block py-2 px-4 hover:bg-gray-600">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a className="block py-2 px-4 hover:bg-gray-600">Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a className="block py-2 px-4 hover:bg-gray-600">Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="block py-2 px-4 hover:bg-gray-600">About Us</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
